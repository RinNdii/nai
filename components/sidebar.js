"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { ROLES } from "@/lib/constants";

const roleMenus = {
  [ROLES.ADMIN]: [
    { nama: "Dashboard Admin", path: "/admin", icon: "📊" },
  ],
  [ROLES.PENJAHIT]: [
    { nama: "Ruang Kerja", path: "/penjahit", icon: "🧵" },
  ],
};

export default function Sidebar({ role, color, user }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const menuItems = roleMenus[role] ?? [];

  const handleLogout = async () => {
    setIsSubmitting(true);

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className={`flex min-h-screen w-64 flex-col p-6 text-white shadow-xl ${color}`}>
      <div className="mb-10 px-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">✂️</span>
          <h1 className="text-xl font-bold tracking-wider">JahitKu</h1>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[2px] text-gray-300">Login Sebagai</p>
          <p className="mt-2 text-sm font-semibold text-white">{user?.nama ?? "Pengguna"}</p>
          <p className="text-xs text-gray-300">{user?.email ?? "-"}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="mb-4 px-2 text-[10px] font-bold uppercase tracking-[2px] text-gray-400">
          Menu Utama
        </p>

        {menuItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                pathname === item.path
                  ? "border border-white/20 bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.nama}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isSubmitting}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition-all hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>🚪</span>
          {isSubmitting ? "Keluar..." : "Keluar"}
        </button>
      </div>
    </aside>
  );
}
