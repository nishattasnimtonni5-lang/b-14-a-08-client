"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL, getAccessToken } from "@/app/lib/api";
import { toast } from "sonner";
import PageSkeleton from "@/components/page-skeleton";

type Studio = {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  image: string;
};

async function readApiJson<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";

  if (
    !contentType.includes("application/json") &&
    !contentType.includes("+json")
  ) {
    throw new Error(
      `Expected a JSON response from the API, but received ${
        contentType || "an unknown content type"
      } (HTTP ${response.status}). Check the API URL and server deployment.`
    );
  }

  return response.json() as Promise<T>;
}

function getApiErrorMessage(data: unknown): string | undefined {
  if (
    data &&
    typeof data === "object" &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    return data.message;
  }
}

export default function MyListingsPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [token, setToken] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchStudios = async () => {
    try {
      const tokenData = { token: await getAccessToken() };
      setToken(tokenData.token);

      const response = await fetch(`${API_BASE_URL}/api/my-studios`, {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      });

      const data = await readApiJson<Studio[]>(response);

      if (!response.ok) {
        throw new Error(getApiErrorMessage(data) || "Failed to load studios");
      }

      setStudios(data);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void Promise.resolve().then(fetchStudios);
  }, []);

  const handleEdit = (studio: Studio) => {
    setEditingId(studio.id);

    setFormData({
      name: studio.name,
      category: studio.category,
      location: studio.location,
      price: String(studio.price),
      image: studio.image,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/studios/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await readApiJson<unknown>(response);

      if (!response.ok) {
        throw new Error(getApiErrorMessage(data) || "Update failed");
      }

      toast.success("Studio updated successfully!");
      setEditingId(null);
      await fetchStudios();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this studio?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/studios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await readApiJson<unknown>(response);

      if (!response.ok) {
        throw new Error(getApiErrorMessage(data) || "Delete failed");
      }

      setStudios(studios.filter((studio) => studio.id !== id));
      toast.success("Studio deleted successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  };

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My Listings</h1>

      {studios.length === 0 && (
        <p className="text-gray-500">You haven&apos;t added any studios yet.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((studio) => (
          <div key={studio.id} className="rounded-xl border p-4">
            <img
              src={studio.image}
              alt={studio.name}
              className="h-48 w-full rounded-lg object-cover"
            />

            <h2 className="mt-3 text-xl font-bold">{studio.name}</h2>
            <p>{studio.category}</p>
            <p>{studio.location}</p>
            <p>${studio.price}/hour</p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleEdit(studio)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(studio.id)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <form
          onSubmit={handleUpdate}
          className="mt-10 space-y-4 rounded-xl border bg-white p-6"
        >
          <h2 className="text-2xl font-bold">Edit Studio</h2>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Studio name"
            required
            className="w-full rounded-lg border p-3"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select category</option>
            <option value="Photo Studio">Photo Studio</option>
            <option value="Podcast Room">Podcast Room</option>
            <option value="Music Studio">Music Studio</option>
            <option value="Sound Stage">Sound Stage</option>
            <option value="Art Workshop">Art Workshop</option>
          </select>

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            name="price"
            type="number"
            min="1"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price per hour"
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full rounded-lg border p-3"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-5 py-2 text-white"
            >
              Update Studio
            </button>

            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="rounded-lg bg-gray-500 px-5 py-2 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </main>
  );
}