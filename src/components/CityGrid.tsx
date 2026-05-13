"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const cityList = [
  "Bengaluru", "Chennai", "Coimbatore", "Delhi NCR", "Gift City Gujarat", 
  "Gurugram", "Hyderabad", "Kochi", "Kozhikode", "Mumbai", "Mysuru", "Pune"
];

const projectList = [
  "SOBHA Altair", "SOBHA Woods", "SOBHA Inizio", "SOBHA Strada", 
  "SOBHA Bela Encosta", "SOBHA Valley View", "SOBHA Crystal Meadows"
];

const cities = [
  {
    name: "Hyderabad",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
  },
  {
    name: "Thiruvananthapuram",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
  },
  {
    name: "Bengaluru",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
  }
];

export default function Locations({ title = "LOCATIONS" }: { title?: string }) {
  const [activeCity, setActiveCity] = useState("Select City");
  const [activeProject, setActiveProject] = useState("Select Project");
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  const cityRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
      if (projectRef.current && !projectRef.current.contains(event.target as Node)) {
        setIsProjectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light tracking-[0.3em] text-black mb-6 uppercase"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-black/60 text-sm leading-relaxed"
          >
            We handpick locations that offer seamless connectivity, unmatched return on investments, 
            in a neighborhood that is truly one-of-a-kind.
          </motion.p>
        </div>

        {/* Search Properties */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h3 className="text-black/40 text-[11px] font-bold tracking-[0.3em] mb-6 uppercase">
            SEARCH PROPERTIES
          </h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch h-12">
            
            {/* City Dropdown */}
            <div className="relative flex-1" ref={cityRef}>
              <div 
                onClick={() => {
                  setIsCityOpen(!isCityOpen);
                  setIsProjectOpen(false);
                }}
                className="w-full h-full border border-black/10 flex items-center justify-between px-6 cursor-pointer hover:border-black/30 transition-all bg-white"
              >
                <span className={cn("text-sm transition-colors", activeCity === "Select City" ? "text-black/30" : "text-black")}>
                  {activeCity}
                </span>
                <ChevronDown size={16} className={cn("text-black/30 transition-transform duration-300", isCityOpen && "rotate-180")} />
              </div>
              <AnimatePresence>
                {isCityOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-black/10 shadow-xl z-[60] max-h-64 overflow-y-auto custom-scrollbar"
                  >
                    {cityList.map((city) => (
                      <div
                        key={city}
                        onClick={() => {
                          setActiveCity(city);
                          setIsCityOpen(false);
                        }}
                        className="px-6 py-3 text-sm text-black/60 hover:text-black hover:bg-black/5 transition-colors cursor-pointer text-left"
                      >
                        {city}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Project Dropdown */}
            <div className="relative flex-1" ref={projectRef}>
              <div 
                onClick={() => {
                  setIsProjectOpen(!isProjectOpen);
                  setIsCityOpen(false);
                }}
                className="w-full h-full border border-black/10 flex items-center justify-between px-6 cursor-pointer hover:border-black/30 transition-all bg-white"
              >
                <span className={cn("text-sm transition-colors", activeProject === "Select Project" ? "text-black/30" : "text-black")}>
                  {activeProject}
                </span>
                <ChevronDown size={16} className={cn("text-black/30 transition-transform duration-300", isProjectOpen && "rotate-180")} />
              </div>
              <AnimatePresence>
                {isProjectOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-black/10 shadow-xl z-[60] max-h-64 overflow-y-auto custom-scrollbar"
                  >
                    {projectList.map((project) => (
                      <div
                        key={project}
                        onClick={() => {
                          setActiveProject(project);
                          setIsProjectOpen(false);
                        }}
                        className="px-6 py-3 text-sm text-black/60 hover:text-black hover:bg-black/5 transition-colors cursor-pointer text-left"
                      >
                        {project}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="bg-[#999999] hover:bg-black w-12 h-12 flex flex-shrink-0 items-center justify-center transition-colors">
              <Search size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Cities Grid/Slider */}
        <div className="relative group">
          <div className="grid md:grid-cols-3 gap-8">
            {cities.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-full aspect-[16/18] overflow-hidden mb-6">
                  <img 
                    src={city.image} 
                    alt={city.name} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {index === 0 && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <ChevronLeft size={20} className="text-white" />
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <ChevronRight size={20} className="text-white" />
                    </div>
                  )}
                </div>
                <h4 className="text-black/60 text-base tracking-wide">{city.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Button */}
        <div className="text-center mt-16">
          <Link href="/residential">
            <button className="px-12 py-3 border border-black/10 text-black/60 text-xs font-bold tracking-[0.2em] hover:bg-black hover:text-white transition-all uppercase">
              ALL LOCATIONS
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
