import Link from "next/link";
import { MessageSquare, Send, Camera, Play, Briefcase, Phone } from "lucide-react";

import { getSettings, getLocations } from "@/lib/actions";

const footerLinks = {
  "Useful Links": [
    "Careers", "Media Centre", "Sustainability", "Investor Relations", 
    "Our Projects", "Contact Us"
  ],
  Policies: [
    "Terms of Use", "Privacy Policy", "Disclaimer", "Blog", "RERA Disclaimer", "Sitemap"
  ]
};

export default async function Footer() {
  const settings = await getSettings();
  const locations = await getLocations();
  const cities = locations.map((loc: any) => loc.name);

  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <div className="flex flex-col mb-8">
              <span className="text-2xl font-bold tracking-tighter text-white uppercase">{settings.company_name?.split(' ')[0] || "AR"} {settings.company_name?.split(' ').slice(1).join(' ') || "CREATIVE"}</span>
              <span className="text-primary text-xs tracking-[0.3em] font-light uppercase">HOMES</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Redefining urban living with a perfect blend of luxury, innovation, and trust. Delivering high-quality residential and commercial properties.
            </p>
            <div className="space-y-3 text-white/40 text-sm mb-8">
              <p>{settings.address || "Office No 204, 2nd floor, Nebula business Centre, Knowledge park 5, Greater Noida (west) 201306"}</p>
              <p>Email: {settings.email || "arcreativehomesindia@gmail.com"}</p>
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <Link href="#" className="hover:text-primary transition-colors"><MessageSquare size={20} /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Send size={20} /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Camera size={20} /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Play size={20} /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Briefcase size={20} /></Link>
            </div>
          </div>

          {/* Cities Column (Dynamic) */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase mb-8 text-primary">Cities</h4>
            <ul className="space-y-4">
              {cities.map((city: string) => (
                <li key={city}>
                  <Link 
                    href={`/residential?location=${encodeURIComponent(city)}`} 
                    className="text-white/40 hover:text-white transition-colors text-sm"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold tracking-widest uppercase mb-8 text-primary">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-white/40 hover:text-white transition-colors text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-white/40 text-sm">
            <Phone size={16} className="text-primary" />
            <span>{settings.phone || "+91 8384077107"}</span>
          </div>
          <p className="text-white/20 text-[10px] tracking-widest uppercase">
            {settings.copyright || "AR Creative Homes © Copyright 2026 All rights reserved"}
          </p>
          <div className="text-white/20 text-[10px] tracking-widest uppercase text-center md:text-right">
            Crafting Spaces, Enriching Lives
          </div>
        </div>
      </div>
    </footer>
  );
}
