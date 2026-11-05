"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  studioName: string;
  category: string;
};

const badgeColors: Record<string, string> = {
  "Photo Studio": "bg-emerald-500",
  "Podcast Room": "bg-indigo-500",
  "Music Studio": "bg-orange-500",
  "Sound Stage": "bg-sky-500",
  "Art Workshop": "bg-pink-500",
};

export default function StudioGallery({
  images,
  studioName,
  category,
}: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <img
          src={images[currentImage]}
          alt={studioName}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold text-white ${
            badgeColors[category] ?? "bg-emerald-500"
          }`}
        >
          {category}
        </span>

        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow transition hover:bg-white"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow transition hover:bg-white"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
          {currentImage + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                currentImage === index
                  ? "border-emerald-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`${studioName} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}