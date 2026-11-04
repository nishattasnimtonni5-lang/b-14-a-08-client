"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const slides = [
  {
    eyebrow: "CREATIVE STUDIO BOOKING MARKETPLACE",
    line1: "Your Vision.",
    line2: "Our Studios.",
    sub: "Endless Possibilities.",
    text: "Find the perfect space to bring your next big idea to life.",
    tag: "Photography Studio",
    tagSub: "Capture Your Best Moments",
    img: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1920&q=80",
  },
  {
    eyebrow: "SOUND & RECORDING SPACES",
    line1: "Your Sound.",
    line2: "Our Stages.",
    sub: "Pro-Grade Gear.",
    text: "Book acoustically treated rooms with equipment ready to roll.",
    tag: "Music Studio",
    tagSub: "Record in Crystal Clarity",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80",
  },
  {
    eyebrow: "WORKSHOPS & CREATIVE HUBS",
    line1: "Your Craft.",
    line2: "Our Space.",
    sub: "Create Together.",
    text: "Spacious, inspiring environments for workshops and team sessions.",
    tag: "Art Workshop",
    tagSub: "Where Ideas Take Shape",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1920&q=80",
  },
];

const slideWidths = [800, 1280, 1920];

const buildSrcSet = (src: string) =>
  slideWidths.map((w) => `${src.replace(/w=\d+/, `w=${w}`)} ${w}w`).join(", ");

const Banner = () => {
  const [i, setI] = useState(0);
  const slide = slides[i];
  const prev = () => setI((v) => (v - 1 + slides.length) % slides.length);
  const next = () => setI((v) => (v + 1) % slides.length);

  return (
    <section className="relative min-h-[520px] w-full overflow-hidden bg-slate-50 sm:min-h-[560px] lg:min-h-[640px]">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.img}
        srcSet={buildSrcSet(slide.img)}
        sizes="100vw"
        alt={slide.tag}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/30" />
      <div className="absolute -left-40 -top-24 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-[520px] max-w-[1280px] flex-col justify-center px-4 py-14 sm:min-h-[560px] sm:px-6 sm:py-16 lg:min-h-[640px] lg:px-8 lg:py-20">
        <p className="mb-5 text-[10px] font-bold tracking-[0.28em] text-emerald-700 sm:text-xs">
          {slide.eyebrow}
        </p>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl">
          {slide.line1}
          <br />
          <span className="text-emerald-600">{slide.line2}</span>
        </h1>
        <h2 className="mt-6 text-xl font-bold text-slate-900 sm:text-2xl">
          {slide.sub}
        </h2>
        <p className="mt-3 max-w-lg text-sm text-slate-700 sm:text-base">
          {slide.text}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-6 py-3.5 text-sm font-semibold text-[#04100e] shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-transform hover:scale-105 sm:px-8"
          >
            Explore Studios
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white/60 px-6 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur transition-colors hover:border-emerald-500 hover:text-emerald-700 sm:px-8"
          >
            Host Your Space
          </Link>
        </div>

        {/* Slider controls */}
        <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-14 sm:gap-5">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-400 text-slate-800 transition-colors hover:border-emerald-500 hover:text-emerald-700"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-400 text-slate-800 transition-colors hover:border-emerald-500 hover:text-emerald-700"
          >
            <ChevronRight size={18} />
          </button>
          <span className="text-sm font-medium text-slate-700">
            <span className="text-slate-900">{String(i + 1).padStart(2, "0")}</span> / 0{slides.length}
          </span>
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-12 bg-emerald-500" : "w-8 bg-slate-400/60 hover:bg-slate-500/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating tag card */}
      <div className="absolute bottom-14 right-6 hidden items-center gap-4 rounded-2xl border border-slate-200 bg-white/90 p-4 pr-6 shadow-lg backdrop-blur-md lg:flex">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-[#04100e]">
          <Camera size={20} />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-slate-900">{slide.tag}</span>
          <span className="block text-xs text-slate-600">{slide.tagSub}</span>
        </span>
        <ArrowRight size={16} className="text-emerald-400" />
      </div>
    </section>
  );
};

export default Banner;
