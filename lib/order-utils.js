export function generateOrderCode() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `JHT-${random}`;
}

export function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount ?? 0);
}

export function buildRevenueChartData(orders, maxItems = 6) {
  const revenueByMonth = new Map();

  for (const order of orders) {
    const dateValue = order.tanggalAmbil ?? order.createdAt;
    const date = new Date(dateValue);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    revenueByMonth.set(
      key,
      (revenueByMonth.get(key) ?? 0) + (order.harga ?? 0),
    );
  }

  return Array.from(revenueByMonth.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .slice(-maxItems)
    .map(([key, value]) => {
      const [year, month] = key.split("-");
      const date = new Date(Number(year), Number(month) - 1, 1);

      return {
        label: date.toLocaleDateString("id-ID", {
          month: "short",
          year: "numeric",
        }),
        value,
      };
    });
}

export function serializeOrder(order) {
  return {
    ...order,
    createdAt: order.createdAt?.toISOString?.() ?? order.createdAt,
    updatedAt: order.updatedAt?.toISOString?.() ?? order.updatedAt,
    tanggalAmbil: order.tanggalAmbil?.toISOString?.() ?? order.tanggalAmbil,
    pelanggan: order.pelanggan
      ? {
          id: order.pelanggan.id,
          nama: order.pelanggan.nama,
          email: order.pelanggan.email,
        }
      : null,
    penjahit: order.penjahit
      ? {
          id: order.penjahit.id,
          nama: order.penjahit.nama,
          email: order.penjahit.email,
        }
      : null,
  };
}
