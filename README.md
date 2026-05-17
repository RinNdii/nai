# JahitKu

Aplikasi demo layanan jahit berbasis Next.js dengan tiga jenis pengguna:

- Pelanggan
- Admin
- Penjahit

## Cara menjalankan aplikasi

Pastikan komputer sudah memiliki **Node.js 20.9 atau lebih baru**.

1. Buka terminal atau CMD di folder proyek:

   ```bash
   cd c:\laragon6\www\nai
   ```

2. Install dependency jika belum pernah dijalankan:

   ```bash
   npm install
   ```

3. Siapkan database SQLite dan data demo Prisma:

   ```bash
   npm run db:setup
   ```

4. Jalankan development server:

   ```bash
   npm run dev
   ```

5. Buka aplikasi di browser:

   ```text
   http://localhost:3000/login
   ```

## Akun login demo

Gunakan role yang sesuai saat login.

| Role      | Email                    | Password       |
| --------- | ------------------------ | -------------- |
| Pelanggan | `pelanggan@jahitku.test` | `pelanggan123` |
| Admin     | `admin@jahitku.test`     | `admin123`     |
| Penjahit  | `penjahit@jahitku.test`  | `penjahit123`  |

## Catatan

- Backend menggunakan Route Handlers Next.js di folder `app/api`.
- Database menggunakan Prisma + SQLite di file `prisma/dev.db`.
- Jalankan `npm run db:setup` setiap kali ingin reset data demo ke kondisi awal.
- Halaman login akan menolak kombinasi email, password, dan role yang tidak cocok.
- Jika port `3000` sedang dipakai aplikasi lain, Next.js biasanya akan menawarkan port lain secara otomatis.
