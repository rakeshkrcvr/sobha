"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, Image as ImageIcon, MapPin } from "lucide-react";
import { getLocations, addLocation, updateLocation, deleteLocation } from "@/lib/actions";

export default function LocationsAdmin() {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // New location state
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const data = await getLocations();
    setLocations(data);
    setLoading(false);
  };

  const handleUploadNew = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImage('Uploading...');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setNewImage(data.url);
      else alert("Upload failed");
    } catch {
      alert("Upload failed");
      setNewImage("");
    }
  };

  const handleUploadEdit = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Optimistic update
    const newLocs = [...locations];
    const index = newLocs.findIndex(l => l.id === id);
    newLocs[index].image = 'Uploading...';
    setLocations(newLocs);

    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        newLocs[index].image = data.url;
        setLocations([...newLocs]);
      } else alert("Upload failed");
    } catch {
      alert("Upload failed");
    }
  };

  const handleAdd = async () => {
    if (!newName || !newImage) {
      alert("Please provide both name and image");
      return;
    }
    setSaving(true);
    await addLocation({ name: newName, image: newImage });
    await fetchLocations();
    setIsAdding(false);
    setNewName("");
    setNewImage("");
    setSaving(false);
  };

  const handleUpdate = async (id: number) => {
    const loc = locations.find(l => l.id === id);
    if (!loc) return;
    setSaving(true);
    await updateLocation(id, { name: loc.name, image: loc.image });
    setEditingId(null);
    setSaving(false);
    alert("Location updated");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this city?")) {
      setSaving(true);
      await deleteLocation(id);
      await fetchLocations();
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center">Loading cities...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">Cities</h1>
          <p className="text-gray-500 font-medium">Manage cities and their cover images.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-black text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-primary transition-all flex items-center gap-2"
        >
          <Plus size={16} /> Add New City
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 flex gap-6 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">City Name</label>
            <input 
              type="text" 
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm"
              placeholder="e.g. Noida Extension"
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cover Image</label>
            <div className="flex gap-4 items-center">
              <input 
                type="text" 
                value={newImage}
                onChange={e => setNewImage(e.target.value)}
                className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm"
                placeholder="Image URL or Upload..."
              />
              <label className="bg-gray-100 text-black px-6 py-4 rounded-2xl cursor-pointer hover:bg-gray-200 transition-all font-bold text-xs whitespace-nowrap">
                Upload
                <input type="file" className="hidden" accept="image/*" onChange={handleUploadNew} />
              </label>
            </div>
          </div>
          <button 
            onClick={handleAdd}
            disabled={saving || newImage === 'Uploading...'}
            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            Save City
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map((loc) => (
          <div key={loc.id} className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden group">
            <div className="h-48 relative overflow-hidden bg-gray-100">
              {loc.image === 'Uploading...' ? (
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">Uploading...</div>
              ) : (
                <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              )}
              {editingId === loc.id && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-10">
                  <label className="bg-white text-black px-6 py-3 rounded-xl cursor-pointer hover:bg-primary hover:text-white transition-all font-bold text-xs flex items-center gap-2">
                    <ImageIcon size={14} /> Change Image
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadEdit(e, loc.id)} />
                  </label>
                </div>
              )}
            </div>
            
            <div className="p-6">
              {editingId === loc.id ? (
                <div className="space-y-4">
                  <input 
                    type="text" 
                    value={loc.name}
                    onChange={e => {
                      const newLocs = [...locations];
                      const index = newLocs.findIndex(l => l.id === loc.id);
                      newLocs[index].name = e.target.value;
                      setLocations(newLocs);
                    }}
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleUpdate(loc.id)}
                      disabled={saving}
                      className="flex-1 bg-black text-white py-3 rounded-xl text-xs font-bold hover:bg-primary transition-all flex justify-center items-center gap-2"
                    >
                      <Save size={14} /> Save
                    </button>
                    <button 
                      onClick={() => { setEditingId(null); fetchLocations(); }}
                      className="bg-gray-100 text-black px-4 py-3 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <MapPin size={18} className="text-primary" />
                    {loc.name}
                  </h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setEditingId(loc.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-black"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(loc.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
