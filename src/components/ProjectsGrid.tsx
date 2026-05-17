"use client";

import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsGrid({ projects }: { projects: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-32">
      {(projects || []).map((project: any) => (
        <motion.div
          key={project.id}
          whileHover={{ y: -6 }}
          className="group bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-black/10 hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
        >
          <Link href={`/projects/${project.slug}`} className="block cursor-pointer">
            <div className="aspect-[16/11] overflow-hidden relative bg-gray-50">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-black/80 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {project.category}
                </span>
                {project.is_featured && (
                  <span className="bg-primary text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Star size={8} fill="white" /> Featured
                  </span>
                )}
              </div>
              
              {/* Premium Hover Card Tint */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/95 backdrop-blur-md text-black text-[10px] tracking-[0.2em] font-bold uppercase px-5 py-3.5 rounded-full shadow-lg scale-95 group-hover:scale-100 transition-all duration-300">
                  VIEW DETAILS
                </span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-black/80 text-sm font-bold tracking-widest uppercase mb-2 group-hover:text-primary transition-colors text-center">
                {project.title}
              </h4>
              <div className="flex items-center justify-center gap-1.5 text-black/40 text-xs">
                <MapPin size={12} className="text-primary/70" />
                <span className="uppercase tracking-widest text-[10px]">{project.location_name}</span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
