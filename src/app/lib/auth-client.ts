import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
import { API_BASE_URL } from "./api";

export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
  plugins: [
    jwtClient(),
  ],
});

export async function signInWithGoogle(callbackURL = "/") {
  return authClient.signIn.social({
    provider: "google",
    callbackURL,
  });
}