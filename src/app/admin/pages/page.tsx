import Link from "next/link";
import { getPages } from "@/lib/actions";
import { Files } from "lucide-react";
import PagesTable from "@/components/PagesTable";

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

      <PagesTable initialPages={pages} />
    </div>
  );
}
