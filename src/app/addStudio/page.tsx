import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AddStudioPage() {
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

        <form className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Studio Name
            </label>
            <input
              type="text"
              placeholder="Enter studio name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>
            <select className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500">
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
              placeholder="Enter studio location"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Price per Hour ($)
            </label>
            <input
              type="number"
              min="1"
              placeholder="Enter hourly price"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Studio Image URL
            </label>
            <input
              type="url"
              placeholder="Enter image URL"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            Add Studio
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}