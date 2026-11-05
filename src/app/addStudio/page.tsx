
"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../lib/api";
import { authClient } from "../lib/auth-client";

const amenitiesList = [
  "Wi-Fi",
  "Air Conditioning",
  "Parking",
  "Lighting Equipment",
  "Soundproofing",
  "Camera Equipment",
  "Furniture",
  "Restroom",
];

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    price: "",
    image: "",
    securityDeposit: "",
    maxCapacity: "",
    amenities: [] as string[],
    overview: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.amenities.length === 0) {
      setError("Please select at least one amenity");
      setLoading(false);
      return;
    }

    try {
      const tokenResponse = await fetch(`${API_BASE_URL}/api/token`, {
        credentials: "include",
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok) {
        throw new Error(tokenData.message || "Failed to get token");
      }

      const response = await fetch(`${API_BASE_URL}/api/studios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          securityDeposit: Number(formData.securityDeposit),
          maxCapacity: Number(formData.maxCapacity),
          userName: session?.user?.name || "",
          userEmail: session?.user?.email || "",
        }),
      });

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

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Security Deposit ($)
            </label>
            <input
              type="number"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleChange}
              min="0"
              placeholder="Enter security deposit"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Maximum Capacity
            </label>
            <input
              type="number"
              name="maxCapacity"
              value={formData.maxCapacity}
              onChange={handleChange}
              min="1"
              placeholder="Enter maximum number of people"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Amenities List
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-700 transition hover:border-emerald-500"
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="h-4 w-4 accent-emerald-500"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Detailed Overview
            </label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              placeholder="Describe your studio in detail..."
              rows={5}
              required
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              User Name
            </label>
            <input
              type="text"
              value={session?.user?.name || ""}
              readOnly
              className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 text-slate-600 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              User Email
            </label>
            <input
              type="email"
              value={session?.user?.email || ""}
              readOnly
              className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 text-slate-600 outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading || !session?.user}
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
