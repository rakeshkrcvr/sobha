"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectGalleryProps {
  images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  // Handle keypresses for lightbox navigation
  useEffect(() => {
    if (activeImageIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImageIdx(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIdx]);

  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    setActiveImageIdx((prev) => 
      prev === null ? null : prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveImageIdx((prev) => 
      prev === null ? null : prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-8 pt-10 border-t border-black/5 mt-10">
      <div className="inline-flex items-center gap-2 mb-2">
        <span className="w-6 h-px bg-primary" />
        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.25em]">Visual Tour</span>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-sm font-bold text-black uppercase tracking-[0.2em] mb-2">Property Gallery</h3>
          <p className="text-[11px] text-gray-400 font-semibold tracking-wide uppercase">Explore the spaces & architectural details</p>
        </div>
        <span className="text-[10px] font-bold bg-gray-50 border border-gray-100 text-gray-500 px-3 py-1.5 rounded-full uppercase tracking-wider">
          {images.length} {images.length === 1 ? "Image" : "Images"}
        </span>
      </div>

      {/* Grid of gallery images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((imgUrl, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            onClick={() => setActiveImageIdx(idx)}
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <img
              src={imgUrl}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              alt={`Gallery image ${idx + 1}`}
            />
            {/* Hover glassmorphism overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                <Maximize2 size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
          >
            {/* Close trigger overlay */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setActiveImageIdx(null)} />

            {/* Header controls */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 text-white">
              <span className="text-xs font-bold tracking-widest uppercase text-white/60">
                Image {activeImageIdx + 1} of {images.length}
              </span>
              <button
                onClick={() => setActiveImageIdx(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Image View */}
            <div className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center px-12">
              {/* Prev Button */}
              {images.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all z-10 cursor-pointer"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <motion.img
                key={activeImageIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={images[activeImageIdx]}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl relative z-0 border border-white/5"
                alt={`Active gallery view ${activeImageIdx + 1}`}
              />

              {/* Next Button */}
              {images.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all z-10 cursor-pointer"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Keyboard helper text */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[9px] tracking-wider uppercase font-semibold">
              Use arrow keys to navigate • ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
