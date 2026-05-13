"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Users, 
  Eye, 
  TrendingUp,
  ArrowUpRight
} from "lucide-react";

const stats = [
  { label: "Total Projects", value: "12", icon: Building2, color: "bg-blue-500", trend: "+2 this month" },
  { label: "Active Locations", value: "6", icon: MapPin, color: "bg-purple-500", trend: "Stable" },
  { label: "Site Visitors", value: "2,450", icon: Eye, color: "bg-emerald-500", trend: "+12% from last week" },
  { label: "Lead Inquiries", value: "84", icon: Users, color: "bg-orange-500", trend: "+5 today" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="bg-black rounded-3xl p-10 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
          <p className="text-white/60 max-w-md">
            Manage your property listings, hero sections, and site settings all in one place. Your changes go live instantly.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
              Add New Project <ArrowUpRight size={16} />
            </button>
            <button className="bg-white/10 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors">
              View Website
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-10">
          <Building2 size={300} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-2xl text-white", stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} />
                {stat.trend}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity (Placeholder) */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          Recent Activity
        </h3>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                <Building2 size={20} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">New Project Added</p>
                <p className="text-xs text-gray-500">"AR Elite Residences" was added to the Greater Noida West location.</p>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
