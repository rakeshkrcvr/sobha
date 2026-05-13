"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero({ slides }: { slides: any[] }) {
  const [current, setCurrent] = useState(0);

  if (!slides || slides.length === 0) return null;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          {slides[current].type === "video" ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover brightness-[0.7]"
            >
              <source src={slides[current].src} type="video/mp4" />
            </video>
          ) : (
            <img 
              src={slides[current].src} 
              className="h-full w-full object-cover brightness-[0.7]" 
              alt="AR Creative Homes Project"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls (Minimalist) */}
      <div className="absolute bottom-12 right-12 z-20 flex items-center gap-6">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i}
              className={`h-1 transition-all duration-500 rounded-full ${i === current ? "w-8 bg-primary" : "w-4 bg-white/20"}`}
            />
          ))}
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Floating "AR" Icon (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute bottom-10 left-10 z-20"
      >
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform group">
          <span className="text-black text-2xl font-bold italic group-hover:text-primary transition-colors">AR</span>
        </div>
      </motion.div>

      {/* Content (Minimalist overlays) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-6">
        <motion.div
          key={`text-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center max-w-4xl"
        >
          <h2 className="text-white text-4xl md:text-7xl font-light font-serif tracking-tight leading-tight">
            {slides[current].title} <br/> <span className="italic">{slides[current].subtitle}</span>
          </h2>
        </motion.div>
      </div>

      <div className="absolute bottom-24 left-12 z-20 hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-[1px] bg-primary" />
          <span className="text-white/50 text-[10px] tracking-[0.5em] uppercase">Architecture of Perfection</span>
        </motion.div>
      </div>
    </section>
  );
}
