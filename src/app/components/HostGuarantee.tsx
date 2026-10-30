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
    <div className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0a1615] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.22)]">
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_22px_rgba(16,185,129,0.35)] ${
          accents[item.icon]
        }`}
      >
        <Icon size={20} />
      </span>
      <div>
        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{item.description}</p>
      </div>
    </div>
  );
};

const HostGuarantee = () => {
  return (
    <section className="bg-[#04100e] pb-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-10 px-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:px-8">
        {/* Heading */}
        <div>
          <span className="mb-3 block h-[3px] w-10 rounded-full bg-emerald-400" />
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            Host Guarantee &amp; Creator Support
          </h2>
          <p className="mt-1.5 text-sm text-slate-400">
            Your safety and success are our priority.
          </p>
          <Link
            href="/host"
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/60 px-6 py-2.5 text-sm font-semibold text-emerald-400 transition-all duration-300 hover:bg-emerald-400 hover:text-[#04100e] hover:shadow-[0_0_22px_rgba(16,185,129,0.45)]"
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
