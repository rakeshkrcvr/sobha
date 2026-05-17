"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPageBySlug, updatePage, getPages } from "@/lib/actions";
import { Save, Loader2, ArrowLeft, Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [page, setPage] = useState<any>(null);
  const [allPages, setAllPages] = useState<any[]>([]);
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
            template_type: "modular",
            content: []
          });
        }
      } else {
        setPage({
          slug: "",
          title: "",
          template_type: "modular",
          content: []
        });
      }

      // Load all pages for dropdown
      const pagesList = await getPages();
      setAllPages(pagesList);
      
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
        
        // Reload all pages list
        const pagesList = await getPages();
        setAllPages(pagesList);

        setTimeout(() => {
          setMessage("");
          if (slug === "new") {
            router.push(`/admin/pages/${page.slug}`);
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
  const isModular = page.template_type === 'modular';

  // Section handling for Modular Template
  const handleSectionChange = (index: number, field: string, value: any) => {
    const sections = [...(Array.isArray(page.content) ? page.content : [])];
    if (!sections[index]) sections[index] = {};
    sections[index][field] = value;
    setPage({ ...page, content: sections });
  };

  const addSection = (type: string) => {
    const sections = [...(Array.isArray(page.content) ? page.content : [])];
    let newSection: any = { type };
    if (type === 'hero') {
      newSection = { type, title: "", subtitle: "", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" };
    } else if (type === 'text') {
      newSection = { type, title: "", body: "" };
    } else if (type === 'image_text') {
      newSection = { type, title: "", body: "", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80", image_align: "left" };
    } else if (type === 'features') {
      newSection = { type, title: "", items: [{ title: "", desc: "" }] };
    } else if (type === 'founder_list') {
      newSection = { type, title: "", items: [{ name: "", designation: "", quote: "", image: "" }] };
    } else if (type === 'home_slider') {
      newSection = { type, items: [{ src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80", type: "image", title: "Luxury Redefined", subtitle: "AR Creative Homes" }] };
    } else if (type === 'cities_grid') {
      newSection = { type, title: "Explore Our Cities" };
    } else if (type === 'brand_philosophy') {
      newSection = { type, title: "Our Philosophy", subtitle: "Crafting Timeless Lifestyles", description: "At AR Creative Homes, our philosophy is anchored in transparency, luxury finishes, and highly reliable structural designs.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" };
    } else if (type === 'more_about_ar') {
      newSection = { 
        type, 
        title: "MORE ABOUT AR CREATIVE", 
        subtitle: "Premium Real Estate Brand in Greater Noida West & NCR",
        items: [
          { title: "MEDIA CENTRE", description: "Your source for the latest news and updates from AR Creative Homes. Access our brand assets and news coverage.", image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80", link: "#" },
          { title: "SMART INVESTMENTS", description: "Explore highly profitable investment opportunities across Greater Noida West and NCR, curated by our expert team.", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80", link: "#" },
          { title: "AR BLOG", description: "Get latest insights from the real estate sector and in-depth views on property investment avenues from our experts.", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80", link: "#" }
        ]
      };
    }
    setPage({ ...page, content: [...sections, newSection] });
  };

  const removeSection = (index: number) => {
    const sections = [...(Array.isArray(page.content) ? page.content : [])];
    sections.splice(index, 1);
    setPage({ ...page, content: sections });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const sections = [...(Array.isArray(page.content) ? page.content : [])];
    if (direction === 'up' && index > 0) {
      const temp = sections[index];
      sections[index] = sections[index - 1];
      sections[index - 1] = temp;
    } else if (direction === 'down' && index < sections.length - 1) {
      const temp = sections[index];
      sections[index] = sections[index + 1];
      sections[index + 1] = temp;
    }
    setPage({ ...page, content: sections });
  };

  // Founder compatibility helpers
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <Link href="/admin/pages" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium">
            <ArrowLeft size={16} /> Back to Pages
          </Link>

          {/* Quick Page Jump Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Jump to:</span>
            <select
              value={page.slug}
              onChange={(e) => {
                if (e.target.value) {
                  router.push(`/admin/pages/${e.target.value}`);
                }
              }}
              className="bg-gray-100 border-none rounded-xl px-4 py-2 text-xs font-bold text-gray-700 cursor-pointer focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Choose Page...</option>
              {allPages.map((p) => (
                <option key={p.slug} value={p.slug}>{p.title}</option>
              ))}
            </select>
          </div>
        </div>

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
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
                placeholder="e.g. Core Values"
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
                placeholder="e.g. core-values"
                disabled={slug !== "new"}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Template Type</label>
              <select 
                value={page.template_type || "modular"}
                onChange={(e) => {
                  const val = e.target.value;
                  setPage({ 
                    ...page, 
                    template_type: val,
                    content: val === 'founder' || val === 'modular' ? (Array.isArray(page.content) ? page.content : []) : page.content 
                  });
                }}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
              >
                <option value="modular">Section-by-Section Editor (Recommended)</option>
                <option value="founder">Founder Profile List (Legacy)</option>
                <option value="default">Raw JSON Editor (Advanced)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Page Content Editor */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Page Content Blocks</h2>
            {isModular && (
              <div className="flex gap-2">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addSection(e.target.value);
                      e.target.value = "";
                    }
                  }}
                  className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary transition-all cursor-pointer"
                >
                  <option value="">+ Add Section...</option>
                  <option value="home_slider">Homepage Hero Slider</option>
                  <option value="cities_grid">Cities Navigation Grid</option>
                  <option value="brand_philosophy">Brand Philosophy Block</option>
                  <option value="more_about_ar">More About AR Grid</option>
                  <option value="hero">Hero Header Section</option>
                  <option value="text">Centered Text Section</option>
                  <option value="image_text">Image with Text Section</option>
                  <option value="features">Features/Consulting Grid</option>
                  <option value="founder_list">Team/Leader Grid</option>
                </select>
              </div>
            )}
          </div>
          
          {/* 1. Modular Template Editor */}
          {isModular ? (
            <div className="space-y-12">
              {(Array.isArray(page.content) ? page.content : []).length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
                  <p className="text-gray-400 font-medium mb-4">No content sections added yet.</p>
                  <div className="flex justify-center gap-3">
                    <button type="button" onClick={() => addSection('hero')} className="bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">Add Hero</button>
                    <button type="button" onClick={() => addSection('text')} className="bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">Add Text Block</button>
                    <button type="button" onClick={() => addSection('image_text')} className="bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">Add Image & Text</button>
                  </div>
                </div>
              ) : (
                (page.content as any[]).map((section: any, sIndex: number) => (
                  <div key={sIndex} className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 relative group/section">
                    
                    {/* Section Toolbar */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-60 group-hover/section:opacity-100 transition-opacity">
                      <button 
                        type="button" 
                        onClick={() => moveSection(sIndex, 'up')}
                        disabled={sIndex === 0}
                        className="bg-white p-2 rounded-lg shadow-sm text-gray-500 hover:text-black disabled:opacity-30"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => moveSection(sIndex, 'down')}
                        disabled={sIndex === (page.content as any[]).length - 1}
                        className="bg-white p-2 rounded-lg shadow-sm text-gray-500 hover:text-black disabled:opacity-30"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => removeSection(sIndex)}
                        className="bg-white p-2 rounded-lg shadow-sm text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Section Indicator */}
                    <div className="mb-6 flex items-center gap-2">
                      <span className="bg-primary/20 text-primary font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                        {section.type === 'image_text' ? 'Image & Text' : section.type} section
                      </span>
                    </div>

                    {/* HERO SECTION FIELDS */}
                    {section.type === 'hero' && (
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hero Title</label>
                          <input 
                            type="text"
                            value={section.title || ""}
                            onChange={(e) => handleSectionChange(sIndex, 'title', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold"
                            placeholder="Welcome to Philosophy"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hero Subtitle</label>
                          <input 
                            type="text"
                            value={section.subtitle || ""}
                            onChange={(e) => handleSectionChange(sIndex, 'subtitle', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm"
                            placeholder="Crafting luxury for generations"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Background Image URL</label>
                          <div className="flex gap-4">
                            <input 
                              type="text"
                              value={section.image || ""}
                              onChange={(e) => handleSectionChange(sIndex, 'image', e.target.value)}
                              className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono"
                            />
                            <label className="bg-black text-white px-5 py-3 rounded-xl cursor-pointer hover:bg-primary font-bold text-xs flex items-center gap-1.5">
                              Upload
                              <input 
                                type="file" 
                                className="hidden" 
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleSectionChange(sIndex, 'image', 'Uploading...');
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                    const d = await res.json();
                                    if (d.url) handleSectionChange(sIndex, 'image', d.url);
                                    else alert("Upload failed");
                                  }
                                }}
                              />
                            </label>
                          </div>
                          {section.image && section.image !== 'Uploading...' && (
                            <img src={section.image} className="h-16 w-32 object-cover rounded-xl mt-2 border" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* TEXT SECTION FIELDS */}
                    {section.type === 'text' && (
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Section Heading (Optional)</label>
                          <input 
                            type="text"
                            value={section.title || ""}
                            onChange={(e) => handleSectionChange(sIndex, 'title', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold"
                            placeholder="Our Core Philosophy"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Paragraph Content</label>
                          <textarea 
                            rows={5}
                            value={section.body || ""}
                            onChange={(e) => handleSectionChange(sIndex, 'body', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none"
                            placeholder="Enter the detailed description text for the section..."
                          />
                        </div>
                      </div>
                    )}

                    {/* IMAGE & TEXT FIELDS */}
                    {section.type === 'image_text' && (
                      <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Heading</label>
                            <input 
                              type="text"
                              value={section.title || ""}
                              onChange={(e) => handleSectionChange(sIndex, 'title', e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image Position</label>
                            <select 
                              value={section.image_align || "left"}
                              onChange={(e) => handleSectionChange(sIndex, 'image_align', e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold"
                            >
                              <option value="left">Image on Left, Text on Right</option>
                              <option value="right">Image on Right, Text on Left</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
                          <textarea 
                            rows={4}
                            value={section.body || ""}
                            onChange={(e) => handleSectionChange(sIndex, 'body', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image URL</label>
                          <div className="flex gap-4">
                            <input 
                              type="text"
                              value={section.image || ""}
                              onChange={(e) => handleSectionChange(sIndex, 'image', e.target.value)}
                              className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono"
                            />
                            <label className="bg-black text-white px-5 py-3 rounded-xl cursor-pointer hover:bg-primary font-bold text-xs flex items-center gap-1.5">
                              Upload
                              <input 
                                type="file" 
                                className="hidden" 
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleSectionChange(sIndex, 'image', 'Uploading...');
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                    const d = await res.json();
                                    if (d.url) handleSectionChange(sIndex, 'image', d.url);
                                    else alert("Upload failed");
                                  }
                                }}
                              />
                            </label>
                          </div>
                          {section.image && section.image !== 'Uploading...' && (
                            <img src={section.image} className="h-20 w-36 object-cover rounded-xl mt-2 border" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* FEATURES GRID FIELDS */}
                    {section.type === 'features' && (
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Grid Header</label>
                          <input 
                            type="text"
                            value={section.title || ""}
                            onChange={(e) => handleSectionChange(sIndex, 'title', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold"
                            placeholder="e.g. Core Pillars"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Feature Items</label>
                          {(section.items || []).map((item: any, iIndex: number) => (
                            <div key={iIndex} className="flex gap-4 items-start bg-white p-4 rounded-xl border border-gray-200 relative group/item">
                              <button 
                                type="button"
                                onClick={() => {
                                  const items = [...(section.items || [])];
                                  items.splice(iIndex, 1);
                                  handleSectionChange(sIndex, 'items', items);
                                }}
                                className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover/item:opacity-100 transition-opacity"
                              >
                                <Trash2 size={12} />
                              </button>
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <input 
                                    type="text" 
                                    value={item.title || ""} 
                                    onChange={(e) => {
                                      const items = [...(section.items || [])];
                                      items[iIndex].title = e.target.value;
                                      handleSectionChange(sIndex, 'items', items);
                                    }}
                                    className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-bold"
                                    placeholder="Feature Title"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <input 
                                    type="text" 
                                    value={item.desc || ""} 
                                    onChange={(e) => {
                                      const items = [...(section.items || [])];
                                      items[iIndex].desc = e.target.value;
                                      handleSectionChange(sIndex, 'items', items);
                                    }}
                                    className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-xs"
                                    placeholder="Feature Description"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const items = [...(section.items || []), { title: "", desc: "" }];
                              handleSectionChange(sIndex, 'items', items);
                            }}
                            className="text-xs font-bold text-primary hover:text-black transition-colors"
                          >
                            + Add Feature Item
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TEAM PROFILE GRID FIELDS */}
                    {section.type === 'founder_list' && (
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Leadership Grid Title</label>
                          <input 
                            type="text"
                            value={section.title || ""}
                            onChange={(e) => handleSectionChange(sIndex, 'title', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold"
                            placeholder="e.g. Board of Directors"
                          />
                        </div>
                        <div className="space-y-6">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Team Profiles</label>
                          {(section.items || []).map((member: any, mIndex: number) => (
                            <div key={mIndex} className="p-4 bg-white rounded-xl border border-gray-200 relative group/member flex flex-col gap-4">
                              <button 
                                type="button"
                                onClick={() => {
                                  const items = [...(section.items || [])];
                                  items.splice(mIndex, 1);
                                  handleSectionChange(sIndex, 'items', items);
                                }}
                                className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover/member:opacity-100 transition-opacity"
                              >
                                <Trash2 size={12} />
                              </button>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input 
                                  type="text" 
                                  value={member.name || ""} 
                                  onChange={(e) => {
                                    const items = [...(section.items || [])];
                                    items[mIndex].name = e.target.value;
                                    handleSectionChange(sIndex, 'items', items);
                                  }}
                                  className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-bold"
                                  placeholder="Full Name"
                                />
                                <input 
                                  type="text" 
                                  value={member.designation || ""} 
                                  onChange={(e) => {
                                    const items = [...(section.items || [])];
                                    items[mIndex].designation = e.target.value;
                                    handleSectionChange(sIndex, 'items', items);
                                  }}
                                  className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-semibold text-primary"
                                  placeholder="Designation"
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <div className="flex gap-2">
                                    <input 
                                      type="text" 
                                      value={member.image || ""} 
                                      onChange={(e) => {
                                        const items = [...(section.items || [])];
                                        items[mIndex].image = e.target.value;
                                        handleSectionChange(sIndex, 'items', items);
                                      }}
                                      className="flex-1 bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-mono"
                                      placeholder="Image URL"
                                    />
                                    <label className="bg-black text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-primary font-bold text-[10px] flex items-center">
                                      Upload
                                      <input 
                                        type="file" 
                                        className="hidden" 
                                        onChange={async (e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const items = [...(section.items || [])];
                                            items[mIndex].image = 'Uploading...';
                                            handleSectionChange(sIndex, 'items', items);

                                            const formData = new FormData();
                                            formData.append('file', file);
                                            const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                            const d = await res.json();
                                            if (d.url) {
                                              items[mIndex].image = d.url;
                                              handleSectionChange(sIndex, 'items', items);
                                            } else alert("Upload failed");
                                          }
                                        }}
                                      />
                                    </label>
                                  </div>
                                  {member.image && member.image !== 'Uploading...' && (
                                    <img src={member.image} className="h-10 w-10 object-cover rounded-lg border mt-1" />
                                  )}
                                </div>
                                <input 
                                  type="text" 
                                  value={member.quote || ""} 
                                  onChange={(e) => {
                                    const items = [...(section.items || [])];
                                    items[mIndex].quote = e.target.value;
                                    handleSectionChange(sIndex, 'items', items);
                                  }}
                                  className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-xs"
                                  placeholder="Quote or short bio..."
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const items = [...(section.items || []), { name: "", designation: "", quote: "", image: "" }];
                              handleSectionChange(sIndex, 'items', items);
                            }}
                            className="text-xs font-bold text-primary hover:text-black transition-colors"
                          >
                            + Add Team Profile
                          </button>
                        </div>
                      </div>
                    )}

                    {/* HOMEPAGE HERO SLIDER SECTION FIELDS */}
                    {section.type === 'home_slider' && (
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-4">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Slider Media Items (Images or Videos)</label>
                          {(section.items || []).map((slide: any, sIdx: number) => (
                            <div key={sIdx} className="p-4 bg-white rounded-xl border border-gray-200 relative group/slide flex flex-col gap-4">
                              <button 
                                type="button"
                                onClick={() => {
                                  const items = [...(section.items || [])];
                                  items.splice(sIdx, 1);
                                  handleSectionChange(sIndex, 'items', items);
                                }}
                                className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover/slide:opacity-100 transition-opacity"
                              >
                                <Trash2 size={12} />
                              </button>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[9px] font-bold text-gray-400">Media Type</label>
                                  <select 
                                    value={slide.type || "image"} 
                                    onChange={(e) => {
                                      const items = [...(section.items || [])];
                                      items[sIdx].type = e.target.value;
                                      handleSectionChange(sIndex, 'items', items);
                                    }}
                                    className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-bold"
                                  >
                                    <option value="image">Image Slide</option>
                                    <option value="video">Video Slide</option>
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] font-bold text-gray-400">Upload Media</label>
                                  <div className="flex gap-2">
                                    <input 
                                      type="text" 
                                      value={slide.src || ""} 
                                      onChange={(e) => {
                                        const items = [...(section.items || [])];
                                        items[sIdx].src = e.target.value;
                                        handleSectionChange(sIndex, 'items', items);
                                      }}
                                      className="flex-1 bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-mono"
                                      placeholder="File URL"
                                    />
                                    <label className="bg-black text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-primary font-bold text-[10px] flex items-center">
                                      Upload
                                      <input 
                                        type="file" 
                                        className="hidden" 
                                        accept={slide.type === 'video' ? 'video/*' : 'image/*'}
                                        onChange={async (e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const items = [...(section.items || [])];
                                            items[sIdx].src = 'Uploading...';
                                            handleSectionChange(sIndex, 'items', items);

                                            const formData = new FormData();
                                            formData.append('file', file);
                                            const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                            const d = await res.json();
                                            if (d.url) {
                                              items[sIdx].src = d.url;
                                              handleSectionChange(sIndex, 'items', items);
                                            } else alert("Upload failed");
                                          }
                                        }}
                                      />
                                    </label>
                                  </div>
                                  {slide.src && slide.src !== 'Uploading...' && (
                                    slide.type === 'video' ? (
                                      <video src={slide.src} className="h-10 w-20 object-cover rounded-lg border mt-1" muted playsInline />
                                    ) : (
                                      <img src={slide.src} className="h-10 w-20 object-cover rounded-lg border mt-1" />
                                    )
                                  )}
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input 
                                  type="text" 
                                  value={slide.title || ""} 
                                  onChange={(e) => {
                                    const items = [...(section.items || [])];
                                    items[sIdx].title = e.target.value;
                                    handleSectionChange(sIndex, 'items', items);
                                  }}
                                  className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-bold"
                                  placeholder="Slide Title (Main heading)"
                                />
                                <input 
                                  type="text" 
                                  value={slide.subtitle || ""} 
                                  onChange={(e) => {
                                    const items = [...(section.items || [])];
                                    items[sIdx].subtitle = e.target.value;
                                    handleSectionChange(sIndex, 'items', items);
                                  }}
                                  className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-xs"
                                  placeholder="Slide Subtitle"
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const items = [...(section.items || []), { src: "", type: "image", title: "", subtitle: "" }];
                              handleSectionChange(sIndex, 'items', items);
                            }}
                            className="text-xs font-bold text-primary hover:text-black transition-colors"
                          >
                            + Add Slide
                          </button>
                        </div>
                      </div>
                    )}

                    {/* CITIES NAVIGATION GRID SECTION FIELDS */}
                    {section.type === 'cities_grid' && (
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Section Header Title</label>
                          <input 
                            type="text"
                            value={section.title || ""}
                            onChange={(e) => handleSectionChange(sIndex, 'title', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold"
                            placeholder="e.g. Choose Your Lifestyle City"
                          />
                        </div>
                        <p className="text-xs text-gray-400 font-medium">This block dynamically displays the registered Cities & Projects from your active cities table.</p>
                      </div>
                    )}

                    {/* BRAND PHILOSOPHY BLOCK SECTION FIELDS */}
                    {section.type === 'brand_philosophy' && (
                      <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Philosophy Title</label>
                            <input 
                              type="text"
                              value={section.title || ""}
                              onChange={(e) => handleSectionChange(sIndex, 'title', e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Philosophy Subtitle</label>
                            <input 
                              type="text"
                              value={section.subtitle || ""}
                              onChange={(e) => handleSectionChange(sIndex, 'subtitle', e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Detailed Philosophy Description</label>
                          <textarea 
                            rows={4}
                            value={section.description || ""}
                            onChange={(e) => handleSectionChange(sIndex, 'description', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Philosophy Highlight Image URL</label>
                          <div className="flex gap-4">
                            <input 
                              type="text"
                              value={section.image || ""}
                              onChange={(e) => handleSectionChange(sIndex, 'image', e.target.value)}
                              className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono"
                            />
                            <label className="bg-black text-white px-5 py-3 rounded-xl cursor-pointer hover:bg-primary font-bold text-xs flex items-center gap-1.5">
                              Upload
                              <input 
                                type="file" 
                                className="hidden" 
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleSectionChange(sIndex, 'image', 'Uploading...');
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                    const d = await res.json();
                                    if (d.url) handleSectionChange(sIndex, 'image', d.url);
                                    else alert("Upload failed");
                                  }
                                }}
                              />
                            </label>
                          </div>
                          {section.image && section.image !== 'Uploading...' && (
                            <img src={section.image} className="h-20 w-36 object-cover rounded-xl mt-2 border" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* MORE ABOUT AR GRID SECTION FIELDS */}
                    {section.type === 'more_about_ar' && (
                      <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Section Title</label>
                            <input 
                              type="text"
                              value={section.title || ""}
                              onChange={(e) => handleSectionChange(sIndex, 'title', e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Section Subtitle</label>
                            <input 
                              type="text"
                              value={section.subtitle || ""}
                              onChange={(e) => handleSectionChange(sIndex, 'subtitle', e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Showcase Items (Maximum 3 recommended)</label>
                          {(section.items || []).map((item: any, iIdx: number) => (
                            <div key={iIdx} className="p-4 bg-white rounded-xl border border-gray-200 relative group/showcase flex flex-col gap-4">
                              <button 
                                type="button"
                                onClick={() => {
                                  const items = [...(section.items || [])];
                                  items.splice(iIdx, 1);
                                  handleSectionChange(sIndex, 'items', items);
                                }}
                                className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover/showcase:opacity-100 transition-opacity"
                              >
                                <Trash2 size={12} />
                              </button>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input 
                                  type="text" 
                                  value={item.title || ""} 
                                  onChange={(e) => {
                                    const items = [...(section.items || [])];
                                    items[iIdx].title = e.target.value;
                                    handleSectionChange(sIndex, 'items', items);
                                  }}
                                  className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-bold"
                                  placeholder="Card Title (e.g. MEDIA CENTRE)"
                                />
                                <input 
                                  type="text" 
                                  value={item.link || ""} 
                                  onChange={(e) => {
                                    const items = [...(section.items || [])];
                                    items[iIdx].link = e.target.value;
                                    handleSectionChange(sIndex, 'items', items);
                                  }}
                                  className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-mono"
                                  placeholder="Link (e.g. # or /blog)"
                                />
                              </div>
                              <div className="space-y-2">
                                <textarea 
                                  rows={2}
                                  value={item.description || ""} 
                                  onChange={(e) => {
                                    const items = [...(section.items || [])];
                                    items[iIdx].description = e.target.value;
                                    handleSectionChange(sIndex, 'items', items);
                                  }}
                                  className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-xs"
                                  placeholder="Card Description..."
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold text-gray-400">Card Image URL</label>
                                <div className="flex gap-2">
                                  <input 
                                    type="text" 
                                    value={item.image || ""} 
                                    onChange={(e) => {
                                      const items = [...(section.items || [])];
                                      items[iIdx].image = e.target.value;
                                      handleSectionChange(sIndex, 'items', items);
                                    }}
                                    className="flex-1 bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-mono"
                                    placeholder="Image URL"
                                  />
                                  <label className="bg-black text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-primary font-bold text-[10px] flex items-center">
                                    Upload
                                    <input 
                                      type="file" 
                                      className="hidden" 
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          const items = [...(section.items || [])];
                                          items[iIdx].image = 'Uploading...';
                                          handleSectionChange(sIndex, 'items', items);

                                          const formData = new FormData();
                                          formData.append('file', file);
                                          const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                          const d = await res.json();
                                          if (d.url) {
                                            items[iIdx].image = d.url;
                                            handleSectionChange(sIndex, 'items', items);
                                          } else alert("Upload failed");
                                        }
                                      }}
                                    />
                                  </label>
                                </div>
                                {item.image && item.image !== 'Uploading...' && (
                                  <img src={item.image} className="h-10 w-20 object-cover rounded-lg border mt-1" />
                                )}
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const items = [...(section.items || []), { title: "", description: "", image: "", link: "#" }];
                              handleSectionChange(sIndex, 'items', items);
                            }}
                            className="text-xs font-bold text-primary hover:text-black transition-colors"
                          >
                            + Add Showcase Card
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                ))
              )}
            </div>
          ) : isFounder ? (
            /* 2. Legacy Founder Editor */
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
            /* 3. Legacy Raw JSON Editor */
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
