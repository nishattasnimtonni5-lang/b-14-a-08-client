import Link from "next/link";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { Studio } from "@/data/studios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type Props = {
  params: Promise<{ id: string }>;
};

// Maps a category label to its badge color (same palette as the studio cards).
const badgeColors: Record<string, string> = {
  "Photo Studio": "bg-emerald-500",
  "Podcast Room": "bg-indigo-500",
  "Music Studio": "bg-orange-500",
  "Sound Stage": "bg-sky-500",
  "Art Workshop": "bg-pink-500",
};

// Card shown when the studio can't be loaded or doesn't exist.
const StatusMessage = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <main className="flex flex-1 items-center justify-center px-6 py-24">
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a1615] p-8 text-center">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-6 py-2.5 text-sm font-semibold text-[#04100e] transition-transform hover:scale-105"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>
    </div>
  </main>
);

const detailsPage = async({params}:Props) => {
    const {id}=await params;

 
  let studio: Studio | null = null;
  let fetchFailed = false;

  try {
    const res = await fetch(`https://b-14-a-08-server.vercel.app/api/studios/${id}`);
    studio = await res.json()
    fetchFailed = !res.ok;
  } catch {
    fetchFailed = true;
  }

  // The API answers `null` (with HTTP 200) when no studio matches the id,
  // so we must check the parsed body, not only res.ok.
  if (!studio) {
    return (
      <div className="flex min-h-screen flex-col bg-[#04100e] font-sans text-white">
        <Navbar />
        {fetchFailed ? (
          <StatusMessage
            title="Something went wrong"
            description="We couldn't load this studio. Please check that your API server is running and try again."
          />
        ) : (
          <StatusMessage
            title="Studio not found"
            description="The studio you're looking for doesn't exist or may have been removed."
          />
        )}
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#04100e] font-sans text-white">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-8">
          {/* Back link */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Studios
          </Link>

          {/* Details: image on the left, info + booking card on the right */}
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
            {/* Image + category badge */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#0a1615] lg:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={studio.image}
                alt={studio.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1615]/60 via-transparent to-transparent" />
              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold text-white ${
                  badgeColors[studio.category] ?? "bg-emerald-500"
                }`}
              >
                {studio.category}
              </span>
            </div>

            {/* Info + booking */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {studio.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Star size={15} className="fill-amber-400 text-amber-400" />
                    <span className="font-medium text-slate-200">
                      {studio.rating.toFixed(1)}
                    </span>
                    <span>({studio.reviews} reviews)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} className="text-emerald-400" />
                    {studio.location}
                  </span>
                </div>
              </div>

              {/* Booking card */}
              <div className="rounded-2xl border border-white/10 bg-[#0a1615] p-6">
                <p className="text-sm text-slate-300">
                  <span className="text-3xl font-extrabold text-emerald-400">
                    ${studio.price}
                  </span>
                  <span className="text-slate-400"> / hr</span>
                </p>
                {/* Swap this <button> for a <Link href={...}> when the booking page exists. */}
                <button
                  type="button"
                  className="mt-5 w-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 py-3 text-sm font-semibold text-[#04100e] shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-transform hover:scale-[1.02]"
                >
                  Book This Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default detailsPage;
