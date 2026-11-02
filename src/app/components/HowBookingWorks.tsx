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
  search: "bg-emerald-500/15 text-emerald-400 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.4)]",
  grid: "bg-indigo-500/15 text-indigo-400 group-hover:shadow-[0_0_24px_rgba(99,102,241,0.4)]",
  calendar: "bg-sky-500/15 text-sky-400 group-hover:shadow-[0_0_24px_rgba(14,165,233,0.4)]",
  sparkles: "bg-pink-500/15 text-pink-400 group-hover:shadow-[0_0_24px_rgba(236,72,153,0.4)]",
};

const StepCard = ({ step }: { step: BookingStep }) => {
  const Icon = icons[step.icon];

  return (
    <div className="group relative flex flex-1 flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.22)]">
      <span
        className={`mb-4 grid h-16 w-16 place-items-center rounded-2xl transition-shadow duration-300 ${
          accents[step.icon]
        }`}
      >
        <Icon size={26} />
      </span>
      <span className="mb-2 text-[11px] font-bold tracking-[0.2em] text-emerald-700">
        STEP {step.step}
      </span>
      <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
    </div>
  );
};

const HowBookingWorks = () => {
  return (
    <section id="how-it-works" className="bg-slate-50 pb-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="mb-8">
          <span className="mb-3 block h-[3px] w-10 rounded-full bg-emerald-400" />
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            How Booking Works
          </h2>
          <p className="mt-1.5 text-sm text-slate-600">
            Get your space in just a few simple steps.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          {bookingSteps.map((step, idx) => (
            <div key={step.id} className="flex flex-1 items-center gap-4">
              <StepCard step={step} />
              {idx < bookingSteps.length - 1 && (
                <ArrowRight
                  size={18}
                  className="hidden shrink-0 text-emerald-400/60 md:block"
                />
              )}
            </div>
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
