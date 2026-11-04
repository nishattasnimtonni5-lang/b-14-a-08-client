import Link from "next/link";
import { ShieldCheck, Lock, Headphones, Zap, ArrowRight } from "lucide-react";
import { guarantees, type Guarantee } from "@/data/guarantees";

const icons = {
  shield: ShieldCheck,
  lock: Lock,
  headphones: Headphones,
  zap: Zap,
};

const accents: Record<Guarantee["icon"], string> = {
  shield: "bg-emerald-500/15 text-emerald-400",
  lock: "bg-sky-500/15 text-sky-400",
  headphones: "bg-indigo-500/15 text-indigo-400",
  zap: "bg-amber-500/15 text-amber-400",
};

const GuaranteeCard = ({ item }: { item: Guarantee }) => {
  const Icon = icons[item.icon];

  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.22)] sm:gap-4 sm:p-5">
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_22px_rgba(16,185,129,0.35)] ${
          accents[item.icon]
        }`}
      >
        <Icon size={20} />
      </span>
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{item.description}</p>
      </div>
    </div>
  );
};

const HostGuarantee = () => {
  return (
    <section className="bg-slate-50 pb-14 sm:pb-16 lg:pb-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-10 lg:px-8">
        {/* Heading */}
        <div>
          <span className="mb-3 block h-[3px] w-10 rounded-full bg-emerald-400" />
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Host Guarantee &amp; Creator Support
          </h2>
          <p className="mt-1.5 text-sm text-slate-600">
            Your safety and success are our priority.
          </p>
          <Link
            href="/about"
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-600/60 px-6 py-2.5 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-400 hover:text-[#04100e] hover:shadow-[0_0_22px_rgba(16,185,129,0.45)]"
          >
            Become a Host
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Guarantee cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {guarantees.map((item) => (
            <GuaranteeCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostGuarantee;
