"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState("pelanggan");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const inputClassName =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-[#4a3728]";

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login gagal. Silakan coba lagi.");
        return;
      }

      router.push(`/${data.user.role}`);
      router.refresh();
    } catch {
      setError("Terjadi gangguan saat login. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="text-2xl">✂️</span>
            <h1 className="text-2xl font-bold text-[#4a3728]">JahitKu</h1>
          </div>
          <p className="text-sm text-gray-600">
            Selamat Datang! Silakan login untuk melanjutkan
          </p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button
            type="button"
            onClick={() => setRole("pelanggan")}
            className={`flex flex-col items-center gap-2 rounded-lg border p-3 text-xs transition-all ${role === "pelanggan" ? "border-[#4a3728] bg-orange-50 text-[#4a3728]" : "border-gray-200 text-gray-700"}`}
          >
            <span className="text-xl">👤</span> Pelanggan
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex flex-col items-center gap-2 rounded-lg border p-3 text-xs transition-all ${role === "admin" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-700"}`}
          >
            <span className="text-xl">🛡️</span> Admin
          </button>
          <button
            type="button"
            onClick={() => setRole("penjahit")}
            className={`flex flex-col items-center gap-2 rounded-lg border p-3 text-xs transition-all ${role === "penjahit" ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 text-gray-700"}`}
          >
            <span className="text-xl">🧵</span> Penjahit
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              className={inputClassName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className={inputClassName}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#4a3728]"
              />{" "}
              Ingat saya
            </label>
            <a href="#" className="font-medium text-gray-600 hover:underline">
              Lupa password?
            </a>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#4a3728] text-white rounded-lg font-semibold hover:bg-[#3d2d21] transition-colors mt-4 shadow-md active:scale-95"
          >
            {isSubmitting
              ? "Memproses..."
              : `Login sebagai ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </button>
        </form>

        {role === "pelanggan" && (
          <p className="mt-6 text-center text-sm text-gray-600">
            Belum punya akun pelanggan?{" "}
            <Link
              href="/register"
              className="font-bold text-[#4a3728] hover:underline"
            >
              Daftar di sini
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
