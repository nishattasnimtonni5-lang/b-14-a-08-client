import { createAuthClient } from "better-auth/react";

const authBaseURL =
  typeof window === "undefined"
    ? "http://localhost:3000/api/auth"
    : new URL("/api/auth", window.location.origin).toString();

export const authClient = createAuthClient({
  baseURL: authBaseURL,
});
console.log("AUTH CLIENT FILE LOADED");