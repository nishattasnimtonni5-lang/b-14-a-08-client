import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins"
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI environment variable is required");
}

const client = new MongoClient(mongoUri);

await client.connect();

const db = client.db("studio-space");

const productionAuthHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || "b-14-a-08-client.vercel.app";
const authBaseURL = {
  allowedHosts: [
    "localhost:3000",
    "b-14-a-08-client.vercel.app",
    ...(process.env.VERCEL_URL ? [process.env.VERCEL_URL] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [process.env.VERCEL_PROJECT_PRODUCTION_URL]
      : []),
  ],
  fallback: `https://${productionAuthHost}`,
  protocol: "auto" as const,
};

export const auth = betterAuth({
  baseURL: authBaseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    "http://localhost:3000",
    "https://b-14-a-08-client.vercel.app",
  
  ],
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
   socialProviders: {
        google: { 
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
        }, 
    },
  plugins:[
jwt()
  ],
  session:{
cookieCache:{
  enabled:true,
  strategy:"compact",
  maxAge:7*24*60*60,
}
  }

  ,
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
});