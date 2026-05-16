export function generateOrderCode() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `JHT-${random}`;
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
