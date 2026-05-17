"use client";

import { useState, useEffect } from "react";
import { getHeroSlides, updateHeroSlide, addHeroSlide, deleteHeroSlide } from "@/lib/actions";
import { Save, Play, Image as ImageIcon, Loader2, Type, Plus, Trash2 } from "lucide-react";
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

  const handleAddSlide = async () => {
    setSaving(true);
    await addHeroSlide();
    const data = await getHeroSlides();
    setSlides(data);
    setSaving(false);
  };

  const handleDeleteSlide = async (id: number) => {
    if (confirm("Are you sure you want to delete this slide?")) {
      setSaving(true);
      await deleteHeroSlide(id);
      const data = await getHeroSlides();
      setSlides(data);
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hero Slides</h1>
          <p className="text-gray-500">Edit the video and images shown on the homepage hero section.</p>
        </div>
        <button 
          onClick={handleAddSlide}
          disabled={saving}
          className="bg-black text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-primary transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Plus size={16} /> Add New Slide
        </button>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 md:col-span-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon size={14} /> Slide Type
                  </label>
                  <select 
                    value={slide.type}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[index].type = e.target.value;
                      setSlides(newSlides);
                    }}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon size={14} /> Media Source ({slide.type})
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input 
                        type="text"
                        value={slide.src}
                        onChange={(e) => {
                          const val = e.target.value;
                          const newSlides = [...slides];
                          newSlides[index].src = val;
                          
                          // Auto-detect type
                          const lowerVal = val.toLowerCase();
                          if (lowerVal.includes('.mp4') || lowerVal.includes('vimeo') || lowerVal.includes('youtube') || lowerVal.includes('video')) {
                            newSlides[index].type = 'video';
                          } else if (lowerVal.includes('.jpg') || lowerVal.includes('.png') || lowerVal.includes('.jpeg') || lowerVal.includes('unsplash') || lowerVal.includes('image')) {
                            newSlides[index].type = 'image';
                          }
                          
                          setSlides(newSlides);
                        }}
                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm"
                        placeholder="Media URL or Upload..."
                      />
                    </div>
                    <label className="bg-black text-white px-6 py-4 rounded-2xl cursor-pointer hover:bg-primary transition-all flex items-center gap-2 text-xs font-bold whitespace-nowrap">
                      {slide.type === 'video' ? <Play size={16} /> : <ImageIcon size={16} />} Upload
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*,video/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const isVideo = file.type.startsWith('video/');
                            
                            // Immediately set type to reflect user intent
                            const newSlides = [...slides];
                            newSlides[index].type = isVideo ? 'video' : 'image';
                            newSlides[index].src = 'Uploading...';
                            setSlides(newSlides);

                            const formData = new FormData();
                            formData.append('file', file);

                            try {
                              const res = await fetch('/api/upload', {
                                method: 'POST',
                                body: formData
                              });
                              const data = await res.json();
                              
                              if (data.url) {
                                const finalSlides = [...slides];
                                finalSlides[index].src = data.url;
                                setSlides(finalSlides);
                              } else {
                                alert("Upload failed");
                              }
                            } catch (error) {
                              console.error(error);
                              alert("Upload failed");
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 gap-4">
                <button 
                  onClick={() => handleDeleteSlide(slide.id)}
                  disabled={saving || slides.length <= 1}
                  className="bg-red-50 text-red-500 px-6 py-3 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Trash2 size={18} /> Delete
                </button>
                <button 
                  onClick={() => handleUpdate(slide.id, index)}
                  disabled={saving || slide.src === 'Uploading...'}
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
