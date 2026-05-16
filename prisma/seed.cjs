const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const seedUsers = [
  {
    email: "pelanggan@jahitku.test",
    password: "pelanggan123",
    nama: "Naila Putri",
    role: "pelanggan",
  },
  {
    email: "admin@jahitku.test",
    password: "admin123",
    nama: "Admin JahitKu",
    role: "admin",
  },
  {
    email: "penjahit@jahitku.test",
    password: "penjahit123",
    nama: "Aku Tailor",
    role: "penjahit",
  },
];

const seedOrders = [
  {
    kode: "JHT-1001",
    layanan: "Jahit Kebaya",
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
    pelangganEmail: "pelanggan@jahitku.test",
    penjahitEmail: "penjahit@jahitku.test",
  },
  {
    kode: "JHT-1002",
    layanan: "Jahit Seragam",
    deskripsi: "Seragam kerja wanita 2 stel, model formal",
    metodePembayaran: "Bank Mandiri",
    lingkarDada: 90,
    lebarBahu: 39,
    lingkarPinggang: 74,
    lingkarPanggul: 96,
    panjangLengan: 56,
    tinggiBadan: 160,
    status: "Menunggu",
    tanggalAmbil: new Date("2026-05-25T09:00:00.000Z"),
    pelangganEmail: "pelanggan@jahitku.test",
    penjahitEmail: "penjahit@jahitku.test",
  },
  {
    kode: "JHT-1003",
    layanan: "Jahit Dress",
    deskripsi: "Dress pesta satin navy dengan potongan A-line",
    metodePembayaran: "Dana",
    lingkarDada: 86,
    lebarBahu: 37,
    lingkarPinggang: 70,
    lingkarPanggul: 92,
    panjangLengan: 54,
    tinggiBadan: 161,
    status: "Selesai",
    tanggalAmbil: new Date("2026-05-14T09:00:00.000Z"),
    pelangganEmail: "pelanggan@jahitku.test",
    penjahitEmail: "penjahit@jahitku.test",
  },
];

async function main() {
  await prisma.session.deleteMany();
  await prisma.pesanan.deleteMany();
  await prisma.user.deleteMany();

  for (const user of seedUsers) {
    await prisma.user.create({ data: user });
  }

  for (const order of seedOrders) {
    const pelanggan = await prisma.user.findUnique({
      where: { email: order.pelangganEmail },
    });
    const penjahit = await prisma.user.findUnique({
      where: { email: order.penjahitEmail },
    });

    await prisma.pesanan.create({
      data: {
        kode: order.kode,
        layanan: order.layanan,
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
