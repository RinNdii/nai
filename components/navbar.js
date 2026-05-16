"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isAuthenticated = Boolean(user);

  const privateMenuItems = [
    { name: "Beranda", path: "/pelanggan" },
    { name: "Buat Pesanan", path: "/pelanggan/buat-pesanan" },
    { name: "Pesanan Saya", path: "/pelanggan/pesanan" },
  ];
  const publicMenuItems = [
    { name: "Beranda", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Daftar", path: "/register" },
  ];
  const menuItems = isAuthenticated ? privateMenuItems : publicMenuItems;

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
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href={isAuthenticated ? "/pelanggan" : "/"}
          className="flex items-center gap-2"
        >
          <span className="text-2xl">✂️</span>
          <h1 className="text-xl font-bold tracking-tight text-[#4a3728]">
            JahitKu
          </h1>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-colors ${
                pathname === item.path
                  ? "font-bold text-[#4a3728]"
                  : "text-gray-500 hover:text-[#4a3728]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-bold text-gray-800">{user.nama}</p>
              <p className="text-[10px] text-gray-400">{user.email}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isSubmitting}
              className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Keluar..." : "Logout"}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-[#4a3728] px-4 py-2 text-sm font-semibold text-[#4a3728] transition-all hover:bg-[#f5e6d3]"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-[#4a3728] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#3d2d21]"
            >
              Daftar
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
