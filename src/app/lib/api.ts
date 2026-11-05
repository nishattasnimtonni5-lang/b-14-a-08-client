const configuredApiBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL
  ?.trim()
  .replace(/\/+$/, "");

export const API_BASE_URL =
  configuredApiBaseUrl || "https://b-14-a-08-server-x2zf.vercel.app";

export async function getAccessToken(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/token`, {
    credentials: "include",
  });
  const data: unknown = await response.json();

  const token =
    data &&
    typeof data === "object" &&
    "token" in data &&
    typeof data.token === "string"
      ? data.token
      : "";
  const message =
    data &&
    typeof data === "object" &&
    "message" in data &&
    typeof data.message === "string"
      ? data.message
      : undefined;

  if (!response.ok) {
    throw new Error(message || "Unable to generate access token");
  }

  if (!token) {
    throw new Error("The authentication server returned no access token");
  }

  return token;
}
