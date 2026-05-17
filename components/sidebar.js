"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { ROLES } from "@/lib/constants";

const roleMenus = {
  [ROLES.ADMIN]: {
    primary: [{ nama: "Dashboard Admin", path: "/admin", icon: "📊" }],
    shortcut: [
      { nama: "Total Pesanan", path: "/admin/total-pesanan", icon: "🧾" },
      {
        nama: "Total Pendapatan",
        path: "/admin/total-pendapatan",
        icon: "💰",
      },
    ],
    management: [
      { nama: "Tambah Layanan", path: "/admin/tambah-layanan", icon: "➕" },
      { nama: "Lihat Layanan", path: "/admin/lihat-layanan", icon: "�" },
    ],
  },
  [ROLES.PENJAHIT]: {
    primary: [{ nama: "Ruang Kerja", path: "/penjahit", icon: "🧵" }],
    shortcut: [
      {
        nama: "Perlu Dikerjakan",
        path: "/penjahit/perlu-dikerjakan",
        icon: "📌",
      },
      {
        nama: "Pesanan Selesai",
        path: "/penjahit/pesanan-selesai",
        icon: "✅",
      },
      {
        nama: "Total Pendapatan",
        path: "/penjahit/total-pendapatan",
        icon: "💰",
      },
    ],
  },
};

export default function Sidebar({ role, color, user }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const menuGroups = roleMenus[role] ?? {};
  const primaryMenu = menuGroups.primary ?? [];
  const shortcutMenus = menuGroups.shortcut ?? [];
  const managementMenus = menuGroups.management ?? [];

  const isActiveMenu = (path) => pathname === path;

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
    <aside
      className={`sticky top-0 flex h-screen w-72 flex-col overflow-y-auto px-6 py-7 text-white shadow-xl ${color}`}
    >
      <div className="mb-8 px-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">✂️</span>
          <h1 className="text-xl font-bold tracking-wider">JahitKu</h1>
        </div>
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
          <p className="text-xs font-bold uppercase tracking-[2px] text-gray-300">
            Login Sebagai
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {user?.nama ?? "Pengguna"}
          </p>
          <p className="text-xs text-gray-300">{user?.email ?? "-"}</p>
        </div>
      </div>

      <nav className="space-y-7">
        <div>
          <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[2px] text-gray-400">
            Menu Utama
          </p>

          <div className="space-y-3">
            {primaryMenu.map((item) => (
              <Link key={item.path} href={item.path} className="block">
                <div
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all ${
                    isActiveMenu(item.path)
                      ? "border border-white/20 bg-white/10 text-white shadow-sm"
                      : "border border-transparent text-gray-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.nama}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {shortcutMenus.length > 0 ? (
          <div>
            <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[2px] text-gray-400">
              Shortcut Proses
            </p>

            <div className="space-y-3">
              {shortcutMenus.map((item) => (
                <Link key={item.path} href={item.path} className="block">
                  <div
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all ${
                      isActiveMenu(item.path)
                        ? "border border-white/20 bg-white/10 text-white shadow-sm"
                        : "border border-transparent bg-white/[0.03] text-gray-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm font-medium">{item.nama}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {managementMenus.length > 0 ? (
          <div>
            <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[2px] text-gray-400">
              Manajemen Layanan
            </p>

            <div className="space-y-3">
              {managementMenus.map((item) => (
                <Link key={item.path} href={item.path} className="block">
                  <div
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all ${
                      isActiveMenu(item.path)
                        ? "border border-white/20 bg-white/10 text-white shadow-sm"
                        : "border border-transparent bg-white/[0.03] text-gray-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm font-medium">{item.nama}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </nav>

      <div className="mt-7 border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isSubmitting}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-300 transition-all hover:bg-red-500/10 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>🚪</span>
          {isSubmitting ? "Keluar..." : "Keluar"}
        </button>
      </div>
    </aside>
  );
}
