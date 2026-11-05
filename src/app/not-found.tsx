import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        {/* Creative studio illustration */}
        <svg
          viewBox="0 0 320 200"
          role="img"
          aria-label="Empty creative studio illustration"
          className="h-44 w-full max-w-sm sm:h-52"
        >
          <defs>
            <linearGradient id="ns-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="100%" stopColor="#f0fdfa" />
            </linearGradient>
            <linearGradient id="ns-brand" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>

          {/* Backdrop wall */}
          <rect x="10" y="18" width="300" height="152" rx="16" fill="url(#ns-bg)" stroke="#cbd5e1" strokeWidth="2" />

          {/* Framed photos on the wall */}
          <rect x="38" y="42" width="44" height="34" rx="5" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="52" cy="55" r="5" fill="#34d399" />
          <path d="M42 71l12-12 8 8 7-6 11 10" fill="#14b8a6" opacity="0.7" />
          <rect x="96" y="42" width="44" height="34" rx="5" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="110" cy="55" r="5" fill="#fbbf24" />
          <path d="M100 71l12-12 8 8 7-6 11 10" fill="#34d399" opacity="0.7" />

          {/* Studio light on a stand */}
          <g stroke="#334155" strokeWidth="3" strokeLinecap="round">
            <line x1="244" y1="70" x2="244" y2="150" />
            <line x1="228" y1="150" x2="260" y2="150" />
          </g>
          <circle cx="244" cy="58" r="16" fill="url(#ns-brand)" />
          <path d="M244 74l-10 18h20z" fill="#fde68a" opacity="0.8" />

          {/* Camera on tripod */}
          <g transform="translate(150 96)">
            <rect x="0" y="0" width="54" height="34" rx="7" fill="#0f172a" />
            <rect x="12" y="-9" width="18" height="10" rx="3" fill="#0f172a" />
            <circle cx="27" cy="17" r="11" fill="url(#ns-brand)" />
            <circle cx="27" cy="17" r="5" fill="#04100e" />
            <circle cx="45" cy="8" r="3" fill="#34d399" />
          </g>
          <g stroke="#334155" strokeWidth="3" strokeLinecap="round">
            <line x1="177" y1="132" x2="177" y2="152" />
            <line x1="163" y1="170" x2="177" y2="152" />
            <line x1="191" y1="170" x2="177" y2="152" />
          </g>

          {/* Floor */}
          <line x1="24" y1="170" x2="296" y2="170" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        </svg>

        <p className="mt-6 text-6xl font-black tracking-tight text-emerald-500">404</p>
        <h1 className="mt-3 text-xl font-bold sm:text-2xl">This studio doesn&apos;t exist</h1>
        <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
          The page you&apos;re looking for may have been moved, unlisted, or the
          booking session expired. Let&apos;s get you back to browsing creative
          spaces.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-7 py-3 text-sm font-semibold text-[#04100e] shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-transform hover:scale-105"
        >
          Return to Home
        </Link>
      </main>
    </div>
  );
}
