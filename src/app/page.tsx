import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CityGrid from "@/components/CityGrid";
import BrandSection from "@/components/BrandSection";
import MoreAboutAR from "@/components/MoreAboutAR";
import Footer from "@/components/Footer";

import { getHeroSlides, getProjects, getLocations, getBrandContent, getSettings } from "@/lib/actions";

export default async function Home() {
  const slides = await getHeroSlides();
  const locations = await getLocations();
  const brandData = await getBrandContent('philosophy');
  const settings = await getSettings();

  return (
    <main className="min-h-screen bg-black">
      <Navbar logo={settings.logo_url} />
      <Hero slides={slides} />
      <CityGrid locations={locations} />
      <BrandSection data={brandData} />
      <MoreAboutAR />
      <Footer />
    </main>
  );
}
