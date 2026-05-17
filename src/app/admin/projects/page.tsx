"use client";

import { useState, useEffect } from "react";
import { getProjects, addProject, updateProject, deleteProject } from "@/lib/actions";
import { Plus, Edit2, Trash2, Building2, MapPin, Star, X, Loader2, Image as ImageIcon, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    is_featured: false
  });

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
        is_featured: project.is_featured
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        image: "",
        category: "Residential",
        location_name: "",
        description: "",
        is_featured: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingProject) {
      await updateProject(editingProject.id, formData);
    } else {
      await addProject(formData);
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

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Projects Management</h1>
          <p className="text-gray-500">Add, edit or remove your property listings.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-black text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Add New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
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
                  href={`/residential?location=${encodeURIComponent(project.location_name || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer"
                  title="View live website page"
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
              className="bg-white w-full max-w-2xl rounded-[40px] overflow-hidden relative z-10 shadow-2xl"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {editingProject ? "Edit Project" : "Add New Project"}
                    </h2>
                    {editingProject && formData.location_name && (
                      <a 
                        href={`/residential?location=${encodeURIComponent(formData.location_name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-primary hover:text-white text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        title="View live website page"
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
