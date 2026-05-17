import Link from "next/link";
import { getPages } from "@/lib/actions";
import { Files, Edit } from "lucide-react";

export default async function AdminPagesList() {
  const pages = await getPages();

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pages</h1>
          <p className="text-gray-500">Manage the content of your dynamic pages.</p>
        </div>
        <Link href="/admin/pages/new" className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-primary transition-all flex items-center gap-2">
          <Files size={18} />
          Add New Page
        </Link>
      </div>

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
            {pages.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-gray-400">
                  No pages found. Create one to get started!
                </td>
              </tr>
            ) : (
              pages.map((page: any) => (
                <tr key={page.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 font-bold text-gray-800">{page.title}</td>
                  <td className="px-8 py-6 text-gray-500 font-mono text-sm">/{page.slug}</td>
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
