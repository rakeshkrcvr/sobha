"use client";

import { useState, useEffect } from "react";
import { getProjects, addProject, updateProject, deleteProject } from "@/lib/actions";
import { Plus, Edit2, Trash2, Building2, MapPin, Star, X, Loader2, Image as ImageIcon, ExternalLink, Check, Search, Route, Train, GraduationCap, HeartPulse, ShoppingBag, Plane, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AMENITIES, getAmenityIcon } from "@/lib/amenities";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "Residential",
    location_name: "",
    description: "",
    is_featured: false,
    amenities: [] as string[],
    gallery: [] as string[],
    floor_plans: [] as any[],
    map_iframe: "",
    location_advantages: [] as any[]
  });

  const [newPlan, setNewPlan] = useState({ title: "", size: "", image: "" });
  const [editingPlanIdx, setEditingPlanIdx] = useState<number | null>(null);

  const [newAdvantage, setNewAdvantage] = useState({ iconName: "route", title: "", desc: "", time: "" });
  const [editingAdvantageIdx, setEditingAdvantageIdx] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }

  const handleOpenModal = (project: any = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        image: project.image,
        category: project.category,
        location_name: project.location_name,
        description: project.description || "",
        is_featured: project.is_featured,
        map_iframe: project.map_iframe || "",
        amenities: (() => {
          if (Array.isArray(project.amenities)) return project.amenities;
          if (typeof project.amenities === 'string') {
            try {
              const parsed = JSON.parse(project.amenities);
              if (Array.isArray(parsed)) return parsed;
            } catch (e) {
              console.error("Failed to parse amenities:", e);
            }
          }
          return [];
        })(),
        gallery: (() => {
          if (Array.isArray(project.gallery)) return project.gallery;
          if (typeof project.gallery === 'string') {
            try {
              const parsed = JSON.parse(project.gallery);
              if (Array.isArray(parsed)) return parsed;
            } catch (e) {
              console.error("Failed to parse gallery:", e);
            }
          }
          return [];
        })(),
        floor_plans: (() => {
          if (Array.isArray(project.floor_plans)) return project.floor_plans;
          if (typeof project.floor_plans === 'string') {
            try {
              const parsed = JSON.parse(project.floor_plans);
              if (Array.isArray(parsed)) return parsed;
            } catch (e) {
              console.error("Failed to parse floor_plans:", e);
            }
          }
          return [];
        })(),
        location_advantages: (() => {
          if (Array.isArray(project.location_advantages)) return project.location_advantages;
          if (typeof project.location_advantages === 'string') {
            try {
              const parsed = JSON.parse(project.location_advantages);
              if (Array.isArray(parsed)) return parsed;
            } catch (e) {
              console.error("Failed to parse location_advantages:", e);
            }
          }
          return [];
        })()
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        image: "",
        category: "Residential",
        location_name: "",
        description: "",
        is_featured: false,
        amenities: [],
        gallery: [],
        floor_plans: [],
        map_iframe: "",
        location_advantages: []
      });
    }
    setEditingPlanIdx(null);
    setNewPlan({ title: "", size: "", image: "" });
    setEditingAdvantageIdx(null);
    setNewAdvantage({ iconName: "route", title: "", desc: "", time: "" });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let finalFloorPlans = [...(formData.floor_plans || [])];
    if (newPlan.title && newPlan.size) {
      const finalPlan = {
        ...newPlan,
        image: newPlan.image || `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMwZjE3MmEiLz48ZyBzdHJva2U9IiMzMzQxNTUiIHN0cm9rZS13aWR0aD0iMC41Ij48bGluZSB4MT0iMCIgeTE9IjEwIiB4Mj0iMTAwIiB5Mj0iMTAiLz48bGluZSB4MT0iMCIgeTE9IjIwIiB4Mj0iMTAwIiB5Mj0iMjAiLz48bGluZSB4MT0iMCIgeTE9IjMwIiB4Mj0iMTAwIiB5Mj0iMzAiLz48bGluZSB4MT0iMCIgeTE9IjQwIiB4Mj0iMTAwIiB5Mj0iNDAiLz48bGluZSB4MT0iMCIgeTE9IjUwIiB4Mj0iMTAwIiB5Mj0iNTAiLz48bGluZSB4MT0iMCIgeTE9IjYwIiB4Mj0iMTAwIiB5Mj0iNjAiLz48bGluZSB4MT0iMCIgeTE9IjcwIiB4Mj0iMTAwIiB5Mj0iMzAiLz48bGluZSB4MT0iMCIgeTE9IjgwIiB4Mj0iMTAwIiB5Mj0iODAiLz48bGluZSB4MT0iMCIgeTE9IjkwIiB4Mj0iMTAwIiB5Mj0iOTAiLz48bGluZSB4MT0iMTAiIHkxPSIwIiB4Mj0iMTAiIHkyPSIxMDAiLz48bGluZSB4MT0iMjAiIHkxPSIwIiB4Mj0iMjAiIHkyPSIxMDAiLz48bGluZSB4MT0iMzAiIHkxPSIwIiB4Mj0iMzAiIHkyPSIxMDAiLz48bGluZSB4MT0iNDAiIHkxPSIwIiB4Mj0iNDAiIHkyPSIxMDAiLz48bGluZSB4MT0iNTAiIHkxPSIwIiB4Mj0iNTAiIHkyPSIxMDAiLz48bGluZSB4MT0iNjAiIHkxPSIwIiB4Mj0iNjAiIHkyPSIxMDAiLz48bGluZSB4MT0iNzAiIHkxPSIwIiB4Mj0iNzAiIHkyPSIxMDAiLz48bGluZSB4MT0iODAiIHkxPSIwIiB4Mj0iODAiIHkyPSIxMDAiLz48bGluZSB4MT0iOTAiIHkxPSIwIiB4Mj0iOTAiIHkyPSIxMDAiLz48L2c+PGcgc3Ryb2tlPSIjZTJlOGYwIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSI+PHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiLz48bGluZSB4MT0iNTAiIHkxPSIyMCIgeDI9IjUwIiB5Mj0iODAiLz48bGluZSB4MT0iMjAiIHkxPSI1MCIgeDI9IjgwIiB5Mj0iNTAiLz48L2c+PHRleHQgeD0iNTAiIHk9IjU0IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSI3IiBmaWxsPSIjZjhmYWZjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+UExBTjwvdGV4dD48L3N2Zz4=`
      };

      if (editingPlanIdx !== null) {
        finalFloorPlans[editingPlanIdx] = finalPlan;
      } else {
        finalFloorPlans.push(finalPlan);
      }
    }

    let finalAdvantages = [...(formData.location_advantages || [])];
    if (newAdvantage.title && newAdvantage.time) {
      const finalAdv = { ...newAdvantage };
      if (editingAdvantageIdx !== null) {
        finalAdvantages[editingAdvantageIdx] = finalAdv;
      } else {
        finalAdvantages.push(finalAdv);
      }
    }

    const updatedFormData = {
      ...formData,
      floor_plans: finalFloorPlans,
      location_advantages: finalAdvantages
    };

    if (editingProject) {
      await updateProject(editingProject.id, updatedFormData);
    } else {
      await addProject(updatedFormData);
    }
    await load();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setLoading(true);
      await deleteProject(id);
      await load();
    }
  };

  if (loading && projects.length === 0) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-primary" size={40} /></div>;
  }

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.title?.toLowerCase().includes(query) ||
      project.location_name?.toLowerCase().includes(query) ||
      project.category?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Projects Management</h1>
          <p className="text-gray-500">
            {searchQuery ? (
              <>Found {filteredProjects.length} of {projects.length} properties</>
            ) : (
              <>Add, edit or remove your property listings.</>
            )}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input 
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-12 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all font-semibold outline-none shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-black text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-primary transition-all flex items-center justify-center gap-2 text-sm shadow-sm whitespace-nowrap"
          >
            <Plus size={18} /> Add New Project
          </button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-dashed border-gray-200 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
            <Search className="text-gray-400" size={28} />
          </div>
          <h3 className="text-base font-bold text-gray-800">No properties found</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-[280px] text-center">We couldn't find any listings matching "{searchQuery}"</p>
          <button 
            onClick={() => setSearchQuery("")}
            className="mt-4 text-xs font-bold text-primary hover:underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div 
              layout
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group"
            >
              <div className="relative aspect-[16/10]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {project.category}
                  </span>
                  {project.is_featured && (
                    <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                      <Star size={10} fill="white" /> Featured
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a 
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer"
                    title="View live project page"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <button 
                    onClick={() => handleOpenModal(project)}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="w-10 h-10 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-2">{project.title}</h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin size={14} /> {project.location_name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[40px] max-h-[90vh] overflow-y-auto custom-scrollbar relative z-10 shadow-2xl"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {editingProject ? "Edit Project" : "Add New Project"}
                    </h2>
                    {editingProject && editingProject.slug && (
                      <a 
                        href={`/projects/${editingProject.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-primary hover:text-white text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        title="View live project page"
                      >
                        <ExternalLink size={12} />
                        <span>View Live</span>
                      </a>
                    )}
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Title</label>
                      <input 
                        required
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm"
                        placeholder="Project Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Location</label>
                      <input 
                        required
                        type="text"
                        value={formData.location_name}
                        onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm"
                        placeholder="e.g. Greater Noida West"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Project Image</label>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                        <input 
                          required
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm"
                          placeholder="Image URL or Upload..."
                        />
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      </div>
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
                                setFormData({ ...formData, image: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Category</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Retail">Retail</option>
                      </select>
                    </div>
                    <div className="space-y-2 flex flex-col justify-center">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div 
                          onClick={() => setFormData({ ...formData, is_featured: !formData.is_featured })}
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.is_featured ? "bg-primary border-primary" : "border-gray-200"}`}
                        >
                          {formData.is_featured && <Star size={12} fill="white" className="text-white" />}
                        </div>
                        <span className="text-sm font-bold text-gray-600 group-hover:text-black transition-colors">Featured Project</span>
                      </label>
                    </div>
                  </div>

                  {/* Amenities Multi-Select Grid */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        Select Amenities ({formData.amenities.length} selected)
                      </label>
                      <div className="flex gap-3 text-[10px] font-bold uppercase tracking-widest">
                        <button 
                          type="button" 
                          onClick={() => setFormData({ ...formData, amenities: AMENITIES.map(a => a.id) })}
                          className="text-primary hover:opacity-80 transition-opacity cursor-pointer"
                        >
                          Select All
                        </button>
                        <span className="text-gray-200">|</span>
                        <button 
                          type="button" 
                          onClick={() => setFormData({ ...formData, amenities: [] })}
                          className="text-gray-400 hover:text-black transition-colors cursor-pointer"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 max-h-48 overflow-y-auto custom-scrollbar grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {AMENITIES.map((amenity) => {
                        const IconComponent = getAmenityIcon(amenity.iconName);
                        const isChecked = formData.amenities.includes(amenity.id);
                        return (
                          <div 
                            key={amenity.id}
                            onClick={() => {
                              const newAmenities = isChecked
                                ? formData.amenities.filter((id) => id !== amenity.id)
                                : [...formData.amenities, amenity.id];
                              setFormData({ ...formData, amenities: newAmenities });
                            }}
                            className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer border select-none transition-all duration-200 hover:shadow-sm ${
                              isChecked 
                                ? "bg-primary/5 border-primary/20 text-primary" 
                                : "bg-white border-gray-200/60 text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                              isChecked ? "bg-primary border-primary text-white" : "border-gray-300 bg-white"
                            }`}>
                              {isChecked && <Check size={10} strokeWidth={4} className="text-white" />}
                            </div>
                            <IconComponent size={14} className={isChecked ? "text-primary" : "text-gray-400"} />
                            <span className="text-[11px] font-semibold tracking-wide truncate">{amenity.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Description (Optional)</label>
                    <textarea 
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm resize-none"
                      placeholder="Brief details about the project..."
                    />
                  </div>

                  {/* Gallery Images Upload Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        Project Gallery ({formData.gallery.length} Images)
                      </label>
                      {formData.gallery.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, gallery: [] })}
                          className="text-[10px] font-bold text-red-500 hover:opacity-80 transition-opacity uppercase tracking-widest cursor-pointer"
                        >
                          Remove All
                        </button>
                      )}
                    </div>
                    
                    {/* Horizontal preview list */}
                    {formData.gallery.length > 0 && (
                      <div className="flex gap-4 overflow-x-auto pb-3 pt-1 px-1 custom-scrollbar">
                        {formData.gallery.map((imgUrl, imgIdx) => (
                          <div key={imgIdx} className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 group border border-gray-100 shadow-sm">
                            <img src={imgUrl} className="w-full h-full object-cover" alt="Gallery preview" />
                            <button
                              type="button"
                              onClick={() => {
                                const newGallery = formData.gallery.filter((_, idx) => idx !== imgIdx);
                                setFormData({ ...formData, gallery: newGallery });
                              }}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 hover:bg-red-500 text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      {/* Upload new gallery images */}
                      <label className="flex-1 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-200 hover:border-primary/40 rounded-2xl p-6 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group">
                        <ImageIcon className="text-gray-400 group-hover:text-primary transition-colors" size={24} />
                        <span className="text-xs font-bold text-gray-500 group-hover:text-black transition-colors">Click to Upload Gallery Images</span>
                        <span className="text-[10px] text-gray-400 font-semibold">Upload multiple images at once</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              const newImages: string[] = [];
                              let processedCount = 0;
                              Array.from(files).forEach((file) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  newImages.push(reader.result as string);
                                  processedCount++;
                                  if (processedCount === files.length) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      gallery: [...prev.gallery, ...newImages]
                                    }));
                                  }
                                };
                                reader.readAsDataURL(file);
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Floor Plans Section */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                      Floor Plans ({formData.floor_plans.length} Plans)
                    </label>

                    {/* Display existing floor plans list */}
                    {formData.floor_plans.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {formData.floor_plans.map((plan, planIdx) => (
                          <div key={planIdx} className="relative p-3 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                              <img src={plan.image} className="w-full h-full object-cover" alt={plan.title} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-bold text-black truncate">{plan.title}</h4>
                              <p className="text-[10px] text-gray-400 font-semibold truncate">Size: {plan.size}</p>
                            </div>
                            <div className="flex gap-1.5 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingPlanIdx(planIdx);
                                  setNewPlan({
                                    title: plan.title,
                                    size: plan.size,
                                    image: plan.image
                                  });
                                }}
                                className="w-6 h-6 rounded-full bg-blue-50 hover:bg-blue-500 text-blue-500 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                              >
                                <Edit2 size={10} />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const newPlans = formData.floor_plans.filter((_, idx) => idx !== planIdx);
                                  setFormData({ ...formData, floor_plans: newPlans });
                                  if (editingPlanIdx === planIdx) {
                                    setEditingPlanIdx(null);
                                    setNewPlan({ title: "", size: "", image: "" });
                                  }
                                }}
                                className="w-6 h-6 rounded-full bg-red-50 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                              >
                                <X size={10} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Form to add/edit a floor plan */}
                    <div className="p-4 bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl space-y-4">
                      <h4 className="text-[10px] font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                        {editingPlanIdx !== null ? (
                          <>
                            <Edit2 size={12} className="text-primary animate-pulse" />
                            Edit Floor Plan (Plan #{editingPlanIdx + 1})
                          </>
                        ) : (
                          <>
                            <Plus size={12} className="text-primary" />
                            Add New Floor Plan
                          </>
                        )}
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Plan Title</span>
                          <input
                            type="text"
                            placeholder="e.g. 2 BHK"
                            value={newPlan.title}
                            onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Plan Size</span>
                          <input
                            type="text"
                            placeholder="e.g. 1200 sq.ft."
                            value={newPlan.size}
                            onChange={(e) => setNewPlan({ ...newPlan, size: e.target.value })}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Image upload for the plan */}
                        <div className="flex-1">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Plan Image</span>
                          <div className="flex items-center gap-3">
                            {newPlan.image ? (
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-gray-200">
                                <img src={newPlan.image} className="w-full h-full object-cover" alt="New plan preview" />
                                <button
                                  type="button"
                                  onClick={() => setNewPlan({ ...newPlan, image: "" })}
                                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center cursor-pointer shadow-sm"
                                >
                                  <X size={8} />
                                </button>
                              </div>
                            ) : (
                              <label className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-black transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5">
                                <ImageIcon size={14} className="text-gray-400" />
                                Upload Plan Image
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setNewPlan({ ...newPlan, image: reader.result as string });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            )}
                          </div>
                        </div>

                        {/* Save/Add buttons */}
                        <div className="flex gap-2 self-end h-[42px]">
                          {editingPlanIdx !== null && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingPlanIdx(null);
                                setNewPlan({ title: "", size: "", image: "" });
                              }}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold px-4 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              if (!newPlan.title || !newPlan.size) {
                                alert("Please fill both Plan Title and Plan Size!");
                                return;
                              }
                              
                              const finalPlan = {
                                ...newPlan,
                                image: newPlan.image || `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230f172a"/><g stroke="%23334155" stroke-width="0.5"><line x1="0" y1="10" x2="100" y2="10"/><line x1="0" y1="20" x2="100" y2="20"/><line x1="0" y1="30" x2="100" y2="30"/><line x1="0" y1="40" x2="100" y2="40"/><line x1="0" y1="50" x2="100" y2="50"/><line x1="0" y1="60" x2="100" y2="60"/><line x1="0" y1="70" x2="100" y2="70"/><line x1="0" y1="80" x2="100" y2="80"/><line x1="0" y1="90" x2="100" y2="90"/><line x1="10" y1="0" x2="10" y2="100"/><line x1="20" y1="0" x2="20" y2="100"/><line x1="30" y1="0" x2="30" y2="100"/><line x1="40" y1="0" x2="40" y2="100"/><line x1="50" y1="0" x2="50" y2="100"/><line x1="60" y1="0" x2="60" y2="100"/><line x1="70" y1="0" x2="70" y2="100"/><line x1="80" y1="0" x2="80" y2="100"/><line x1="90" y1="0" x2="90" y2="100"/></g><g stroke="%23e2e8f0" stroke-width="1.5" fill="none"><rect x="20" y="20" width="60" height="60"/><line x1="50" y1="20" x2="50" y2="80"/><line x1="20" y1="50" x2="80" y2="50"/></g><text x="50" y="54" font-family="sans-serif" font-size="7" fill="%23f8fafc" text-anchor="middle" font-weight="bold">PLAN</text></svg>`
                              };

                              if (editingPlanIdx !== null) {
                                // Update existing plan
                                const updatedPlans = [...formData.floor_plans];
                                updatedPlans[editingPlanIdx] = finalPlan;
                                setFormData((prev) => ({
                                  ...prev,
                                  floor_plans: updatedPlans
                                }));
                                setEditingPlanIdx(null);
                              } else {
                                // Add new plan
                                setFormData((prev) => ({
                                  ...prev,
                                  floor_plans: [...prev.floor_plans, finalPlan]
                                }));
                              }
                              setNewPlan({ title: "", size: "", image: "" });
                            }}
                            className="bg-black hover:bg-primary text-white text-xs font-bold px-5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer h-full"
                          >
                            {editingPlanIdx !== null ? (
                              <>
                                <Check size={14} /> Save Changes
                              </>
                            ) : (
                              <>
                                <Plus size={14} /> Add Plan
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Custom Map & Location Advantages Section */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        Custom Map Embed Link (Optional)
                      </label>
                      <input 
                        type="text"
                        value={formData.map_iframe || ""}
                        onChange={(e) => setFormData({ ...formData, map_iframe: e.target.value })}
                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm outline-none"
                        placeholder="e.g. https://maps.google.com/maps?q=..."
                      />
                      <p className="text-[10px] text-gray-400 font-semibold">
                        Leave blank to automatically use the standard Google Map based on city & title.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                          Custom Location Advantages ({formData.location_advantages.length} Advantages)
                        </label>
                        {formData.location_advantages.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, location_advantages: [] })}
                            className="text-[10px] font-bold text-red-500 hover:opacity-80 transition-opacity uppercase tracking-widest cursor-pointer"
                          >
                            Remove All
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 font-semibold">
                        If added, these will override default city advantages on the live details page.
                      </p>

                      {/* Display existing custom advantages list */}
                      {formData.location_advantages.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                          {formData.location_advantages.map((adv, advIdx) => {
                            return (
                              <div key={advIdx} className="relative p-3 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex-shrink-0 flex items-center justify-center text-primary">
                                  <MapPin size={16} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-xs font-bold text-black truncate">{adv.title}</h4>
                                  <p className="text-[9px] text-gray-400 font-semibold truncate">{adv.time} | {adv.iconName}</p>
                                </div>
                                <div className="flex gap-1.5 flex-shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingAdvantageIdx(advIdx);
                                      setNewAdvantage({
                                        iconName: adv.iconName || "route",
                                        title: adv.title,
                                        desc: adv.desc || "",
                                        time: adv.time
                                      });
                                    }}
                                    className="w-6 h-6 rounded-full bg-blue-50 hover:bg-blue-500 text-blue-500 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                                  >
                                    <Edit2 size={10} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newAdvs = formData.location_advantages.filter((_, idx) => idx !== advIdx);
                                      setFormData({ ...formData, location_advantages: newAdvs });
                                      if (editingAdvantageIdx === advIdx) {
                                        setEditingAdvantageIdx(null);
                                        setNewAdvantage({ iconName: "route", title: "", desc: "", time: "" });
                                      }
                                    }}
                                    className="w-6 h-6 rounded-full bg-red-50 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                                  >
                                    <X size={10} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Add / Edit Advantage Form */}
                      <div className="p-4 bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl space-y-4">
                        <h4 className="text-[10px] font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                          {editingAdvantageIdx !== null ? (
                            <>
                              <Edit2 size={12} className="text-primary animate-pulse" />
                              Edit Location Advantage (Advantage #{editingAdvantageIdx + 1})
                            </>
                          ) : (
                            <>
                              <Plus size={12} className="text-primary" />
                              Add Custom Location Advantage
                            </>
                          )}
                        </h4>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Advantage Title</span>
                            <input
                              type="text"
                              placeholder="e.g. Noida Expressway"
                              value={newAdvantage.title}
                              onChange={(e) => setNewAdvantage({ ...newAdvantage, title: e.target.value })}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Distance / Time Timings</span>
                            <input
                              type="text"
                              placeholder="e.g. 5 min drive"
                              value={newAdvantage.time}
                              onChange={(e) => setNewAdvantage({ ...newAdvantage, time: e.target.value })}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Timing Icon</span>
                            <select
                              value={newAdvantage.iconName}
                              onChange={(e) => setNewAdvantage({ ...newAdvantage, iconName: e.target.value })}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none"
                            >
                              <option value="route">Route / Road / Connectivity</option>
                              <option value="train">Train / Railway / Metro</option>
                              <option value="education">Education / College / School</option>
                              <option value="healthcare">Healthcare / Hospital / Clinic</option>
                              <option value="shopping">Shopping / Mall / Market</option>
                              <option value="plane">Airport / Plane</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Advantage Description</span>
                            <input
                              type="text"
                              placeholder="e.g. NH-24 is immediately accessible."
                              value={newAdvantage.desc}
                              onChange={(e) => setNewAdvantage({ ...newAdvantage, desc: e.target.value })}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          {editingAdvantageIdx !== null && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAdvantageIdx(null);
                                setNewAdvantage({ iconName: "route", title: "", desc: "", time: "" });
                              }}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              if (!newAdvantage.title || !newAdvantage.time) {
                                alert("Please fill both Advantage Title and Timing value!");
                                return;
                              }

                              if (editingAdvantageIdx !== null) {
                                // Update existing advantage
                                const updatedAdvs = [...formData.location_advantages];
                                updatedAdvs[editingAdvantageIdx] = { ...newAdvantage };
                                setFormData((prev) => ({
                                  ...prev,
                                  location_advantages: updatedAdvs
                                }));
                                setEditingAdvantageIdx(null);
                              } else {
                                // Add new advantage
                                setFormData((prev) => ({
                                  ...prev,
                                  location_advantages: [...prev.location_advantages, { ...newAdvantage }]
                                }));
                              }
                              setNewAdvantage({ iconName: "route", title: "", desc: "", time: "" });
                            }}
                            className="bg-black hover:bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer h-[38px]"
                          >
                            {editingAdvantageIdx !== null ? (
                              <>
                                <Check size={14} /> Save Advantage
                              </>
                            ) : (
                              <>
                                <Plus size={14} /> Add Advantage
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-5 rounded-[20px] font-bold text-sm hover:bg-primary transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3"
                  >
                    {editingProject ? "Update Project" : "Create Project"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
