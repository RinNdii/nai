"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function PesananPelanggan() {
  const [pesanan, setPesanan] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadPage = async () => {
      const [userResponse, pesananResponse] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/pesanan"),
      ]);

      if (!userResponse.ok || !pesananResponse.ok) {
        router.push("/login");
        return;
      }

      const userData = await userResponse.json();
      const pesananData = await pesananResponse.json();

      setUser(userData.user);
      setPesanan(pesananData);
      setIsLoading(false);
    };

    loadPage();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Pesanan Saya</h1>
          <p className="text-gray-500">Pantau status jahitan kamu di sini</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-bold text-gray-600">
                  Kode
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">
                  Layanan
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">
                  Tanggal Pesan
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    Memuat data pesanan...
                  </td>
                </tr>
              ) : pesanan.length > 0 ? (
                pesanan.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-[#4a3728]">
                      {item.kode}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">{item.layanan}</p>
                      <p className="text-xs text-gray-400">
                        {item.deskripsi || "Tidak ada deskripsi"}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.tanggalAmbil).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          item.status === "Selesai"
                            ? "bg-green-100 text-green-600"
                            : item.status === "Diproses"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-xs text-gray-500">
                        {item.penjahit?.nama
                          ? `Penjahit: ${item.penjahit.nama}`
                          : "Menunggu penjahit"}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    Belum ada pesanan nih. Yuk mulai pesan jahitan!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
