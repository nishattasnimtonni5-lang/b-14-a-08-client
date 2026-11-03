import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About Us | StudioSpace",
  description:
    "StudioSpace connects photographers, content creators, and artists with the perfect creative studio for their next project.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="flex-1 pt-16">
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
