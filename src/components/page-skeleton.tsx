import { Skeleton } from "@/components/ui/skeleton";

/**
 * Branded skeleton loader used for route transitions and async data fetches.
 * Keeps the StudioSpace header/footer rhythm so the page never "flashes" white.
 */
export default function PageSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans dark:bg-slate-950">
      {/* Fake navbar */}
      <div className="h-[68px] border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-lg bg-emerald-500/20" />
            <Skeleton className="h-5 w-28 bg-emerald-500/20" />
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <Skeleton className="h-3.5 w-12" />
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-3.5 w-16" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-20 rounded-full bg-emerald-500/20" />
          </div>
        </div>
      </div>

      {/* Fake content */}
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-28 bg-emerald-500/20" />
        <Skeleton className="mt-4 h-9 w-full max-w-lg" />
        <Skeleton className="mt-3 h-4 w-full max-w-xl" />

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            >
              <Skeleton className="aspect-[16/10] w-full rounded-none bg-slate-200/80 dark:bg-slate-800" />
              <div className="space-y-2.5 p-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3.5 w-1/2" />
                <Skeleton className="h-3.5 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Fake footer */}
      <div className="border-t border-slate-200 py-8 dark:border-slate-800">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 px-4 sm:px-6 lg:flex-row lg:px-8">
          <Skeleton className="h-5 w-32 bg-emerald-500/20" />
          <div className="flex gap-5 lg:ml-auto">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
