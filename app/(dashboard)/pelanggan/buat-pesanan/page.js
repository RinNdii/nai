import BuatPesananForm from "@/components/buat-pesanan-form";
import { requireUser } from "@/lib/auth";

export default async function BuatPesananPage({ searchParams }) {
  const user = await requireUser("pelanggan");
  const params = await searchParams;

  return <BuatPesananForm user={user} initialLayanan={params?.layanan} />;
}
