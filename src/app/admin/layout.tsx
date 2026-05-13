import Sidebar from "@/components/Sidebar";
import { getSettings } from "@/lib/actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      <Sidebar logo={settings.logo_url} />

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <header className="h-20 bg-white border-b flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest">
              ADMIN PANEL
            </h2>
            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
              {settings.company_name || "AR Creative Homes"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              AR
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800">Admin</span>
              <span className="text-[10px] text-gray-400">Super User</span>
            </div>
          </div>
        </header>

        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
