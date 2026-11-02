'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/app/lib/auth-client';

export default function BookingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/signin');
    }
  }, [isPending, session, router]);

  if (isPending) {
    return <p className="p-6">Loading...</p>;
  }

  if (!session) {
    return <p className="p-6">Redirecting to sign in...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Bookings</h1>
    </div>
  );
}

