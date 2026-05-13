"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Globe, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const menuData = {
  "WHO WE ARE": {
    categories: [
      {
        title: "Philosophy",
        links: ["Passion At Work", "The SOBHA Way", "Vision & Mission"]
      },
      {
        title: "Leadership",
        links: ["About Our Founder", "Chairman's Message", "Board Of Directors", "Leadership Team"]
      },
      {
        title: "Showcase",
        links: ["The SOBHA Journey", "SOBHA Museum", "Awards & Honours"]
      }
    ]
  },
  "WHAT WE DO": {
    categories: [
      {
        title: "Residential",
        links: ["Bengaluru", "Chennai", "Coimbatore", "Gift City Gandhinagar", "Greater Noida", "Gurugram", "Hyderabad", "Kochi", "Kozhikode", "Mumbai", "Mysuru", "Pune", "Thiruvananthapuram", "Thrissur"]
      },
      {
        title: "Commercial",
        links: ["SOBHA City Mall", "1 SOBHA"]
      },
      {
        title: "Contracting",
        links: ["Business Services", "Portfolio", "Client Testimonial"]
      },
      {
        title: "Manufacturing",
        links: ["SOBHA Interiors", "Glazing And Metal Works", "Concrete Products", "SOBHA Restoplus"]
      }
    ]
  }
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        isScrolled 
          ? "bg-black/80 backdrop-blur-md py-4" 
          : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative">
        
        {/* Left: Menu Trigger */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center gap-4 group z-50"
        >
          <div className="flex flex-col gap-1.5 items-start">
            <div className="w-8 h-[1.5px] bg-white transition-all duration-300" />
            <div className="w-5 h-[1.5px] bg-white transition-all duration-300 group-hover:w-8" />
          </div>
          <span className="text-white text-[10px] tracking-[0.4em] font-medium uppercase opacity-80 group-hover:opacity-100 transition-opacity">
            MENU
          </span>
        </button>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 z-50">
          <h1 className="text-white text-xl md:text-2xl tracking-[0.2em] font-light font-serif">
            SOBHA
          </h1>
        </Link>

        {/* Right: Search & Language */}
        <div className="flex items-center gap-6 md:gap-8 text-white z-50">
          <button className="hover:text-primary transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
            <Globe size={18} strokeWidth={1.5} />
            <span className="text-[10px] font-bold tracking-widest hidden sm:block">IND</span>
          </div>
        </div>
      </div>

      {/* Side Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsMenuOpen(false);
                setActiveTab(null);
              }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-[320px] bg-white z-[110] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTab(null);
                }}
                className="absolute top-6 right-6 text-black hover:rotate-90 transition-transform"
              >
                <X size={28} strokeWidth={1} />
              </button>

              {/* Top Section (White) */}
              <div className="pt-24 px-10 flex-1">
                <div className="flex flex-col gap-8">
                  {Object.keys(menuData).map((tab) => (
                    <button
                      key={tab}
                      onMouseEnter={() => setActiveTab(tab)}
                      className={cn(
                        "flex items-center justify-between text-left group",
                        activeTab === tab ? "text-primary" : "text-black/70"
                      )}
                    >
                      <span className="text-[15px] font-medium tracking-[0.1em]">{tab}</span>
                      <ArrowRight size={20} strokeWidth={1} className={cn("transition-transform", activeTab === tab ? "translate-x-2" : "opacity-0")} />
                    </button>
                  ))}
                  <Link href="#" className="text-[15px] font-medium tracking-[0.1em] text-black/70 hover:text-primary transition-colors">
                    CONTACT US
                  </Link>
                  <Link href="#" className="text-[15px] font-medium tracking-[0.1em] text-black/70 hover:text-primary transition-colors">
                    BLOG
                  </Link>
                </div>
              </div>

              {/* Bottom Section (Light Grey) */}
              <div className="bg-[#f2f2f2] px-10 py-12 flex flex-col gap-6">
                {["CAREERS", "MEDIA CENTRE", "SUSTAINABILITY", "INVESTOR RELATIONS", "SOBHA PRIVILEGE"].map((item) => (
                  <Link 
                    key={item} 
                    href="#" 
                    className="text-[13px] font-medium tracking-[0.05em] text-black/60 hover:text-black transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Floating "S" Icon in Menu */}
              <div className="absolute bottom-8 left-10">
                <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-black/5">
                  <span className="text-primary text-2xl font-serif italic">S</span>
                </div>
              </div>
            </motion.div>

            {/* Second Panel (Black) - Submenu */}
            <AnimatePresence>
              {activeTab && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 left-[320px] bottom-0 w-[300px] bg-black z-[109] overflow-y-auto custom-scrollbar pt-24 px-10 shadow-2xl"
                >
                  <div className="flex flex-col gap-10 pb-12">
                    {menuData[activeTab as keyof typeof menuData].categories.map((cat) => (
                      <div key={cat.title}>
                        <h4 className="text-primary text-[14px] font-bold tracking-[0.1em] mb-4">
                          {cat.title}
                        </h4>
                        <div className="flex flex-col gap-3">
                          {cat.links.map((link) => (
                            <Link 
                              key={link} 
                              href="#" 
                              className="text-white/60 text-[13px] hover:text-white transition-colors"
                            >
                              {link}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
