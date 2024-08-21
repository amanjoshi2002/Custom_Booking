import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import http from 'http';
import next from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import webpush from 'web-push';
import mongoose, { Document, Model } from 'mongoose';
import { hash } from 'bcrypt';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Use environment variables with a check and type assertion
const mongoUrl = process.env.MONGODB_URI as string;
if (!mongoUrl) {
  console.error('MONGODB_URI is not set in environment variables');
  process.exit(1);
}

const dbName = 'test';

// Set VAPID details from environment variables
const vapidDetails = {
  subject: process.env.VAPID_SUBJECT as string,
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
  privateKey: process.env.VAPID_PRIVATE_KEY as string
};

if (!vapidDetails.subject || !vapidDetails.publicKey || !vapidDetails.privateKey) {
  console.error('VAPID details are not set in environment variables');
  process.exit(1);
}

webpush.setVapidDetails(
  vapidDetails.subject,
  vapidDetails.publicKey,
  vapidDetails.privateKey
);

// Define the interface for the Style document
interface IStyle extends Document {
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  logoColor?: string;
  hoverColor?: string;
  logoname?: string;
}

// Define the Style schema
const StyleSchema = new mongoose.Schema<IStyle>({
  backgroundColor: String,
  textColor: String,
  buttonColor: String,
  logoColor: String,
  hoverColor: String,
  logoname: String,
}, { timestamps: true });

// Define the Style model with the correct type
let Style: Model<IStyle>;
try {
  Style = mongoose.model<IStyle>('Style');
} catch {
  Style = mongoose.model<IStyle>('Style', StyleSchema);
}

async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB via Mongoose');

    const client = new MongoClient(mongoUrl);
    await client.connect();
    console.log('Connected to MongoDB via MongoClient');

    return { mongoose, client };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

