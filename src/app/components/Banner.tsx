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

const Banner = () => {
  const [i, setI] = useState(0);
  const slide = slides[i];
  const prev = () => setI((v) => (v - 1 + slides.length) % slides.length);
  const next = () => setI((v) => (v + 1) % slides.length);

  return (
    <section className="relative min-h-[640px] w-full overflow-hidden bg-[#04100e]">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.img}
        alt={slide.tag}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#04100e] via-[#04100e]/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04100e] via-transparent to-[#04100e]/60" />
      <div className="absolute -left-40 -top-24 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-[640px] max-w-[1280px] flex-col justify-center px-6 py-20 lg:px-8">
        <p className="mb-5 text-xs font-bold tracking-[0.28em] text-emerald-400">
          {slide.eyebrow}
        </p>
        <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {slide.line1}
          <br />
          <span className="text-emerald-400">{slide.line2}</span>
        </h1>
        <h2 className="mt-6 text-2xl font-bold text-white">{slide.sub}</h2>
        <p className="mt-3 max-w-lg text-base text-slate-300">{slide.text}</p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-8 py-3.5 text-sm font-semibold text-[#04100e] shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-transform hover:scale-105"
          >
            Explore Studios
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/host"
            className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-emerald-400 hover:text-emerald-400"
          >
            Host Your Space
          </Link>
        </div>

        {/* Slider controls */}
        <div className="mt-14 flex items-center gap-5">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-emerald-400 hover:text-emerald-400"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-emerald-400 hover:text-emerald-400"
          >
            <ChevronRight size={18} />
          </button>
          <span className="text-sm font-medium text-slate-300">
            <span className="text-white">{String(i + 1).padStart(2, "0")}</span> / 0{slides.length}
          </span>
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-12 bg-emerald-400" : "w-8 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating tag card */}
      <div className="absolute bottom-14 right-6 hidden items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 pr-6 backdrop-blur-md lg:flex">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-[#04100e]">
          <Camera size={20} />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-white">{slide.tag}</span>
          <span className="block text-xs text-slate-400">{slide.tagSub}</span>
        </span>
        <ArrowRight size={16} className="text-emerald-400" />
      </div>
    </section>
  );
};

export default Banner;
