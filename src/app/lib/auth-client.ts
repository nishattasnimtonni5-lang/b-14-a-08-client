import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";


export const authClient = createAuthClient({
  baseURL:process.env.BETTER_AUTH_URL,
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