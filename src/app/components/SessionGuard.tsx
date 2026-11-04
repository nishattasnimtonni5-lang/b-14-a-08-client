"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";


export default function SessionGuard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking session...</p>
      </div>
    );
  }

  return null;
}