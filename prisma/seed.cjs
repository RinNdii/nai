const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const seedUsers = [
  {
    email: "pelanggan@jahitku.com",
    password: "pelanggan123",
    nama: "Naila Putri",
    role: "pelanggan",
  },
  {
    email: "admin@jahitku.com",
    password: "admin123",
    nama: "Admin JahitKu",
    role: "admin",
  },
  {
    email: "penjahit@jahitku.com",
    password: "penjahit123",
    nama: "Aku Tailor",
    role: "penjahit",
  },
];

const seedLayanan = [
  {
    nama: "Jahit Kebaya",
    deskripsi: "Jahit kebaya modern maupun tradisional",
    harga: 450000,
    icon: "👗",
  },
  {
    nama: "Jahit Seragam",
    deskripsi: "Seragam sekolah, kantor, komunitas, dan lainnya",
    harga: 350000,
    icon: "👔",
  },
  {
    nama: "Jahit Pakaian Pria",
    deskripsi: "Kemeja, jas, celana, dan kebutuhan busana pria",
    harga: 400000,
    icon: "🧥",
  },
  {
    nama: "Jahit Dress",
    deskripsi: "Dress pesta, casual, maupun formal",
    harga: 500000,
    icon: "💃",
  },
  {
    nama: "Permak Pakaian",
    deskripsi: "Mengecilkan, memotong, atau memperbaiki jahitan",
    harga: 150000,
    icon: "✂️",
  },
  {
    nama: "Lainnya",
    deskripsi: "Layanan jahit lain sesuai kebutuhan pelanggan",
    harga: 250000,
    icon: "🧵",
  },
];

const seedOrders = [
  {
    kode: "JHT-1001",
    layanan: "Jahit Kebaya",
    harga: 450000,
    deskripsi: "Kebaya modern warna krem dengan furing halus",
    metodePembayaran: "Bank BCA",
    lingkarDada: 88,
    lebarBahu: 38,
    lingkarPinggang: 72,
    lingkarPanggul: 94,
    panjangLengan: 55,
    tinggiBadan: 162,
    status: "Diproses",
    tanggalAmbil: new Date("2026-05-20T09:00:00.000Z"),
    pelangganEmail: "pelanggan@jahitku.com",
    penjahitEmail: "penjahit@jahitku.com",
  },
];

async function main() {
  await prisma.session.deleteMany();
  await prisma.pesanan.deleteMany();
  await prisma.layanan.deleteMany();
  await prisma.user.deleteMany();

  for (const user of seedUsers) {
    await prisma.user.create({ data: user });
  }

  for (const layanan of seedLayanan) {
    await prisma.layanan.create({ data: layanan });
  }

  for (const order of seedOrders) {
    const pelanggan = await prisma.user.findUnique({
      where: { email: order.pelangganEmail },
    });
    const penjahit = await prisma.user.findUnique({
      where: { email: order.penjahitEmail },
    });
    const layanan = await prisma.layanan.findUnique({
      where: { nama: order.layanan },
    });

    await prisma.pesanan.create({
      data: {
        kode: order.kode,
        layanan: order.layanan,
        harga: order.harga,
        deskripsi: order.deskripsi,
        metodePembayaran: order.metodePembayaran,
        lingkarDada: order.lingkarDada,
        lebarBahu: order.lebarBahu,
        lingkarPinggang: order.lingkarPinggang,
        lingkarPanggul: order.lingkarPanggul,
        panjangLengan: order.panjangLengan,
        tinggiBadan: order.tinggiBadan,
        status: order.status,
        tanggalAmbil: order.tanggalAmbil,
        pelangganId: pelanggan.id,
        layananId: layanan?.id ?? null,
        penjahitId: penjahit ? penjahit.id : null,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
