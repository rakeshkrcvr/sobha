"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityGrid from "@/components/CityGrid";
import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  { label: "30 YEARS OF", value: "PASSION AT WORK" },
  { label: "OVER 265", value: "PRESTIGIOUS AWARDS" },
  { label: "NATIONAL FOOTPRINT", value: "28 CITIES IN 14 STATES" },
  { label: "STRONG WORKFORCE", value: "14,850+" },
];

const cities = [
  "BENGALURU", "CHENNAI", "COIMBATORE", "GIFT CITY GUJARAT", 
  "GURUGRAM", "GREATER NOIDA", "HYDERABAD", "KOCHI", 
  "KOZHIKODE", "MUMBAI", "MYSURU", "PUNE", 
  "THIRUVANANTHAPURAM", "THRISSUR"
];

const focusProjects = [
  { title: "SOBHA ALTAIR", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80" },
  { title: "SOBHA WOODS – WHISPERING HILL", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" },
  { title: "SOBHA INIZIO", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" },
  { title: "SOBHA STRADA", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80" },
];

export default function ResidentialPage() {
  return (
    <main className="bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-black">
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover brightness-50" 
          alt="Residential Hero"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl md:text-4xl font-light font-serif tracking-[0.2em]">SOBHA</h1>
        </div>
        
        {/* Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.value} className="text-center border-r last:border-none border-white/20 px-4">
                  <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">{stat.label}</p>
                  <p className="text-white text-xs md:text-sm font-bold tracking-widest">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <h2 className="text-black text-sm font-bold tracking-[0.2em] mb-8 border-b border-black/10 pb-4">RESIDENTIAL</h2>
            <div className="flex flex-col gap-4">
              {cities.map((city) => (
                <Link 
                  key={city} 
                  href="#" 
                  className="text-black/60 text-[13px] hover:text-primary transition-colors tracking-wide"
                >
                  {city}
                </Link>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <div className="max-w-4xl">
              <p className="text-black/60 text-[15px] leading-relaxed mb-20 text-justify">
                Since inception, SOBHA Limited has been synonymous with excellence, elevating the ideals of quality, 
                customer-centricity, ethics, and transparency in Indian real estate. This relentless pursuit of perfection 
                has earned SOBHA its stature as one of India's most trusted real estate brands. For three consecutive years, 
                it has been celebrated as the Top Brand in Indian real estate.
              </p>

              <div className="flex items-center gap-8 mb-20">
                <div className="flex-1 h-px bg-black/10" />
                <div className="text-center">
                  <p className="text-black/40 text-xs tracking-[0.3em] uppercase mb-2">THERE'S NO PLACE</p>
                  <p className="text-black text-2xl font-serif">LIKE A SOBHA HOME</p>
                </div>
                <div className="flex-1 h-px bg-black/10" />
              </div>

              <h3 className="text-black text-[13px] font-bold tracking-[0.3em] mb-12 uppercase">IN-FOCUS PROJECTS</h3>
              
              <div className="grid md:grid-cols-2 gap-12 mb-32">
                {focusProjects.map((project) => (
                  <div key={project.title} className="group cursor-pointer">
                    <div className="aspect-[16/10] overflow-hidden mb-6">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h4 className="text-center text-black/60 text-[13px] tracking-widest uppercase">{project.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Cities Grid */}
      <CityGrid title="CITIES" />

      <Footer />
    </main>
  );
}
