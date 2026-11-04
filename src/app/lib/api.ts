const configuredApiBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL
  ?.trim()
  .replace(/\/+$/, "");

export const API_BASE_URL =
  configuredApiBaseUrl || "https://b-14-a-08-server-x2zf.vercel.app";
