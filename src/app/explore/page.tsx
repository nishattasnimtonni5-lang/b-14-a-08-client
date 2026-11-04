import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { StudioCard } from "../components/FeaturedStudios";
import type { Studio } from "@/data/studios";
import { fetchStudios } from "../lib/studios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

const explorePage = async () => {
  let studios: Studio[] = [];
  let errorMessage = "";

  try {
    studios = await fetchStudios();
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Unable to load studios.";
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <main className="flex-1">
        <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            
            <span className="mb-3 block h-[3px] w-10 rounded-full bg-emerald-400" />

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Explore Studios
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Browse all creative spaces and find the perfect studio for your
              next big idea.
            </p>

            {errorMessage ? (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 sm:p-8">
                {errorMessage}
              </div>
            ) : studios.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600 sm:p-8">
                No studios are available right now. Please check back later.
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {studios.map((studio: Studio) => (
                  <StudioCard key={studio.id} studio={studio} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default explorePage;