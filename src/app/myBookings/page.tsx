"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

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

export default function BookingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = useCallback(async () => {
    try {
      const tokenResponse = await fetch(
        "https://b-14-a-08-server-x2zf.vercel.app/api/token",
        {
          credentials: "include",
        }
      );

      if (!tokenResponse.ok) {
        throw new Error("Unable to generate access token");
      }

      const tokenData = await tokenResponse.json();

      const response = await fetch(
        "https://b-14-a-08-server-x2zf.vercel.app/api/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        }
      );

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
    if (isPending) return;

    if (!session) {
      router.replace("/signin");
      return;
    }

    void Promise.resolve().then(fetchBookings);
  }, [isPending, session, router, fetchBookings]);

  if (isPending || loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-12">
        <div className="h-9 w-56 animate-pulse rounded-lg bg-gray-200" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse overflow-hidden rounded-2xl border border-gray-200"
            >
              <div className="h-48 bg-gray-200" />

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

  if (!session) {
    return null;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="mb-3 text-2xl font-bold">Something went wrong</h2>
        <p className="mb-6 text-gray-500">{error}</p>

        <button
          onClick={() => {
            setLoading(true);
            fetchBookings();
          }}
          className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-600">
              StudioSpace
            </p>

            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
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
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-800">
              No bookings yet
            </h2>

            <p className="mb-6 text-gray-500">
              You have not booked any studio yet.
            </p>

            <button
              onClick={() => router.push("/studios")}
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Explore Studios
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <article
                key={booking._id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {booking.studio?.image ? (
                  <img
                    src={booking.studio.image}
                    alt={
                      booking.studio.name ||
                      booking.studio.title ||
                      "Studio"
                    }
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-gray-100 text-gray-400">
                    Studio Image
                  </div>
                )}

                <div className="space-y-4 p-5">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
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
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}