
import React, { useEffect } from 'react';
import { authClient } from '../lib/auth-client';
import { useRouter } from 'next/navigation';

export default function bookingsPage  () {
   const router=useRouter();
   const {data:session,isPending}=authClient.useSession();
  useEffect(()=>{
    if(!isPending && !session){
        router.replace("/signin")
    }
},
    [isPending ,session,router])
    if(isPending || !session){
        return <p className="p-6">Loading...</p>
    }
  
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">My Bookings</h1>
        </div>
    );
};

