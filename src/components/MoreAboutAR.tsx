"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const defaultItems = [
  {
    title: "MEDIA CENTRE",
    description: "Your source for the latest news and updates from AR Creative Homes. Access our brand assets and news coverage.",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    title: "SMART INVESTMENTS",
    description: "Explore highly profitable investment opportunities across Greater Noida West and NCR, curated by our expert team.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    title: "AR BLOG",
    description: "Get latest insights from the real estate sector and in-depth views on property investment avenues from our experts.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    link: "#"
  }
];

export default function MoreAboutAR({
  title = "MORE ABOUT AR CREATIVE",
  subtitle = "Premium Real Estate Brand in Greater Noida West & NCR",
  items = defaultItems
}: {
  title?: string;
  subtitle?: string;
  items?: any[];
}) {
  return (
    <section className="py-24 bg-[#f8f8f8]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light tracking-[0.3em] text-black mb-4 uppercase"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-black/40 text-sm tracking-wide"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="p-10">
                <h3 className="text-black/70 text-sm font-bold tracking-[0.2em] mb-6 uppercase">
                  {item.title}
                </h3>
                <p className="text-black/50 text-[15px] leading-relaxed mb-8 h-20 overflow-hidden">
                  {item.description}
                </p>
                <Link 
                  href={item.link}
                  className="inline-flex items-center gap-2 text-black/40 hover:text-primary transition-colors group/link"
                >
                  <ChevronRight size={18} className="text-primary group-hover/link:translate-x-1 transition-transform" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase">FIND OUT MORE</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
