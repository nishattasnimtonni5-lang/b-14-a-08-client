
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { StudioCard } from "../components/FeaturedStudios";
import { Studio } from "@/data/studios";
export const dynamic='force-dynamic'
const explorePage = async() => {
  let studios: Studio[] = [];
  let error = false;

  try {
    const res=await fetch(`https://b-14-a-08-server-x2zf.vercel.app/api/studios`)
    studios=await res.json()
    error = !res.ok;
  } catch {
    error = true;
  }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
          <Navbar />
          <main className="flex-1">
            <section className="bg-slate-50 py-20">
              <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
                {/* Heading */}
                <span className="mb-3 block h-[3px] w-10 rounded-full bg-emerald-400" />
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Explore Studios
                </h1>
                <p className="mt-2 max-w-xl text-sm text-slate-600">
                  Browse all creative spaces and find the perfect studio for your
                  next big idea.
                </p>

                {/* Cards grid or error message */}
                {error ? (
                  <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
                    We couldn&apos;t load the studios. Please make sure your API
                    server is running and try again.
                  </div>
                ) : (
                  <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
