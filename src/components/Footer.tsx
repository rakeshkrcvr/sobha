import Link from "next/link";
import { MessageSquare, Send, Camera, Play, Briefcase, Phone } from "lucide-react";

const footerLinks = {
  Cities: [
    "Bengaluru", "Chennai", "Coimbatore", "GIFT City", "Greater Noida", 
    "Gurugram", "Hyderabad", "Kochi", "Kozhikode", "Mumbai", "Pune", 
    "Thiruvananthapuram", "Thrissur"
  ],
  "Useful Links": [
    "Careers", "Media Centre", "Sustainability", "Investor Relations", 
    "SOBHA Prosper", "SOBHA Privilege", "Contact Us"
  ],
  Policies: [
    "Terms of Use", "Privacy Policy", "Disclaimer", "Blog", "RERA Disclaimer", "Sitemap"
  ]
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <img 
              src="https://www.sobha.com/wp-content/themes/sobha/images/SOBHA_White_new.svg" 
              className="h-16 mb-8" 
              alt="SOBHA" 
            />
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              A legacy of trust, reliability, and excellence deeply etched in the landscape of India. Master-crafting self-sustaining urban living spaces.
            </p>
            <div className="flex items-center gap-4 text-white/60">
              <Link href="#" className="hover:text-primary transition-colors"><MessageSquare size={20} /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Send size={20} /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Camera size={20} /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Play size={20} /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Briefcase size={20} /></Link>
            </div>
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
            <span>080 46464500</span>
          </div>
          <p className="text-white/20 text-[10px] tracking-widest uppercase">
            SOBHA Limited © Copyright 2026 All rights reserved
          </p>
          <div className="text-white/20 text-[10px] tracking-widest uppercase text-center md:text-right">
            CIN: L45201KA1995PLC018475
          </div>
        </div>
      </div>
    </footer>
  );
}
