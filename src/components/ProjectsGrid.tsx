"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Building2, Star, Send, Phone, User, Mail, CheckCircle2 } from "lucide-react";

export default function ProjectsGrid({ projects }: { projects: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleOpenModal = (project: any) => {
    setSelectedProject(project);
    setFormSubmitted(false);
    setFormData({ name: "", email: "", phone: "", message: `Hi, I am interested in ${project.title} located in ${project.location_name}. Please send details.` });
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate real database lead capture API submission
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 1000);
  };

  return (
    <>
      {/* Interactive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-32">
        {(projects || []).map((project: any) => (
          <motion.div
            key={project.id}
            onClick={() => handleOpenModal(project)}
            whileHover={{ y: -6 }}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-black/10 hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
          >
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
                  EXPLORE PROJECT
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
          </motion.div>
        ))}
      </div>

      {/* Modern Pop-up Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Dark Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Window Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white w-full max-w-5xl rounded-[40px] overflow-hidden relative z-10 shadow-2xl flex flex-col lg:flex-row max-h-[90vh] lg:max-h-[80vh]"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md hover:rotate-90 transition-all duration-300"
              >
                <X size={20} />
              </button>

              {/* Left Side: Image Panel */}
              <div className="w-full lg:w-1/2 relative min-h-[250px] lg:min-h-full bg-gray-50 flex-shrink-0">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Visual Overlay Tints */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-black/40" />
                
                {/* Meta Badges on Left Image Panel */}
                <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                  <div className="flex gap-2 mb-3">
                    <span className="bg-primary text-white text-[9px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                      {selectedProject.category}
                    </span>
                    {selectedProject.is_featured && (
                      <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                        <Star size={10} fill="#C5A880" className="text-primary" /> Featured Property
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-serif uppercase tracking-wider leading-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-white/80 text-sm tracking-wider uppercase font-semibold">
                    <MapPin size={16} className="text-primary" />
                    <span>{selectedProject.location_name}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Details & Inquiry Form */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-between space-y-8 bg-white">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em] mb-4">PROJECT OVERVIEW</h3>
                  <h2 className="text-2xl font-serif text-black uppercase mb-6 tracking-wide leading-none">{selectedProject.title}</h2>
                  
                  {/* Project Description (supports paragraphs) */}
                  <div className="text-gray-500 text-sm leading-relaxed space-y-4 text-justify font-medium">
                    {selectedProject.description ? (
                      selectedProject.description.split("\n").map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))
                    ) : (
                      <p>Experience the ultimate embodiment of luxury and elegance at this landmark property. Curated meticulously with modern architecture, world-class amenities, and exquisite detailing, it offers a grand residential ecosystem designed to fit premium lifestyles.</p>
                    )}
                  </div>
                </div>

                {/* Inquiry Form Block */}
                <div className="border-t border-gray-100 pt-8">
                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <motion.form
                        key="inquiry-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleFormSubmit}
                        className="space-y-4"
                      >
                        <h4 className="text-xs font-bold text-black uppercase tracking-wider mb-2">Request Digital Brochure & Pricing</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                              <User size={14} />
                            </span>
                            <input
                              required
                              type="text"
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                            />
                          </div>
                          
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                              <Phone size={14} />
                            </span>
                            <input
                              required
                              type="tel"
                              placeholder="Phone Number"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                            />
                          </div>
                        </div>

                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Mail size={14} />
                          </span>
                          <input
                            required
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-black text-white hover:bg-primary py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75"
                        >
                          {submitting ? (
                            <span>Submitting Request...</span>
                          ) : (
                            <>
                              <Send size={12} />
                              <span>Enquire Now</span>
                            </>
                          )}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="inquiry-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center text-emerald-800 space-y-2 flex flex-col items-center"
                      >
                        <CheckCircle2 size={32} className="text-emerald-500 animate-bounce" />
                        <h4 className="font-bold text-sm">Brochure Requested Successfully!</h4>
                        <p className="text-xs text-emerald-700 max-w-sm leading-relaxed">
                          Thank you for contacting us, <strong>{formData.name}</strong>. Our dedicated sales specialist will reach out to you within 24 hours.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
