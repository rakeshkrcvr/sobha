"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Building2, 
  MapPin, 
  Settings, 
  FileText,
  LogOut,
  ChevronRight,
  Files
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: Building2 },
  { href: "/admin/locations", label: "Cities", icon: MapPin },
  { href: "/admin/brand", label: "Brand Content", icon: FileText },
  { href: "/admin/pages", label: "Pages", icon: Files },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ logo }: { logo?: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black text-white flex flex-col fixed inset-y-0 left-0">
      <div className="p-8 border-b border-white/10">
        <Link href="/admin" className="flex flex-col">
          {logo ? (
            <img src={logo} alt="AR Creative Homes" className="h-10 w-auto object-contain mb-2" />
          ) : (
            <>
              <span className="text-xl font-bold tracking-tighter text-white uppercase">AR CREATIVE</span>
              <span className="text-primary text-[10px] tracking-[0.4em] font-light uppercase">ADMIN PANEL</span>
            </>
          )}
        </Link>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={20} className={cn("transition-transform group-hover:scale-110", isActive ? "text-white" : "text-white/40")} />
              <span className="text-sm font-medium">{link.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/40 hover:bg-red-500/10 hover:text-red-500 transition-all group">
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
