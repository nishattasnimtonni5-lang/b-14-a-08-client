"use client";

import { useMemo, useState } from "react";
import { StudioCard } from "../components/FeaturedStudios";
import type { Studio } from "@/data/studios";
import { categories as homeCategories } from "@/data/categories";

/**
 * Category filter + studio grid for the Explore Studios page.
 * The active chip can be preselected from the URL (e.g. homepage
 * "Browse by Categories" → /explore?category=Painting%20Studio).
 */
const ExploreStudios = ({
  studios,
  initialCategory,
}: {
  studios: Studio[];
  initialCategory?: string;
}) => {
  const requested = initialCategory?.trim();
  const [active, setActive] = useState(requested && requested.length > 0 ? requested : "All");

  const categories = useMemo(() => {
    const set = new Set<string>(homeCategories.map((c) => c.name));
    studios.forEach((s) => {
      const cat = s.category?.trim();
      if (cat) set.add(cat);
    });
    if (requested) set.add(requested);
    return ["All", ...Array.from(set).sort()];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studios]);

  const filtered =
    active === "All"
      ? studios
      : studios.filter(
          (s) => s.category?.trim().toLowerCase() === active.toLowerCase()
        );

  return (
    <div>
      {/* Categories */}
      <div className="mt-7 flex flex-wrap gap-2 sm:mt-9 sm:gap-2.5">
        {categories.map((cat) => {
          const isActive = active === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                isActive
                  ? "border-emerald-500 bg-emerald-500 text-[#04100e] shadow-[0_0_18px_rgba(16,185,129,0.3)]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-600"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600 sm:p-8">
          No studios found in &ldquo;{active}&rdquo;. Try another category.
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {filtered.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreStudios;
