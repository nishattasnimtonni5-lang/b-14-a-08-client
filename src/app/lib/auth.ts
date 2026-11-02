import { betterAuth } from "better-auth";

import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("studio-space");

export const auth = betterAuth({
     emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db),
});