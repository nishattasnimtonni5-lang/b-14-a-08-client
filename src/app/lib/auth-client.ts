import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins"
export const authClient = createAuthClient({
  baseURL: "https://b-14-a-08-server-x2zf.vercel.app",
  plugins:[
    jwtClient(),
  ]
});