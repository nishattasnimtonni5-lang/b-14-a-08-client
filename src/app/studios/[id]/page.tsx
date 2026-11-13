import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Star,
  Users,
  ShieldCheck,
  UserRound,
  MessageSquare,
  Clock,
} from "lucide-react";
import type { Studio } from "@/data/studios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { BookingForm } from "../bookingform";
import { API_BASE_URL } from "@/app/lib/api";
import StudioGallery from "./StudioGallery";
import ReviewForm from "./ReviewForm";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

const badgeColors: Record<string, string> = {
  "Photo Studio": "bg-emerald-500",
  "Podcast Room": "bg-indigo-500",
  "Music Studio": "bg-orange-500",
  "Sound Stage": "bg-sky-500",
  "Art Workshop": "bg-pink-500",
};
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
    const res = await fetch(`${API_BASE_URL}/api/studios/${id}`);
    const payload: unknown = await res.json();
    fetchFailed = !res.ok && res.status !== 404;
    studio = res.ok ? (payload as Studio) : null;
  } catch {
    fetchFailed = true;
  }

  if (!studio) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
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

  const amenities = studio.amenities ?? [];
  const rating = Number(studio.rating ?? 0);
  const reviews = Number(studio.reviews ?? 0);

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
             <StudioGallery
  images={studio.gallery?.length ? studio.gallery : [studio.image]}
  studioName={studio.name}
  category={studio.category}
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
                      {rating.toFixed(1)}
                    </span>
                    <span>({reviews} reviews)</span>
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} className="text-emerald-400" />
                    {studio.location}
                  </span>
                </div>
              </div>

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

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <h2 className="text-xl font-bold text-slate-900">
                  Workspace Overview
                </h2>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {studio.overview ||
                    "No detailed overview is available for this workspace yet."}
                </p>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <h2 className="text-xl font-bold text-slate-900">
                  Full Workspace Specifications
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-50 p-3">
                      <Users className="text-emerald-600" size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Maximum Capacity</p>
                      <p className="font-semibold text-slate-900">
                        {studio.maxCapacity ?? "Not specified"}{" "}
                        {studio.maxCapacity ? "people" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-50 p-3">
                      <ShieldCheck className="text-emerald-600" size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Security Deposit</p>
                      <p className="font-semibold text-slate-900">
                        {studio.securityDeposit != null
                          ? `$${studio.securityDeposit}`
                          : "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-50 p-3">
                      <Clock className="text-emerald-600" size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Hourly Price</p>
                      <p className="font-semibold text-slate-900">
                        ${studio.price} / hour
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-50 p-3">
                      <MapPin className="text-emerald-600" size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Category</p>
                      <p className="font-semibold text-slate-900">
                        {studio.category}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <h2 className="text-xl font-bold text-slate-900">
                  Amenities & Facilities
                </h2>

                {amenities.length > 0 ? (
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {amenities.map((amenity, index) => (
                      <div
                        key={`${amenity}-${index}`}
                        className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          ✓
                        </span>
                        <span className="text-sm font-medium text-slate-700">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">
                    No amenities have been added yet.
                  </p>
                )}
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <div className="flex items-center gap-2">
                  <MessageSquare className="text-emerald-500" size={22} />
                  <h2 className="text-xl font-bold text-slate-900">
                    Reviews & Ratings
                  </h2>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-5 rounded-xl bg-slate-50 p-5">
                  <div>
                    <p className="text-4xl font-extrabold text-slate-900">
                      {rating.toFixed(1)}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <Star
                          key={item}
                          size={16}
                          className={
                            item <= Math.round(rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {reviews} Reviews
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Overall workspace rating
                    </p>
                  </div>
                </div>

                
                <ReviewForm studioId={id} />
              </section>
            </div>

            <div>
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <div className="flex items-center gap-2">
                  <UserRound className="text-emerald-500" size={22} />
                  <h2 className="text-xl font-bold text-slate-900">
                    Host Details
                  </h2>
                </div>

                <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                  <UserRound size={28} className="text-emerald-600" />
                </div>

                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Hosted by
                  </p>
                  <p className="mt-1 break-words font-semibold text-slate-900">
                    {studio.userName || "Host information unavailable"}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Contact Email
                  </p>
                  <p className="mt-2 break-all text-sm text-slate-700">
                    {studio.userEmail || "Host email unavailable"}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default detailsPage;