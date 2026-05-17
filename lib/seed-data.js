import { ORDER_STATUS, ROLES } from "./constants.js";

export const seedUsers = [
  {
    email: "pelanggan@jahitku.test",
    password: "pelanggan123",
    nama: "Naila Putri",
    role: ROLES.PELANGGAN,
  },
  {
    email: "admin@jahitku.test",
    password: "admin123",
    nama: "Admin JahitKu",
    role: ROLES.ADMIN,
  },
  {
    email: "penjahit@jahitku.test",
    password: "penjahit123",
    nama: "Rizky Tailor",
    role: ROLES.PENJAHIT,
  },
];

export const seedLayanan = [
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

export const seedOrders = [
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
    status: ORDER_STATUS.DIPROSES,
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
    status: ORDER_STATUS.MENUNGGU,
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
    status: ORDER_STATUS.SELESAI,
    tanggalAmbil: new Date("2026-05-14T09:00:00.000Z"),
    pelangganEmail: "pelanggan@jahitku.test",
    penjahitEmail: "penjahit@jahitku.test",
  },
];
