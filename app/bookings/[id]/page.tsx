'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import Loading from '@/app/components/Loading';
import { useStyles } from '@/app/contexts/StyleContext';
import { Booking, BookingUpdateData } from '@/app/interface/booking';
import { API_ROUTES, PAGE_ROUTES } from '@/app/routes';

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const { styles } = useStyles();
  // State management
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState<BookingUpdateData>({});
  const router = useRouter();

  useEffect(() => {
    console.log('Fetching booking with ID:', params.id);
    fetchBooking();
    setupPushNotifications();
  }, [params.id]);

  const setupPushNotifications = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered successfully');

        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const response = await fetch(API_ROUTES.GET_VAPID_PUBLIC_KEY);
          const { publicKey } = await response.json();

          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey
          });

          await fetch(API_ROUTES.SUBSCRIBE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription)
          });

          console.log('Push notification subscription successful');

          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'BOOKING_UPDATE' && event.data.booking._id === params.id) {
              console.log('Received booking update:', event.data.booking);
              setBooking(event.data.booking);
            }
          });
        }
      } catch (error) {
        console.error('Error setting up push notifications:', error);
      }
    }
  };

  const fetchBooking = async () => {
    try {
      const response = await fetch(`${API_ROUTES.GET_BOOKINGS}/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch booking');
      }
      const data: Booking = await response.json();
      console.log('Fetched booking data:', data);
      setBooking(data);
    } catch (error) {
      console.error('Error fetching booking:', error);
      setError('Failed to fetch booking details');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle booking cancellation
  const handleCancel = async () => {
    if (!booking) return;

    try {
      console.log('Attempting to cancel booking:', booking._id.toString());
      const response = await fetch(API_ROUTES.UPDATE_BOOKING.replace(':id', booking._id.toString()), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to cancel booking');
      }

      const updatedBooking: Booking = await response.json();
      console.log('Booking cancelled successfully:', updatedBooking);
      setBooking(updatedBooking);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setError('Failed to cancel booking. Please try again.');
    }
  };

  // Switch to edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setEditedBooking({
      name: booking?.name,
      email: booking?.email,
      dateTime: booking?.dateTime,
    });
  };

  // Save edited booking
  const handleSave = async () => {
    if (!booking) return;

    try {
      const response = await fetch(API_ROUTES.UPDATE_BOOKING.replace(':id', booking._id.toString()), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedBooking),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update booking');
      }

      const updatedBooking: Booking = await response.json();
      setBooking(updatedBooking);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating booking:', error);
      setError('Failed to update booking. Please try again.');
    }
  };

  // Handle input changes in edit mode
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedBooking(prev => ({ ...prev, [name]: value }));
  };

  // Render loading state
  if (isLoading) {
    return (
      <div >
        <NavBar />
        <Loading/>
        <Footer />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={styles.backgroundColor}>
        <NavBar />
        <div className="container mx-auto mt-8 px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Handle case when booking is not found
  if (!booking) {
    notFound();
  }

  // Render booking details
  return (
    <div className="bg-white">
      <NavBar />
      <div className="container mx-auto mt-8 px-4">
        <Link href={PAGE_ROUTES.BOOKINGS} className="text-black hover:underline mb-4 inline-block" style={{ color: styles.textColor }}>&larr; Back to Bookings</Link>
        <h1 className={`text-3xl font-bold mb-6 ${styles.textColor}`}>Booking Details</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className={`text-sm mb-2 ${styles.textColor}`}>Booking ID: {booking._id.toString()}</p>
          <h2 className={`text-2xl font-semibold mb-4 ${styles.textColor}`}>{booking.serviceName}</h2>
          
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editedBooking.name || ''}
                onChange={handleInputChange}
                className="mb-2 p-2 border rounded w-full text-black"
              />
              <input
                type="email"
                name="email"
                value={editedBooking.email || ''}
                onChange={handleInputChange}
                className="mb-2 p-2 border rounded w-full text-black"
              />
              <input
                type="datetime-local"
                name="dateTime"
                value={editedBooking.dateTime ? new Date(editedBooking.dateTime).toISOString().slice(0, 16) : ''}
                onChange={handleInputChange}
                className="mb-2 p-2 border rounded w-full text-black"
              />
            </>
          ) : (
            <>
              <p className={`mb-2 ${styles.textColor}`}>Date: {new Date(booking.dateTime).toLocaleString()}</p>
              <p className={`mb-2 ${styles.textColor}`}>Cost: ${booking.cost.toFixed(2)}</p>
              <p className={`mb-4 ${styles.textColor}`}>Status: <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>{booking.status}</span></p>
              
              <h3 className={`text-xl font-semibold mt-6 mb-2 ${styles.textColor}`}>Customer Information</h3>
              <p className={`mb-1 ${styles.textColor}`}>Name: {booking.name}</p>
              <p className={`mb-4 ${styles.textColor}`}>Email: {booking.email}</p>
            </>
          )}
          
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded mr-2"
              style={{ 
                backgroundColor: styles.buttonColor, 
                color: styles.textColor
              }}
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 rounded mr-2"
              style={{ 
                backgroundColor: styles.buttonColor, 
                color: styles.textColor
              }}
            >
              Edit Booking
            </button>
          )}
          
          {booking.status !== 'Cancelled' && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded hover:opacity-80"
              style={{ 
                backgroundColor: styles.buttonColor, 
                color: styles.textColor
              }}
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Helper function to get status color
function getStatusColor(status: string): string {
  switch (status) {
    case 'Pending': return 'bg-yellow-200 text-yellow-800';
    case 'Confirmed': return 'bg-green-200 text-green-800';
    case 'Cancelled': return 'bg-red-200 text-red-800';
    default: return '';
  }
}