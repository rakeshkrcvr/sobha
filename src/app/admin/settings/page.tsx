"use client";

import { useState, useEffect } from "react";
import { getSettings, updateSettings } from "@/lib/actions";
import { Save, Phone, Mail, MapPin, Building, ShieldCheck, Loader2, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getSettings();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await updateSettings(settings);
      setMessage("Settings updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessage("Error updating settings.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">General Settings</h1>
          <p className="text-gray-500">Manage your company details and contact information.</p>
        </div>
        {message && (
          <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold animate-fade-in">
            {message}
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
          
          {/* Branding */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Building size={14} /> Company Name
              </label>
              <input 
                type="text"
                value={settings.company_name || ""}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="AR Creative Homes"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={14} /> Logo Image (Upload)
              </label>
              <div className="flex items-center gap-4">
                <div className="relative group flex-1">
                  <input 
                    type="text"
                    value={settings.logo_url || ""}
                    onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    placeholder="Logo URL or Uploaded Image..."
                  />
                </div>
                <label className="bg-black text-white px-4 py-3 rounded-xl cursor-pointer hover:bg-primary transition-all flex items-center gap-2 whitespace-nowrap text-xs font-bold">
                  <ImageIcon size={14} /> Upload
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSettings({ ...settings, logo_url: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
              {settings.logo_url && (
                <div className="mt-2 p-2 bg-gray-50 rounded-xl inline-block border border-gray-100">
                  <img src={settings.logo_url} alt="Logo Preview" className="h-8 w-auto object-contain" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 pt-6 border-t border-gray-50">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} /> Copyright Text
            </label>
            <input 
              type="text"
              value={settings.copyright || ""}
              onChange={(e) => setSettings({ ...settings, copyright: e.target.value })}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="AR Creative Homes © 2026"
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-50">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Phone size={14} /> Phone Number
              </label>
              <input 
                type="text"
                value={settings.phone || ""}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="+91 8384077107"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Mail size={14} /> Email Address
              </label>
              <input 
                type="email"
                value={settings.email || ""}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="info@arcreative.com"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2 pt-6 border-t border-gray-50">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <MapPin size={14} /> Office Address
            </label>
            <textarea 
              rows={3}
              value={settings.address || ""}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              placeholder="Full office address..."
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={saving}
            className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary transition-all flex items-center gap-3 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {saving ? "Saving Changes..." : "Save All Settings"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
