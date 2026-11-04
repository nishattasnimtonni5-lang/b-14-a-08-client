import type { Studio } from "@/data/studios";
import { API_BASE_URL } from "./api";

const STUDIOS_API_URL = `${API_BASE_URL}/api/studios`;

export async function fetchStudios(): Promise<Studio[]> {
  const response = await fetch(STUDIOS_API_URL, { next: { revalidate: 300 } });

  if (!response.ok) {

    throw new Error(`Failed to load studios (HTTP ${response.status}).`);

  }

  const payload: unknown = await response.json();

  if (Array.isArray(payload)) {

    return payload as Studio[];

  }

  if (payload && typeof payload === "object") {

    const result = payload as { data?: unknown; studios?: unknown };

    if (Array.isArray(result.data)) {

      return result.data as Studio[];

    }

    if (Array.isArray(result.studios)) {

      return result.studios as Studio[];

    }

  }

  throw new Error("Studios API returned an unexpected response.");

}