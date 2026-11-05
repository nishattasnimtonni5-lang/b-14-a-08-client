import PageSkeleton from "@/components/page-skeleton";

/**
 * Root route-transition loader: any navigation to a segment without its own
 * loading.tsx shows the branded StudioSpace skeleton.
 */
export default function Loading() {
  return <PageSkeleton />;
}
