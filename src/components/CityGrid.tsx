"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const cityList = [
  "Greater Noida West", "Noida", "Gurugram", "Delhi NCR", "Ghaziabad", "Faridabad"
];

const projectList = [
  "AR Elite Residences", "Creative Urban Spaces", "Nebula Business Suites", "The Grand Arch", 
  "NCR Investment Plots", "Luxury Studio Homes", "Smart City Apartments"
];

export default function Locations({ 
  title = "LOCATIONS", 
  locations 
}: { 
  title?: string;
  locations: any[];
}) {
  const [activeCity, setActiveCity] = useState("Select City");
  const [activeProject, setActiveProject] = useState("Select Project");
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  const cityRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  const cityList = locations?.map((l: any) => l.name) || [];

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

            <Link href={activeCity !== "Select City" ? `/residential?location=${encodeURIComponent(activeCity)}` : "/residential"}>
              <button className="bg-[#999999] hover:bg-black w-12 h-12 flex flex-shrink-0 items-center justify-center transition-colors">
                <Search size={20} className="text-white" />
              </button>
            </Link>
          </div>
        </div>

        {/* Cities Grid/Slider */}
        <div className="relative group">
          <div className="grid md:grid-cols-3 gap-8">
            {locations?.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <Link href={`/residential?location=${encodeURIComponent(city.name)}`} className="w-full text-center group/card">
                  <div className="relative w-full aspect-[16/18] overflow-hidden mb-6">
                    <img 
                      src={city.image} 
                      alt={city.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                    />
                  </div>
                  <h4 className="text-black/60 group-hover/card:text-primary transition-colors text-base tracking-wide uppercase">{city.name}</h4>
                </Link>
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
