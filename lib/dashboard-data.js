import { ORDER_STATUS } from "@/lib/constants";
import { buildRevenueChartData } from "@/lib/order-utils";
import prisma from "@/lib/prisma";

export async function getAdminDashboardData() {
  const [pesananMasuk, layananList] = await Promise.all([
    prisma.pesanan.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        pelanggan: true,
        penjahit: true,
      },
    }),
    prisma.layanan.findMany({
      orderBy: [{ aktif: "desc" }, { nama: "asc" }],
    }),
  ]);

  const perluDiprosesList = pesananMasuk.filter(
    (item) => item.status !== ORDER_STATUS.SELESAI,
  );
  const pesananSelesai = pesananMasuk.filter(
    (item) => item.status === ORDER_STATUS.SELESAI,
  );
  const totalPendapatan = pesananSelesai.reduce(
    (total, item) => total + item.harga,
    0,
  );

  return {
    pesananMasuk,
    layananList,
    perluDiprosesList,
    pesananSelesai,
    totalPendapatan,
    revenueChartData: buildRevenueChartData(pesananSelesai),
  };
}

export async function getPenjahitDashboardData(userId) {
  const [daftarTugas, pesananSaya] = await Promise.all([
    prisma.pesanan.findMany({
      where: {
        OR: [{ penjahitId: userId }, { penjahitId: null }],
      },
      orderBy: { tanggalAmbil: "asc" },
      include: {
        pelanggan: true,
        penjahit: true,
      },
    }),
    prisma.pesanan.findMany({
      where: {
        penjahitId: userId,
      },
      orderBy: { tanggalAmbil: "asc" },
      include: {
        pelanggan: true,
        penjahit: true,
      },
    }),
  ]);

  const pesananSelesai = pesananSaya.filter(
    (item) => item.status === ORDER_STATUS.SELESAI,
  );
  const perluDikerjakan = daftarTugas.filter(
    (item) => item.status !== ORDER_STATUS.SELESAI,
  );
  const totalPendapatan = pesananSelesai.reduce(
    (total, item) => total + item.harga,
    0,
  );

  return {
    daftarTugas,
    pesananSaya,
    pesananSelesai,
    perluDikerjakan,
    totalPendapatan,
    revenueChartData: buildRevenueChartData(pesananSelesai),
  };
}
