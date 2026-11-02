import Link from "next/link";
import type { ReactNode } from "react";

const navLinks = ["Home", "Explore Studios", "How It Works", "About Us", "Contact"];
const hrefs = ["/", "/explore", "/how-it-works", "/about", "/contact"];

const socials: { label: string; icon: ReactNode }[] = [
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
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-6 py-8 lg:flex-row lg:px-8">
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
          {socials.map(({ icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-emerald-500 hover:text-emerald-600"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 py-4">
        <p className="mx-auto max-w-[1280px] px-6 text-center text-[11px] text-slate-500 lg:px-8">
          © {new Date().getFullYear()} StudioSpace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
