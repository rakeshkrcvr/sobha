"use client";

import { motion } from "framer-motion";

export default function BrandSection() {
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
              Passion <br />
              <span className="font-bold text-primary italic">at Work</span>
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed max-w-xl">
              <p>
                SOBHA’s penchant for perfection is reflected in every project, every decision and every innovation. This underlies our quest to deliver world-class quality and impeccable craftsmanship.
              </p>
              <p>
                Our founder extraordinaire, Mr. PNC Menon, instilled in us this passion that transcends generations and boundaries. His commitment to never compromise on quality revolutionised the way the world perceives luxury in real estate.
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
              src="https://www.sobha.com/wp-content/uploads/2021/10/SOBHA-WEB-BANNER1-min-1.webp" 
              alt="Quality" 
              className="rounded-3xl shadow-2xl relative z-10"
            />
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        PERFECTION
      </div>
    </section>
  );
}
