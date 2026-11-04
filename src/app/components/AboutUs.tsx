import { Search, Info, CalendarCheck } from "lucide-react";

const values = [
  {
    id: "1",
    title: "Easy Discovery",
    description:
      "Explore available studios and find a space that matches your requirements.",
    icon: Search,
    accent: "bg-emerald-500/10 text-emerald-600",
    hover: "group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    bar: "from-emerald-400 to-teal-500",
    border: "hover:border-emerald-400/50",
    shadow: "hover:shadow-[0_0_26px_rgba(16,185,129,0.18)]",
  },
  {
    id: "2",
    title: "Clear Information",
    description:
      "View studio details, facilities, location, and pricing before making a booking decision.",
    icon: Info,
    accent: "bg-sky-500/10 text-sky-600",
    hover: "group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]",
    bar: "from-sky-400 to-cyan-500",
    border: "hover:border-sky-400/50",
    shadow: "hover:shadow-[0_0_26px_rgba(14,165,233,0.18)]",
  },
  {
    id: "3",
    title: "Simple Booking",
    description:
      "Choose your preferred studio and complete your booking through a straightforward process.",
    icon: CalendarCheck,
    accent: "bg-indigo-500/10 text-indigo-600",
    hover: "group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]",
    bar: "from-indigo-400 to-violet-500",
    border: "hover:border-indigo-400/50",
    shadow: "hover:shadow-[0_0_26px_rgba(99,102,241,0.18)]",
  },
];

const AboutUs = () => {
  return (
    <section id="about" className="bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Centered heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto mb-4 block h-[3px] w-10 rounded-full bg-emerald-400" />
          <span className="mb-3 block text-[11px] font-bold tracking-[0.2em] text-emerald-600">
            ABOUT STUDIOSPACE
          </span>
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">
            Making Studio Booking Simple and Convenient
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            Finding the right studio for a creative project should be simple and
            hassle-free. StudioSpace brings studio discovery and booking
            together in one place. Users can explore available studios, check
            important details, compare pricing, and reserve their preferred
            space through an easy booking process.
          </p>
        </div>

        {/* Value cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1.5 sm:p-6 ${item.border} ${item.shadow}`}
              >
                <span
                  className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl transition-all duration-300 ${item.accent} ${item.hover}`}
                >
                  <Icon size={22} />
                </span>
                <h3 className="text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <span
                  className={`mt-5 h-1 w-0 rounded-full bg-gradient-to-r ${item.bar} transition-all duration-300 group-hover:w-16`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
