
import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Studio } from "@/data/studios";
import { fetchStudios } from "../lib/studios";
export const dynamic='force-dynamic'

// Maps a category label to its badge color.
const badgeColors: Record<string, string> = {
  "Photo Studio": "bg-emerald-500",
  "Podcast Room": "bg-indigo-500",
  "Music Studio": "bg-orange-500",
  "Sound Stage": "bg-sky-500",
  "Art Workshop": "bg-pink-500",
};

export const StudioCard = ({ studio }: { studio: Studio }) => (
  <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]">
    {/* Image + category badge */}
    <div className="relative aspect-[16/10] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={studio.image}
        alt={studio.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
      <span
        className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold text-white ${
          badgeColors[studio.category] ?? "bg-emerald-500"
        }`}
      >
        {studio.category}
      </span>
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col gap-2 p-4">
      <h3 className="text-base font-semibold text-slate-900">{studio.name}</h3>
      <p className="text-sm text-slate-600">
        <span className="font-bold text-emerald-700">${studio.price}</span>
        <span className="text-slate-500"> / hr</span>
      </p>
      <p className="flex items-center gap-1.5 text-xs text-slate-500">
        <Star size={13} className="fill-amber-400 text-amber-400" />
        <span className="font-medium text-slate-700">{studio.rating.toFixed(1)}</span>
        <span>({studio.reviews})</span>
      </p>
      <p className="flex items-center gap-1.5 text-xs text-slate-500">
        <MapPin size={13} className="text-emerald-400" />
        {studio.location}
      </p>

      <Link
        href={`/studios/${studio.id}`}
        className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-600/60 py-2.5 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-400 hover:text-[#04100e] hover:shadow-[0_0_20px_rgba(16,185,129,0.45)]"
      >
        View Details
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </article>
);

const FeaturedStudios = async() => {
  let studios: Studio[] = [];
  let errorMessage = "";

  try {
    studios = await fetchStudios();
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Unable to load studios.";
  }

 return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-3 block h-[3px] w-10 rounded-full bg-emerald-400" />
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Featured Studios
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Handpicked creative spaces, just for you.
            </p>
          </div>
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-600"
          >
            View All Studios
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {errorMessage ? (
          <p role="alert" className="text-sm text-slate-600">
            {errorMessage}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {studios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedStudios;
