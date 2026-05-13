"use client";

import { motion } from "framer-motion";

export default function BrandSection({ data }: { data: any }) {
  const content = data?.content || {};

  return (
    <section className="py-24 bg-[#050505] text-white overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-light leading-tight mb-8">
              {data?.title?.split(' ')[0] || "Crafting"} <br />
              <span className="font-bold text-primary italic">{data?.title?.split(' ').slice(1).join(' ') || "Lifestyles"}</span>
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed max-w-xl">
              <p>
                {content.paragraph1 || "AR Creative Homes is a modern real estate brand committed to creating premium lifestyles and smart investment opportunities."}
              </p>
              <p>
                {content.paragraph2 || "Our philosophy is simple — exceptional spaces create exceptional lives. We focus on projects that offer elegant architecture, premium amenities, and long-term value appreciation."}
              </p>
              <button className="border-b-2 border-primary pb-2 text-primary font-bold tracking-widest text-sm hover:text-white hover:border-white transition-all">
                OUR PHILOSOPHY
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-full border border-white/5 absolute -inset-20 animate-spin-slow" />
            <div className="aspect-square rounded-full border border-primary/20 absolute -inset-10 animate-reverse-spin" />
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" 
              alt="Luxury Living" 
              className="rounded-3xl shadow-2xl relative z-10"
            />
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        INNOVATION
      </div>
    </section>
  );
}
