import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CityGrid from "@/components/CityGrid";
import BrandSection from "@/components/BrandSection";
import MoreAboutSobha from "@/components/MoreAboutSobha";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <CityGrid />
      <BrandSection />
      <MoreAboutSobha />
      <Footer />
    </main>
  );
}
