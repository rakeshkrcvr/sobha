"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Search } from "lucide-react";

export default function PagesTable({ initialPages }: { initialPages: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPages = (initialPages || []).filter((page) => {
    const titleMatch = (page.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const slugMatch = (page.slug || "").toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || slugMatch;
  });

  return (
    <div className="space-y-6">
      {/* Premium Search Input Box */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search pages by title or URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-semibold placeholder-gray-400 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all shadow-sm"
        />
      </div>

      {/* Pages List Table */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-400 font-bold">
            <tr>
              <th className="px-8 py-6">Title</th>
              <th className="px-8 py-6">Slug URL</th>
              <th className="px-8 py-6">Template</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredPages.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-medium">
                  {searchTerm ? "No matching pages found." : "No pages found. Create one to get started!"}
                </td>
              </tr>
            ) : (
              filteredPages.map((page: any) => (
                <tr key={page.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 font-bold text-gray-800">{page.title}</td>
                  <td className="px-8 py-6 text-gray-500 font-mono text-sm">
                    {page.slug === 'home' ? '/' : `/${page.slug}`}
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {page.template_type || "default"}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link 
                      href={`/admin/pages/${page.slug}`}
                      className="inline-flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white text-gray-600 px-4 py-2 rounded-lg text-sm font-bold transition-all"
                    >
                      <Edit size={14} /> Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
