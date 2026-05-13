"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Building, Home } from "lucide-react";

export default function SearchProperties() {
  return (
    <div className="relative z-20 -mt-16 container mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-8 md:p-12 rounded-3xl shadow-2xl flex flex-wrap lg:flex-nowrap items-center gap-8"
      >
        <div className="flex-1 min-w-[200px]">
          <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 block">Location</label>
          <div className="flex items-center gap-3 text-white">
            <MapPin size={18} className="text-primary" />
            <select className="bg-transparent border-none outline-none text-lg w-full cursor-pointer appearance-none">
              <option className="bg-black">All Cities</option>
              <option className="bg-black">Bengaluru</option>
              <option className="bg-black">Mumbai</option>
              <option className="bg-black">Delhi NCR</option>
              <option className="bg-black">Hyderabad</option>
            </select>
          </div>
        </div>

        <div className="w-px h-12 bg-white/10 hidden lg:block" />

        <div className="flex-1 min-w-[200px]">
          <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 block">Property Type</label>
          <div className="flex items-center gap-3 text-white">
            <Building size={18} className="text-primary" />
            <select className="bg-transparent border-none outline-none text-lg w-full cursor-pointer appearance-none">
              <option className="bg-black">Residential</option>
              <option className="bg-black">Commercial</option>
              <option className="bg-black">Plots</option>
            </select>
          </div>
        </div>

        <div className="w-px h-12 bg-white/10 hidden lg:block" />

        <div className="flex-1 min-w-[200px]">
          <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 block">Budget</label>
          <div className="flex items-center gap-3 text-white">
            <Home size={18} className="text-primary" />
            <select className="bg-transparent border-none outline-none text-lg w-full cursor-pointer appearance-none">
              <option className="bg-black">Any Budget</option>
              <option className="bg-black">Below 1 Cr</option>
              <option className="bg-black">1 Cr - 3 Cr</option>
              <option className="bg-black">Above 3 Cr</option>
            </select>
          </div>
        </div>

        <button className="w-full lg:w-auto bg-white text-black px-12 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-300">
          <Search size={20} />
          SEARCH
        </button>
      </motion.div>
    </div>
  );
}