connectToMongoDB().then(({ mongoose, client }) => {
  const db = client.db(dbName);
  const bookingsCollection = db.collection('bookings');
  const changeStream = bookingsCollection.watch();

  changeStream.on('change', async (change) => {
    if (change.operationType === 'update') {
      const updatedBooking = await bookingsCollection.findOne({ _id: change.documentKey._id });

      if (updatedBooking) {
        const subscriptions = await db.collection('pushSubscriptions').find({}).toArray();
        for (const subscriptionDoc of subscriptions) {
          try {
            const subscription = {
              endpoint: subscriptionDoc.endpoint,
              keys: {
                p256dh: subscriptionDoc.keys.p256dh,
                auth: subscriptionDoc.keys.auth
              }
            };

            await webpush.sendNotification(subscription, JSON.stringify({
              title: 'Booking Update',
              body: `Booking status changed to ${updatedBooking.status}`,
              data: updatedBooking
            }));
            console.log('Notification sent successfully to:', subscriptionDoc.endpoint);
          } catch (error) {
            if (error instanceof Error && 'statusCode' in error && (error as any).statusCode === 410) {
              console.log('Removing expired subscription:', subscriptionDoc.endpoint);
              await db.collection('pushSubscriptions').deleteOne({ endpoint: subscriptionDoc.endpoint });
            } else {
              console.error('Error sending push notification:', error);
            }
          }
        }
      } else {
        console.error('Updated booking not found');
      }
    }
  });

  nextApp.prepare().then(() => {
    const app = express();
    const server = http.createServer(app);

    app.use(express.json());

    // Your existing Express routes
    app.get('/api/vapidPublicKey', (req, res) => {
      res.json({ publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY });
    });

    app.post('/api/subscribe', async (req, res) => {
      const subscription = req.body;
      await db.collection('pushSubscriptions').insertOne(subscription);
      res.status(201).json({});
    });

    // GET route for fetching bookings
    app.get('/api/bookings', async (req, res) => {
      try {
        const bookings = await bookingsCollection.find({}).toArray();
        res.json(bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Error fetching bookings' });
      }
    });

    // POST route for creating a new booking
    app.post('/api/bookings', async (req, res) => {
      try {
        const booking = req.body;
        booking.createdAt = new Date();
        const result = await bookingsCollection.insertOne(booking);
        res.status(201).json({ message: 'Booking added successfully', id: result.insertedId });
      } catch (error) {
        console.error('Error adding booking:', error);
        res.status(500).json({ error: 'Error adding booking' });
      }
    });

    // Modify the /api/saveStyle route
    app.post('/api/saveStyle', async (req, res) => {
      try {
        const body = req.body;
        console.log('Received body:', body);

        const result = await Style.findOneAndUpdate(
          {}, // Empty filter to match any document
          body, // Update with the new style data
          {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
          }
        );

        // Send push notifications for style update
        const subscriptions = await db.collection('pushSubscriptions').find({}).toArray();
        for (const subscriptionDoc of subscriptions) {
          try {
            const subscription = {
              endpoint: subscriptionDoc.endpoint,
              keys: {
                p256dh: subscriptionDoc.keys.p256dh,
                auth: subscriptionDoc.keys.auth
              }
            };

            await webpush.sendNotification(subscription, JSON.stringify({
              title: 'Style Update',
              body: 'The website style has been updated.',
              data: result
            }));
          } catch (error) {
            console.error('Error sending push notification:', error);
            // Handle expired subscriptions
            if (error instanceof Error && 'statusCode' in error && (error as any).statusCode === 410) {
              console.log('Removing expired subscription:', subscriptionDoc.endpoint);
              await db.collection('pushSubscriptions').deleteOne({ endpoint: subscriptionDoc.endpoint });
            }
          }
        }

        res.status(200).json({ message: 'Style saved successfully', style: result });
      } catch (error) {
        console.error('Error in POST /api/saveStyle:', error);
        res.status(500).json({ error: 'Error saving style', details: (error as Error).message });
      }
    });

    // Add the GET route to retrieve the current style
    app.get('/api/getStyle', async (req, res) => {
      try {
        const style = await Style.findOne().exec();
        if (style) {
          res.status(200).json(style);
        } else {
          res.status(404).json({ message: 'No style found' });
        }
      } catch (error) {
        console.error('Error in GET /api/getStyle:', error);
        res.status(500).json({ error: 'Error retrieving style', details: (error as Error).message });
      }
    });

    // Add the POST route for user signup
    app.post('/api/auth/signup', async (req, res) => {
      try {
        const { email, password, phone } = req.body;

        // Check if user already exists
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Insert the new user
        const result = await db.collection('users').insertOne({
          email,
          password: hashedPassword,
          phone,
        });

        // Return success response
        res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
      } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'An error occurred during signup' });
      }
    });

    // PATCH route for updating a booking (including cancellation)
   // PATCH route for updating a booking (including cancellation)
app.patch('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    console.log('Attempting to update booking:', id);
    console.log('Update data:', updateData);

    const result = await bookingsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      console.log('Booking not found');
      return res.status(404).json({ error: 'Booking not found' });
    }

    console.log('Booking updated successfully:', result.value);

    // Trigger push notifications for the update
    const subscriptions = await db.collection('pushSubscriptions').find({}).toArray();
    for (const subscriptionDoc of subscriptions) {
      try {
        const subscription = {
          endpoint: subscriptionDoc.endpoint,
          keys: {
            p256dh: subscriptionDoc.keys.p256dh,
            auth: subscriptionDoc.keys.auth
          }
        };

        await webpush.sendNotification(subscription, JSON.stringify({
          title: 'Booking Update',
          body: `Booking status changed to ${result.value.status}`,
          data: result.value
        }));
        console.log('Notification sent successfully to:', subscriptionDoc.endpoint);
      } catch (error) {
        if (error instanceof Error && 'statusCode' in error && (error as any).statusCode === 410) {
          console.log('Removing expired subscription:', subscriptionDoc.endpoint);
          await db.collection('pushSubscriptions').deleteOne({ endpoint: subscriptionDoc.endpoint });
        } else {
          console.error('Error sending push notification:', error);
        }
      }
    }

    res.json(result.value);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Error updating booking', details: (error instanceof Error ? error.message : String(error)) });
  }
});
    // Handle all other routes with Next.js
    app.all('*', (req, res) => {
      return handle(req, res);
    });

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
}).catch(error => {
  console.error('Failed to start the server:', error);
  process.exit(1);
});