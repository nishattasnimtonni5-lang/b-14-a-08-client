"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "Explore Studios", href: "/explore" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050c0b]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-lg font-black text-[#04100e]">
            S
          </span>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">Studio</span>
            <span className="text-white">Space</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`relative py-2 text-sm font-medium transition-colors ${
                l.active
                  ? "text-emerald-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {l.label}
              {l.active && (
                <span className="absolute -bottom-[2px] left-0 h-[2px] w-full rounded-full bg-emerald-400" />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-200 transition-colors hover:text-emerald-400"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-6 py-2.5 text-sm font-semibold text-[#04100e] shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-transform hover:scale-105"
          >
            Register
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-200 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 bg-[#050c0b] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  l.active
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <Link
              href="/login"
              className="flex-1 rounded-full border border-white/15 py-2.5 text-center text-sm font-medium text-slate-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="flex-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 py-2.5 text-center text-sm font-semibold text-[#04100e]"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
