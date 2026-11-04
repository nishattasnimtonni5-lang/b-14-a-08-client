"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authClient } from "../lib/auth-client";
import { Popover, PopoverContent ,PopoverTrigger} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
const links = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/explore" },
  { label: "My bookings", href: "/myBookings" },
  { label: "Add studio", href: "/addStudio" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
const {data:session}=authClient.useSession();
const user=session?.user;
const avatarImage = user?.image?.trim();
const avatarInitial =
  user?.name?.trim().charAt(0).toUpperCase() ||
  user?.email?.trim().charAt(0).toUpperCase() ||
  "U";
const handleSignOut = async () => {
  setOpen(false);
  await authClient.signOut();
};
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-lg font-black text-[#04100e]">
            S
          </span>
          <span className="text-lg font-bold tracking-tight lg:text-xl">
            <span className="text-emerald-400">Studio</span>
            <span className="text-slate-900">Space</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex lg:gap-8">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
            <Link
              key={l.label}
              href={l.href}
              className={`relative py-2 text-sm font-medium transition-colors ${
                active
                  ? "text-emerald-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {l.label}
              {active && (
                <span className="absolute -bottom-[2px] left-0 h-[2px] w-full rounded-full bg-emerald-400" />
              )}
            </Link>
            );
          })}
          {user && (
            <button
              onClick={handleSignOut}
              className="whitespace-nowrap py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Sign out
            </button>
          )}
        </nav>

        {/* Actions */}
        
          {user ?(
            <Popover>
              <PopoverTrigger>
        <Avatar >
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
<PopoverContent className="w-64">
  <div className="space-y-2">
<p className="font-semibold">{user.name}</p>
<p className="text-sm text-muted-foreground">{user.email}</p>
<Button variant="destructive"
className="w-full"
onClick={handleSignOut}>
  Sign out
  </Button>
  </div>
  </PopoverContent>
  </Popover>
):(

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/signin"
            className="whitespace-nowrap text-sm font-medium text-slate-700 transition-colors hover:text-emerald-600"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-6 py-2.5 text-sm font-semibold text-[#04100e] shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-transform hover:scale-105 md:block"
          >
            Sign Up
          </Link>
          </div>
       
)}
        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 sm:px-6 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  active
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {l.label}
              </Link>
              );
            })}
          </nav>
          {user ? (
            <div className="mt-4 flex items-center gap-3 border-t border-slate-200 pt-4">
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
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {user.name}
                </p>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="shrink-0 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-500 hover:text-emerald-700"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-3">
              <Link
                href="/signin"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-slate-300 py-2.5 text-center text-sm font-medium text-slate-700"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 py-2.5 text-center text-sm font-semibold text-[#04100e]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
