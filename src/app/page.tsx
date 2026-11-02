import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import FeaturedStudios from "./components/FeaturedStudios";
import BrowseByCategories from "./components/BrowseByCategories";
import HowBookingWorks from "./components/HowBookingWorks";
import HostGuarantee from "./components/HostGuarantee";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Banner />
        <FeaturedStudios />
        <BrowseByCategories />
        <HowBookingWorks />
        <HostGuarantee />
        {/* Add the rest of the sections here */}
      </main>
      <Footer />
    </div>
  );
}
