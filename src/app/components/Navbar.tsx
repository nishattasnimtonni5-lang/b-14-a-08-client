"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sun,
  Moon,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarDays,
  LogOut,
} from "lucide-react";
import { useTheme } from "../provider";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { authClient } from "../lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/explore" },
  { label: "My bookings", href: "/myBookings" },
  { label: "Add studio", href: "/addStudio" },
  { label: "My listing", href: "/myListing" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

const accountLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Add New Studio",
    href: "/addStudio",
    icon: PlusCircle,
  },
  {
    label: "My Studio Listings",
    href: "/myListing",
    icon: Building2,
  },
  {
    label: "My Bookings",
    href: "/myBookings",
    icon: CalendarDays,
  },
];

const Navbar = () => {
  const pathname = usePathname();

  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const avatarImage = user?.image?.trim();

  const avatarInitial =
    user?.name?.trim().charAt(0).toUpperCase() ||
    user?.email?.trim().charAt(0).toUpperCase() ||
    "U";

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-1 sm:gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-lg font-black text-[#04100e] sm:h-9 sm:w-9">
            S
          </span>

          <span className="text-base font-bold tracking-tight sm:text-lg lg:text-xl">
            <span className="text-emerald-400">Studio</span>
            <span className="text-slate-900 dark:text-white">Space</span>
          </span>
        </Link>

        <nav className="flex min-w-0 items-center gap-3 md:gap-4 xl:gap-6">
          {links.map((l) => {
            const active = pathname === l.href;

            return (
              <Link
                key={l.label}
                href={l.href}
                className={`relative whitespace-nowrap py-2 text-[13px] font-medium transition-colors xl:text-sm ${
                  active
                    ? "text-emerald-600"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {l.label}

                {active && (
                  <span className="absolute -bottom-[2px] left-0 h-[2px] w-full rounded-full bg-emerald-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {user ? (
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Popover>
              <PopoverTrigger className="rounded-full outline-none ring-offset-2 transition hover:ring-2 hover:ring-emerald-400">
                <Avatar>
                  <AvatarFallback>{avatarInitial}</AvatarFallback>

                  {avatarImage && (
                    <AvatarImage
                      className="data-[loading]:invisible data-[error]:invisible"
                      keepMounted
                      referrerPolicy="no-referrer"
                      src={avatarImage}
                    />
                  )}
                </Avatar>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="w-64 p-2"
              >
                <div className="border-b border-slate-200 px-3 py-3 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="break-all text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>

                <div className="space-y-1 py-2">
                  {accountLinks.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                          active
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                            : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Icon size={17} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t border-slate-200 pt-2 dark:border-slate-700">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <LogOut size={17} />
                    Sign Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              href="/signin"
              className="whitespace-nowrap text-xs font-medium text-slate-700 transition-colors hover:text-emerald-600 dark:text-slate-200 sm:text-sm"
            >
              Sign in
            </Link>

            <Link
              href="/signup"
              className="whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-2.5 py-2 text-xs font-semibold text-[#04100e] shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-transform hover:scale-105 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Sign Up
            </Link>
          </div>
        )}

        {user && (
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;