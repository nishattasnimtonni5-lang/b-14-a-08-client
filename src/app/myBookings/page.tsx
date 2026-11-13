"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_BASE_URL, getAccessToken } from "../lib/api";


type Booking = {
  _id: string;
  studioId: string;
  date: string;
  time: string;
  status: string;
  studio?: {
    name?: string;
    title?: string;
    image?: string;
    location?: string;
  };
};

 function BookingsContent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [token, setToken] = useState("");
  const fetchBookings = useCallback(async () => {
    try {
      const tokenData = { token: await getAccessToken() };
      setToken(tokenData.token);
      const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data);
      setError("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(fetchBookings);
  }, [fetchBookings]);

  const handleCancel = async (bookingId: string) => {
  if (!window.confirm("Are you sure you want to cancel this booking?")) {
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/bookings/${bookingId}/cancel`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Cancellation failed");
    }

    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === bookingId
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
  } catch (error) {
    alert(error instanceof Error ? error.message : "Something went wrong");
  }
};
  if (loading) {
    return (
   
      <div className="mx-auto max-w-[1280px] space-y-6 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
         <Navbar/>
        <div className="h-9 w-56 animate-pulse rounded-lg bg-gray-200" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse overflow-hidden rounded-2xl border border-gray-200"
            >
              <div className="aspect-[16/10] bg-gray-200" />

              <div className="space-y-4 p-5">
                <div className="h-5 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="h-10 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="mb-3 text-2xl font-bold">Something went wrong</h2>
        <p className="mb-6 text-gray-500">{error}</p>

        <button
          onClick={() => {
            setLoading(true);
            void fetchBookings();
          }}
          className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-600">
            StudioSpace
          </p>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage and track your studio reservations.
          </p>
        </div>

        <div className="rounded-xl bg-white px-6 py-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold text-green-600">
            {bookings.length}
          </p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center sm:py-20">
          <h2 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl">
            No bookings yet
          </h2>

          <p className="mb-6 text-gray-500">
            You have not booked any studio yet.
          </p>

          <Link
            href="/explore"
            className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Explore Studios
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <article
              key={booking._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {booking.studio?.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={booking.studio.image}
                  alt={
                    booking.studio.name ||
                    booking.studio.title ||
                    "Studio"
                  }
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-gray-100 text-gray-400">
                  Studio Image
                </div>
              )}

              <div className="space-y-4 p-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                    {booking.studio?.name ||
                      booking.studio?.title ||
                      `Studio ${booking.studioId}`}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {booking.studio?.location || "Location not available"}
                  </p>
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                  <p className="flex justify-between gap-4">
                    <span className="text-gray-500">Booking Date</span>
                    <span className="font-medium text-gray-800">
                      {booking.date}
                    </span>
                  </p>

                  <p className="flex justify-between gap-4">
                    <span className="text-gray-500">Booking Time</span>
                    <span className="font-medium text-gray-800">
                      {booking.time}
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-500">Status</span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
     {["Pending", "Confirmed"].includes(booking.status) && (
  <button
    onClick={() => handleCancel(booking._id)}
    className="w-full rounded-lg bg-red-500 px-4 py-2.5 font-semibold text-white hover:bg-red-600"
  >
    Cancel Booking
  </button>
)}

              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BookingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="flex-1">
        <BookingsContent />
      </main>
      <Footer />
    </div>
  );
}
