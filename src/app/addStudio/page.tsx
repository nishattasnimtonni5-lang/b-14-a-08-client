"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AddStudioPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const tokenResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/token`,
        {
          credentials: "include",
        }
      );

      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok) {
        throw new Error(tokenData.message || "Failed to get token");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/studios`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add studio");
      }

      alert("Studio added successfully!");
      router.push("/explore");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Add Your Studio
          </h1>
          <p className="mt-2 text-slate-600">
            Share your studio with creators and help them find the perfect space.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Studio Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter studio name"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            >
              <option value="">Select category</option>
              <option value="Photo Studio">Photo Studio</option>
              <option value="Podcast Room">Podcast Room</option>
              <option value="Music Studio">Music Studio</option>
              <option value="Sound Stage">Sound Stage</option>
              <option value="Art Workshop">Art Workshop</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter studio location"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Price per Hour ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              placeholder="Enter hourly price"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Studio Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Adding Studio..." : "Add Studio"}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}