"use client";

import { useState, useEffect } from "react";
import { getHeroSlides, updateHeroSlide } from "@/lib/actions";
import { Save, Play, Image as ImageIcon, Loader2, Type } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroAdmin() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getHeroSlides();
      setSlides(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleUpdate = async (id: number, index: number) => {
    setSaving(true);
    await updateHeroSlide(id, slides[index]);
    setSaving(false);
    alert("Slide updated successfully!");
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Hero Slides</h1>
        <p className="text-gray-500">Edit the video and images shown on the homepage hero section.</p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {slides.map((slide, index) => (
          <div key={slide.id} className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-1/3 aspect-video rounded-3xl overflow-hidden bg-gray-100 relative">
              {slide.type === 'video' ? (
                <video src={slide.src} muted className="w-full h-full object-cover" />
              ) : (
                <img src={slide.src} className="w-full h-full object-cover" />
              )}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-2">
                {slide.type === 'video' ? <Play size={12} /> : <ImageIcon size={12} />}
                Slide {index + 1}
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Type size={14} /> Main Title
                  </label>
                  <input 
                    type="text"
                    value={slide.title}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[index].title = e.target.value;
                      setSlides(newSlides);
                    }}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Type size={14} /> Subtitle (Italic)
                  </label>
                  <input 
                    type="text"
                    value={slide.subtitle}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[index].subtitle = e.target.value;
                      setSlides(newSlides);
                    }}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={14} /> Media Source ({slide.type})
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input 
                      type="text"
                      value={slide.src}
                      onChange={(e) => {
                        const newSlides = [...slides];
                        newSlides[index].src = e.target.value;
                        setSlides(newSlides);
                      }}
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm"
                      placeholder="Media URL or Upload..."
                    />
                  </div>
                  {slide.type === 'image' && (
                    <label className="bg-black text-white px-6 py-4 rounded-2xl cursor-pointer hover:bg-primary transition-all flex items-center gap-2 text-xs font-bold whitespace-nowrap">
                      <ImageIcon size={16} /> Upload
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const newSlides = [...slides];
                              newSlides[index].src = reader.result as string;
                              setSlides(newSlides);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => handleUpdate(slide.id, index)}
                  disabled={saving}
                  className="bg-black text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={18} /> Update Slide {index + 1}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
