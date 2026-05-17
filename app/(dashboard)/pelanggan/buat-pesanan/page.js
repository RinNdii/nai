import BuatPesananForm from "@/components/buat-pesanan-form";
import { requireUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function BuatPesananPage({ searchParams }) {
  const user = await requireUser("pelanggan");
  const params = await searchParams;
  const layananList = await prisma.layanan.findMany({
    where: { aktif: true },
    orderBy: { nama: "asc" },
  });

  return (
    <BuatPesananForm
      user={user}
      initialLayananId={params?.layananId}
      layananOptions={layananList}
    />
  );
}
