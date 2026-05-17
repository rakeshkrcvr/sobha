"use client";

import { useState, useEffect } from "react";
import { Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FloorPlan {
  title: string;
  size: string;
  image: string;
}

interface ProjectFloorPlansProps {
  plans: FloorPlan[];
}

export default function ProjectFloorPlans({ plans }: ProjectFloorPlansProps) {
  const [activePlanIdx, setActivePlanIdx] = useState<number | null>(null);

  // ESC to close modal
  useEffect(() => {
    if (activePlanIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePlanIdx(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePlanIdx]);

  if (!plans || plans.length === 0) return null;

  return (
    <div className="space-y-8 pt-12 border-t border-black/5 mt-12">
      {/* Title & Badge */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.25em]">Floor Layouts</span>
          </div>
          <h3 className="text-base font-bold text-black uppercase tracking-[0.15em]">Floor Plans</h3>
          <div className="w-10 h-0.5 bg-primary/70 rounded-full" />
        </div>
        <span className="text-[10px] font-bold bg-black text-white px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
          {plans.length} {plans.length === 1 ? "Plan" : "Plans"}
        </span>
      </div>

      {/* Plans Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Floor plan image container */}
            <div 
              onClick={() => setActivePlanIdx(idx)}
              className="aspect-square rounded-2xl bg-gray-50 border border-gray-50/80 overflow-hidden flex items-center justify-center p-4 cursor-zoom-in"
            >
              <img
                src={plan.image}
                className="max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                alt={plan.title}
              />
            </div>

            {/* Info details */}
            <div className="mt-5 space-y-1">
              <h4 className="text-base font-bold text-black group-hover:text-primary transition-colors">{plan.title}</h4>
              <p className="text-xs text-gray-400 font-semibold">
                Size: <span className="text-black/80 font-bold ml-1">{plan.size}</span>
              </p>
            </div>

            {/* View Larger Button */}
            <button
              onClick={() => setActivePlanIdx(idx)}
              className="mt-6 flex items-center justify-center gap-2 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 text-[11px] font-bold py-3.5 px-6 rounded-full w-full uppercase tracking-wider cursor-pointer group-hover:border-primary"
            >
              <Eye size={14} className="stroke-[2.5]" />
              View Larger
            </button>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePlanIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex items-center justify-center p-6 select-none"
          >
            {/* Close trigger overlay */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setActivePlanIdx(null)} />

            {/* Header controls */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 text-white">
              <div>
                <h4 className="text-sm font-bold tracking-wider text-white uppercase">{plans[activePlanIdx].title}</h4>
                <p className="text-[10px] text-white/50 font-semibold uppercase tracking-widest mt-0.5">Size: {plans[activePlanIdx].size}</p>
              </div>
              <button
                onClick={() => setActivePlanIdx(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Plan Image View */}
            <div className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center p-4">
              <motion.img
                key={activePlanIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={plans[activePlanIdx].image}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl bg-white p-6 shadow-2xl relative z-0"
                alt={`Active floor plan ${plans[activePlanIdx].title}`}
              />
            </div>

            {/* Keyboard helper text */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[9px] tracking-wider uppercase font-semibold">
              ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
