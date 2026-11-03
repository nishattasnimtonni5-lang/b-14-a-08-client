'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/app/lib/auth-client';

export default function BookingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  type Booking = {
    _id: string;
    studioId: string;
    date: string;
    time: string;
    status: string;
  };

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/signin');
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (isPending || !session) return;

    async function fetchBookings() {
      try {
        const response = await fetch(
          'http://localhost:5000/api/my-bookings',
          {
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [isPending, session]);

  if (isPending) {
    return <p className="p-6">Loading...</p>;
  }

  if (!session) {
    return <p className="p-6">Redirecting to sign in...</p>;
  }

  if (loading) {
    return <p className="p-6">Loading bookings...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div key={booking._id} className="rounded-lg border p-4">
              <p>Studio ID: {booking.studioId}</p>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Status: {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}