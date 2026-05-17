"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function HeroAdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/pages/home");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="text-gray-500 font-bold text-sm tracking-wide">Redirecting to Homepage CMS Builder...</p>
    </div>
  );
}
