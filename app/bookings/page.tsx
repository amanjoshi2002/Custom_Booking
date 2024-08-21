'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useStyles } from '../contexts/StyleContext';
import { Booking } from '@/app/interface/booking';
import { API_ROUTES, PAGE_ROUTES } from '@/app/routes';

type SortOption = 'dateAsc' | 'dateDesc' | 'costAsc' | 'costDesc';

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { styles } = useStyles();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('dateDesc');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`${PAGE_ROUTES.LOGIN}?callbackUrl=${PAGE_ROUTES.BOOKINGS}`);
    } else if (status === 'authenticated') {
      fetchBookings();
      setupPushNotifications();
    }
  }, [status, router]);

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
            if (event.data && event.data.type === 'BOOKING_UPDATE') {
              console.log('Received booking update:', event.data.booking);
              updateBooking(event.data.booking);
            }
          });
        }
      } catch (error) {
        console.error('Error setting up push notifications:', error);
      }
    }
  };

  const updateBooking = (updatedBooking: Booking) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking._id === updatedBooking._id ? updatedBooking : booking
      )
    );
  };

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_ROUTES.GET_BOOKINGS);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data: Booking[] = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to fetch bookings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sortBookings = (option: SortOption) => {
    setSortOption(option);
    const sortedBookings = [...bookings].sort((a, b) => {
      switch (option) {
        case 'dateAsc':
          return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
        case 'dateDesc':
          return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
        case 'costAsc':
          return a.cost - b.cost;
        case 'costDesc':
          return b.cost - a.cost;
        default:
          return 0;
      }
    });
    setBookings(sortedBookings);
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (status === 'loading' || isLoading) {
    return (
      <>
        <NavBar />
        <Loading />
        <Footer />
      </>
    );
  }

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

  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">My Bookings</h1>
          <select
            className="border rounded px-2 py-1 text-black"
            value={sortOption}
            onChange={(e) => sortBookings(e.target.value as SortOption)}
          >
            <option value="dateDesc">Date (Newest First)</option>
            <option value="dateAsc">Date (Oldest First)</option>
            <option value="costDesc">Cost (Highest First)</option>
            <option value="costAsc">Cost (Lowest First)</option>
          </select>
        </div>
        {bookings.length === 0 ? (
          <p className="text-black">You have no bookings.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {currentBookings.map((booking) => (
                <li key={booking._id.toString()} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`${PAGE_ROUTES.BOOKINGS}/${booking._id.toString()}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-black">{booking.serviceName}</h3>
                        <p className="text-sm text-black">Date: {new Date(booking.dateTime).toLocaleString()}</p>
                        <p className="text-sm text-black">Cost: ${booking.cost.toFixed(2)}</p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        <button 
                          className="ml-2 px-3 py-1 rounded text-sm"
                          style={{ 
                            backgroundColor: styles.buttonColor, 
                            color: styles.textColor
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-black hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium text-black
                      ${number === currentPage
                        ? 'z-10 bg-indigo-50 border-indigo-500'
                        : 'bg-white border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-black hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'Pending': return 'bg-yellow-200 text-yellow-800';
    case 'Confirmed': return 'bg-green-200 text-green-800';
    case 'Cancelled': return 'bg-red-200 text-red-800';
    default: return 'bg-gray-200 text-gray-800';
  }
}