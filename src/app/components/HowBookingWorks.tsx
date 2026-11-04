import Link from "next/link";
import { Search, LayoutGrid, CalendarClock, Sparkles, ArrowRight } from "lucide-react";
import { bookingSteps, type BookingStep } from "@/data/bookingSteps";

const icons = {
  search: Search,
  grid: LayoutGrid,
  calendar: CalendarClock,
  sparkles: Sparkles,
};

const accents: Record<BookingStep["icon"], string> = {
  search: "bg-emerald-500/15 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_24px_rgba(16,185,129,0.45)]",
  grid: "bg-indigo-500/15 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-[0_0_24px_rgba(99,102,241,0.45)]",
  calendar: "bg-sky-500/15 text-sky-600 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-[0_0_24px_rgba(14,165,233,0.45)]",
  sparkles: "bg-pink-500/15 text-pink-600 group-hover:bg-pink-500 group-hover:text-white group-hover:shadow-[0_0_24px_rgba(236,72,153,0.45)]",
};

const stepAccents: Record<BookingStep["icon"], string> = {
  search: "group-hover:text-emerald-500",
  grid: "group-hover:text-indigo-500",
  calendar: "group-hover:text-sky-500",
  sparkles: "group-hover:text-pink-500",
};

const StepCard = ({ step }: { step: BookingStep }) => {
  const Icon = icons[step.icon];

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.22)] sm:p-6">
      {/* Numbered step indicator */}
      <span
        className={`absolute -right-2 -top-4 text-[64px] font-extrabold leading-none tracking-tight text-slate-100 transition-colors duration-300 ${stepAccents[step.icon]}`}
        aria-hidden="true"
      >
        {step.step}
      </span>

      <span
        className={`relative mb-5 grid h-14 w-14 place-items-center rounded-2xl transition-all duration-300 ${accents[step.icon]}`}
      >
        <Icon size={24} />
      </span>

      <span className="mb-1.5 text-[11px] font-bold tracking-[0.2em] text-emerald-600">
        STEP {step.step}
      </span>
      <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {step.description}
      </p>

      {/* Bottom accent line */}
      <span className="mt-5 h-1 w-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-300 group-hover:w-full" />
    </div>
  );
};

const HowBookingWorks = () => {
  return (
    <section id="how-it-works" className="bg-slate-50 pb-14 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <span className="mb-3 block h-[3px] w-10 rounded-full bg-emerald-400" />
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            How Booking Works
          </h2>
          <p className="mt-1.5 text-sm text-slate-600">
            Get your space in just a few simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bookingSteps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-8 py-3.5 text-sm font-semibold text-[#04100e] shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-transform hover:scale-105"
          >
            Start Exploring
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowBookingWorks;
