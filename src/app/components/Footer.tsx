"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";

const navLinks = ["Home", "Explore Studios", "How It Works", "About Us", "Contact"];
const hrefs = ["/", "/explore", "/how-it-works", "/about", "/about"];

const socials: { label: string; href?: string; icon: ReactNode }[] = [
  {
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M23 12s0-3.2-.41-4.74a2.5 2.5 0 0 0-1.76-1.77C19.28 5.08 12 5.08 12 5.08s-7.28 0-8.83.41A2.5 2.5 0 0 0 1.41 7.26C1 8.8 1 12 1 12s0 3.2.41 4.74a2.5 2.5 0 0 0 1.76 1.77c1.55.41 8.83.41 8.83.41s7.28 0 8.83-.41a2.5 2.5 0 0 0 1.76-1.77C23 15.2 23 12 23 12ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.44c0-1.3-.02-2.97-1.81-2.97-1.81 0-2.09 1.42-2.09 2.88V21h-4V9Z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "#", // placeholder — swap with the official StudioSpace X profile URL
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
      </svg>
    ),
  },
];

const categories = [
  "Photography Studio",
  "Podcast Studio",
  "Music Studio",
  "Video Production Studio",
  "Meeting Room",
  "Creative Workspace",
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-sm font-black text-[#04100e]">
            S
          </span>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-emerald-400">Studio</span>
            <span className="text-slate-900">Space</span>
          </span>
          <span className="ml-3 hidden text-xs text-slate-500 sm:inline">
            Creative spaces. Endless possibilities.
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {navLinks.map((label, idx) => (
            <Link
              key={label}
              href={hrefs[idx]}
              className="text-xs text-slate-600 transition-colors hover:text-emerald-600"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {socials.map(({ icon, label, href }) => (
            <a
              key={label}
              href={href ?? "#"}
              aria-label={label}
              className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-emerald-500 hover:text-emerald-600"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Newsletter + Popular Studio Categories */}
      <div className="border-t border-slate-200">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 md:gap-10 lg:px-8">
          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Subscribe to Our Newsletter
            </h3>
            <p className="mt-1.5 max-w-md text-xs leading-relaxed text-slate-500">
              Get the latest updates, studio news and exclusive offers delivered
              straight to your inbox.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-4 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscribed(false);
                }}
                placeholder="Enter your email address"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-6 py-2.5 text-sm font-semibold text-[#04100e] transition-transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>

            {subscribed && (
              <p className="mt-2 text-xs font-medium text-emerald-600">
                Thanks for subscribing!
              </p>
            )}
          </div>

          {/* Popular Studio Categories */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Popular Studio Categories
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href="/explore"
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-emerald-500 hover:text-emerald-600"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4">
        <p className="mx-auto max-w-[1280px] px-4 text-center text-[11px] text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} StudioSpace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
