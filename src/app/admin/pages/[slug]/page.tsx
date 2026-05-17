"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPageBySlug, updatePage } from "@/lib/actions";
import { Save, Loader2, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
      
      const isNew = resolvedParams.slug === "new";
      if (!isNew) {
        const data = await getPageBySlug(resolvedParams.slug);
        if (data) {
          setPage(data);
        } else {
          setPage({
            slug: resolvedParams.slug,
            title: resolvedParams.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            template_type: "default",
            content: {}
          });
        }
      } else {
        setPage({
          slug: "",
          title: "",
          template_type: "default",
          content: {}
        });
      }
      setLoading(false);
    }
    load();
  }, [params]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!page.slug || !page.title) {
      setMessage("Slug and Title are required");
      return;
    }
    
    setSaving(true);
    setMessage("");
    
    try {
      const res = await updatePage(page.slug, page.title, page.content, page.template_type);
      if (res.success) {
        setMessage("Page saved successfully!");
        setTimeout(() => {
          setMessage("");
          if (slug === "new") {
            router.push(`/admin/pages`);
          }
        }, 2000);
      } else {
        setMessage(res.error || "Failed to save page");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error saving page.");
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

  const isFounder = page.template_type === 'founder';

  const handleFounderChange = (index: number, field: string, value: string) => {
    const newContent = [...(Array.isArray(page.content) ? page.content : [])];
    if (!newContent[index]) newContent[index] = {};
    newContent[index][field] = value;
    setPage({ ...page, content: newContent });
  };

  const addFounder = () => {
    const newContent = [...(Array.isArray(page.content) ? page.content : []), { name: "", designation: "", quote: "", image: "" }];
    setPage({ ...page, content: newContent });
  };

  const removeFounder = (index: number) => {
    const newContent = [...(Array.isArray(page.content) ? page.content : [])];
    newContent.splice(index, 1);
    setPage({ ...page, content: newContent });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl pb-20"
    >
      <div className="mb-8">
        <Link href="/admin/pages" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-4 transition-colors font-medium">
          <ArrowLeft size={16} /> Back to Pages
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{slug === "new" ? "Create New Page" : `Edit ${page.title}`}</h1>
            <p className="text-gray-500">Manage page details and template content.</p>
          </div>
          {message && (
            <div className={`px-4 py-2 rounded-xl text-sm font-bold animate-fade-in ${message.includes('Error') || message.includes('Failed') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {message}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Page Title</label>
              <input 
                type="text"
                value={page.title || ""}
                onChange={(e) => setPage({ ...page, title: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="e.g. Our Founder"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">URL Slug</label>
              <input 
                type="text"
                value={page.slug || ""}
                onChange={(e) => setPage({ ...page, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm"
                placeholder="e.g. our-founder"
                disabled={slug !== "new"}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Template Type</label>
              <select 
                value={page.template_type || "default"}
                onChange={(e) => {
                  const val = e.target.value;
                  setPage({ 
                    ...page, 
                    template_type: val,
                    content: val === 'founder' ? (Array.isArray(page.content) ? page.content : []) : page.content 
                  });
                }}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="default">Default Content</option>
                <option value="founder">Founder Profile List</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Page Content</h2>
          
          {isFounder ? (
            <div className="space-y-8">
              <p className="text-sm text-gray-500 mb-4">Add or edit founder profiles to display on this page.</p>
              
              {(Array.isArray(page.content) ? page.content : []).map((founder: any, index: number) => (
                <div key={index} className="p-6 bg-gray-50 rounded-2xl relative border border-gray-200">
                  <button 
                    type="button" 
                    onClick={() => removeFounder(index)}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 bg-white p-2 rounded-lg shadow-sm transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Name</label>
                      <input 
                        type="text"
                        value={founder.name || ""}
                        onChange={(e) => handleFounderChange(index, 'name', e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Designation</label>
                      <input 
                        type="text"
                        value={founder.designation || ""}
                        onChange={(e) => handleFounderChange(index, 'designation', e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-gray-800"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Image URL</label>
                      <div className="flex items-center gap-4">
                        <div className="relative group flex-1">
                          <input 
                            type="text"
                            value={founder.image || ""}
                            onChange={(e) => handleFounderChange(index, 'image', e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-gray-800 font-mono text-sm"
                            placeholder="/amit-sir.jpg or upload"
                          />
                        </div>
                        <label className="bg-black text-white px-4 py-3 rounded-xl cursor-pointer hover:bg-primary transition-all flex items-center gap-2 whitespace-nowrap text-xs font-bold">
                          Upload Image
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFounderChange(index, 'image', 'Uploading...');
                                const formData = new FormData();
                                formData.append('file', file);
                                try {
                                  const res = await fetch('/api/upload', {
                                    method: 'POST',
                                    body: formData
                                  });
                                  const data = await res.json();
                                  if (data.url) {
                                    handleFounderChange(index, 'image', data.url);
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
                      {founder.image && (
                        <div className="mt-2 p-2 bg-gray-50 rounded-xl inline-block border border-gray-100">
                          <img src={founder.image} alt="Preview" className="h-16 w-auto object-cover rounded-md" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quote / Description</label>
                      <textarea 
                        rows={3}
                        value={founder.quote || ""}
                        onChange={(e) => handleFounderChange(index, 'quote', e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-gray-800 resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button 
                type="button" 
                onClick={addFounder}
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 font-bold hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={20} /> Add Founder Profile
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Edit the raw JSON content for this page template.</p>
              <textarea 
                rows={15}
                value={typeof page.content === 'object' ? JSON.stringify(page.content, null, 2) : page.content}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setPage({ ...page, content: parsed });
                  } catch (err) {
                    // Ignore JSON parse errors while typing, but update the string view
                    setPage({ ...page, content: e.target.value });
                  }
                }}
                className="w-full bg-gray-900 border-none rounded-xl px-4 py-4 text-emerald-400 font-mono text-sm focus:ring-2 focus:ring-primary/20 transition-all custom-scrollbar"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={saving}
            className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary transition-all flex items-center gap-3 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {saving ? "Saving..." : "Save Page"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
