
import Link from "next/link";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { Studio } from "@/data/studios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { BookingForm } from "../bookingform";
import SessionGuard from "@/app/components/SessionGuard";

export const dynamic = "force-dynamic";

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
  <main className="flex flex-1 items-center justify-center px-4 py-24 sm:px-6">
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center sm:p-8">
      <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
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

const detailsPage = async ({ params }: Props) => {
  const { id } = await params;

  let studio: Studio | null = null;
  let fetchFailed = false;

  try {
    const res = await fetch(
      `https://b-14-a-08-server-x2zf.vercel.app/api/studios/${id}`
    );
    const payload: unknown = await res.json();
    fetchFailed = !res.ok;
    studio = res.ok ? (payload as Studio) : null;
  } catch {
    fetchFailed = true;
  }

  if (!studio) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
       <SessionGuard />
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
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <main className="flex-1">
          <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
            <Link
              href="/explore"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-600"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Studios
            </Link>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={studio.image}
                  alt={studio.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold text-white ${
                    badgeColors[studio.category] ?? "bg-emerald-500"
                  }`}
                >
                  {studio.category}
                </span>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                    {studio.name}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Star size={15} className="fill-amber-400 text-amber-400" />
                      <span className="font-medium text-slate-700">
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
                <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
                  <p className="text-sm text-slate-600">
                    <span className="text-3xl font-extrabold text-emerald-400">
                      ${studio.price}
                    </span>
                    <span className="text-slate-500"> / hr</span>
                  </p>
                  <BookingForm studioId={id} />
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
