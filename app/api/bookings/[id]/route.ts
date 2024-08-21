import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Booking, BookingUpdateData } from '../../../interface/booking';

// GET request handler
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('GET /api/bookings/[id]: Start');
  console.log('Booking ID:', params.id);

  const session = await getServerSession(authOptions);
  console.log('Session:', session);

  if (!session || !session.user) {
    console.log('Unauthorized access attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookingsCollection = await getCollection('bookings');
    console.log('Connected to bookings collection');

    const booking = await bookingsCollection.findOne({
      _id: new ObjectId(params.id)
    });

    console.log('Fetched booking:', booking);

    if (!booking) {
      console.log('Booking not found');
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    console.log('GET /api/bookings/[id]: End');
    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json({ error: 'Error fetching booking' }, { status: 500 });
  }
}

// PATCH request handler
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if user is authenticated
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Connect to MongoDB
    const bookingsCollection = await getCollection('bookings');
    
    // Extract update data from request body
    const { status, name, email, dateTime } = await request.json();

    // Prepare update data
    const updateData: BookingUpdateData = {};
    if (status === 'Cancelled') {
      updateData.status = 'Cancelled';
    }
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (dateTime) updateData.dateTime = new Date(dateTime);

    // Check if there's any data to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid update data provided' }, { status: 400 });
    }

    // Add a null check for session.user.email
    const userId = session.user.email ?? null;

    // Update the booking
    const result = await bookingsCollection.findOneAndUpdate(
      { _id: new ObjectId(params.id), userId: userId },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json(result.value);
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Error updating booking' }, { status: 500 });
  }
}