import Link from "next/link";
import { Search, CalendarCheck, Zap, ArrowRight, Check } from "lucide-react";

const highlights = [
  {
    id: "1",
    title: "Easy Studio Discovery",
    description:
      "Explore different studios and find the perfect space for your creative needs.",
    icon: Search,
    accent:
      "bg-emerald-500/15 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_22px_rgba(16,185,129,0.4)]",
  },
  {
    id: "2",
    title: "Simple Booking Process",
    description: "Book your preferred studio with just a few easy steps.",
    icon: CalendarCheck,
    accent:
      "bg-sky-500/15 text-sky-600 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-[0_0_22px_rgba(14,165,233,0.4)]",
  },
  {
    id: "3",
    title: "Convenient Experience",
    description:
      "Access studio information, pricing, and booking details in one place.",
    icon: Zap,
    accent:
      "bg-indigo-500/15 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-[0_0_22px_rgba(99,102,241,0.4)]",
  },
];

const AboutUs = () => {
  return (
    <section id="about" className="bg-slate-50 pb-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <span className="mb-3 block h-[3px] w-10 rounded-full bg-emerald-400" />
            <span className="mb-3 block text-[11px] font-bold tracking-[0.2em] text-emerald-600">
              ABOUT STUDIOSPACE
            </span>
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">
              Find the Perfect Space for Your Creativity
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              StudioSpace makes it easier to discover and book creative studios
              that match your needs. Whether you are a photographer, content
              creator, artist, or someone looking for a professional space, we
              help you find the right studio for your next project.
            </p>

            {/* Key highlights */}
            <div className="mt-7 space-y-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:shadow-[0_0_24px_rgba(16,185,129,0.18)]"
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-all duration-300 ${item.accent}`}
                    >
                      <Icon size={19} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    </div>
                    <Check
                      size={16}
                      className="ml-auto mt-1 hidden shrink-0 text-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block"
                    />
                  </div>
                );
              })}
            </div>

            <Link
              href="/explore"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-8 py-3.5 text-sm font-semibold text-[#04100e] shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-transform hover:scale-105"
            >
              Explore Studios
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Image column */}
          <div className="group relative order-1 lg:order-2">
            <span className="absolute -left-4 -top-4 hidden h-24 w-24 rounded-2xl border border-emerald-400/40 lg:block" />
            <span className="absolute -bottom-4 -right-4 hidden h-24 w-24 rounded-2xl bg-emerald-400/20 lg:block" />

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1200&q=80"
                alt="Creative photography studio with professional lighting"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:aspect-[4/3] lg:aspect-[5/4]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04100e]/45 via-transparent to-transparent" />

              {/* Floating stat card */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl border border-white/25 bg-white/90 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1 sm:right-auto">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-500/15 text-emerald-600">
                  <Zap size={18} />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    One place for everything
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Studios, pricing &amp; bookings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
