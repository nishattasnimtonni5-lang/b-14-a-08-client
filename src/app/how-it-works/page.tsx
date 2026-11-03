import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import HowBookingWorks from "../components/HowBookingWorks";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "How It Works | StudioSpace",
  description:
    "Learn how to explore, choose, and book your perfect creative studio in just a few simple steps.",
};

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="flex-1 pt-16">
        <HowBookingWorks />
      </main>
      <Footer />
    </div>
  );
}
