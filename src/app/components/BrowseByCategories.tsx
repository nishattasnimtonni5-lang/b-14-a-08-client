import Link from "next/link";
import { Camera, Mic, Music, Video, Palette, ArrowRight } from "lucide-react";
import { categories, type Category } from "@/data/categories";

const icons = {
  camera: Camera,
  mic: Mic,
  music: Music,
  video: Video,
  palette: Palette,
};

// Per-category accent color for the icon tile.
const accents: Record<Category["icon"], string> = {
  camera: "bg-emerald-500/15 text-emerald-400",
  mic: "bg-indigo-500/15 text-indigo-400",
  music: "bg-orange-500/15 text-orange-400",
  video: "bg-sky-500/15 text-sky-400",
  palette: "bg-pink-500/15 text-pink-400",
};

const CategoryCard = ({ category }: { category: Category }) => {
  const Icon = icons[category.icon];

  return (
    <Link
      href={`/explore?category=${encodeURIComponent(category.name)}`}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a1615] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_0_28px_rgba(16,185,129,0.22)]"
    >
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] ${
          accents[category.icon]
        }`}
      >
        <Icon size={20} />
      </span>
      <span className="flex-1 text-sm font-semibold text-white">{category.name}</span>
      <ArrowRight
        size={16}
        className="text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-400"
      />
    </Link>
  );
};

const BrowseByCategories = () => {
  return (
    <section className="bg-[#04100e] pb-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            Browse by Categories
          </h2>
          <p className="mt-1.5 text-sm text-slate-400">
            Find the perfect studio for your creative needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategories;
