"use client";

import { useState } from "react";
import { Send, Phone, User, Mail, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectInquiryForm({ projectTitle, projectLocation }: { projectTitle: string, projectLocation: string }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    message: `Hi, I am interested in ${projectTitle} located in ${projectLocation}. Please send pricing and brochures.` 
  });
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm">
      <AnimatePresence mode="wait">
        {!formSubmitted ? (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-1">Schedule a Private Tour</h4>
              <p className="text-xs text-gray-400">Request pricing, floor layouts, and brochures instantly.</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={16} />
                </span>
                <input
                  required
                  type="text"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Phone size={16} />
                </span>
                <input
                  required
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={16} />
                </span>
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>

              <div className="space-y-2">
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none text-gray-600 leading-relaxed font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black hover:bg-primary text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75 shadow-lg shadow-black/5"
            >
              {submitting ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <Send size={14} />
                  <span>Request Information</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center animate-bounce shadow-sm">
              <CheckCircle2 size={36} />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg text-emerald-800">Inquiry Submitted!</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed font-semibold">
                Thank you, <strong>{formData.name}</strong>. A dedicated real estate expert from our team will contact you at <strong>{formData.phone}</strong> shortly.
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
