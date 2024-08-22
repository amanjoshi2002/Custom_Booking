import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import webpush from 'web-push';

// Set up web-push with your VAPID keys
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const stylesCollection = await getCollection("styles");
    
    await stylesCollection.updateOne({}, { $set: body }, { upsert: true });

    // Send push notification to all subscribed clients
    const pushSubscriptionsCollection = await getCollection("push_subscriptions");
    const subscriptions = await pushSubscriptionsCollection.find({}).toArray();
    
    const notificationPayload = JSON.stringify({
      title: 'Style Update',
      body: 'The application styles have been updated.',
      data: body
    });

    const notificationResults = await Promise.allSettled(
      subscriptions.map(async (subscriptionDoc) => {
        const subscription = {
          endpoint: subscriptionDoc.endpoint,
          keys: {
            p256dh: subscriptionDoc.keys.p256dh,
            auth: subscriptionDoc.keys.auth
          }
        };
        try {
          await webpush.sendNotification(subscription, notificationPayload);
          return { status: 'fulfilled', endpoint: subscription.endpoint };
        } catch (error) {
          if (error instanceof Error && 'statusCode' in error && (error as any).statusCode === 410) {
            // Remove expired subscription
            await pushSubscriptionsCollection.deleteOne({ endpoint: subscription.endpoint });
            console.log(`Removed expired subscription: ${subscription.endpoint}`);
          } else {
            console.error(`Error sending notification to ${subscription.endpoint}:`, error);
          }
          return { status: 'rejected', endpoint: subscription.endpoint, error };
        }
      })
    );

    const successfulNotifications = notificationResults.filter(result => result.status === 'fulfilled').length;
    const failedNotifications = notificationResults.filter(result => result.status === 'rejected').length;

    return NextResponse.json({ 
      success: true, 
      notificationsSent: successfulNotifications,
      notificationsFailed: failedNotifications
    });
  } catch (error) {
    console.error('Error saving style:', error);
    return NextResponse.json({ success: false, error: 'Failed to save style' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stylesCollection = await getCollection("styles");
    
    const styles = await stylesCollection.findOne({});

    if (!styles) {
      console.log('No styles found in database, using default styles');
      return NextResponse.json({ success: false, error: 'No styles found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, styles });
  } catch (error) {
    console.error('Error fetching styles:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch styles' }, { status: 500 });
  }
}