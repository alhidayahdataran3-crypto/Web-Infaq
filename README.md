# 🕌 Sistem Informasi Infaq & Pengelolaan Keuangan Masjid Al-Hidayah

Website ini adalah platform digital untuk transparansi pengelolaan keuangan, donasi infaq, dan pelaporan pengeluaran Masjid Al-Hidayah. Proyek ini dikembangkan dan diserahterimakan oleh **Tim KKN Masjid Al-Hidayah (2026)** untuk dapat dikelola secara mandiri oleh pihak Takmir.

---

## 🚀 Akses Cepat (Quick Access)

- **Halaman Publik**: [masjidalhidayah.minggir.site](https://masjidalhidayah.minggir.site)
- **Halaman Admin**: [masjidalhidayah.minggir.site/admin](https://masjidalhidayah.minggir.site/admin)
- **Email Pengelola**: `alhidayah.dataran3@gmail.com`

---

## 🛠️ Panduan Operasional Takmir

### 1. Masuk ke Panel Admin
1. Buka halaman `/admin`.
2. Klik **"Login with Google"**.
3. Gunakan akun email pusat masjid (`alhidayah.dataran3@gmail.com`).

### 2. Mengelola Donasi (Infaq)
- Donasi yang masuk melalui website akan berstatus **Pending**.
- Admin wajib memeriksa bukti transfer secara manual.
- Klik **"Terima (ACC)"** jika dana sudah masuk ke rekening masjid agar muncul di laporan publik.

### 3. Menginput Pengeluaran
- Setiap pengeluaran masjid harus diinput melalui menu **"Pengeluaran"**.
- Masukkan nominal, keterangan, dan foto nota jika ada.
- Sistem akan otomatis menghitung sisa saldo kas masjid di halaman depan.

---

## 🔋 Pemeliharaan Teknis (Maintenance)

Website ini dirancang untuk berjalan dengan biaya operasional minimal (hanya biaya domain tahunan).

### ⚡ Pemulihan Database (Supabase)
Jika website tidak diakses selama 1-2 minggu, database mungkin akan memasuki mode "Pause" (Tidur).
- **Gejala**: Muncul pesan error "Database connection unavailable".
- **Solusi**: Login ke [Supabase](https://supabase.com), pilih proyek, dan klik **"Restore Project"**.

### 🌐 Perpanjangan Domain
- **Tempat**: Hostinger
- **Jadwal**: 1 tahun sekali (cek email notifikasi dari Hostinger).
- **PENTING**: Pastikan domain `minggir.site` selalu diperpanjang tepat waktu.

### 🏗️ Infrastruktur (Teknologi)
- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **DNS/Security**: Cloudflare

---

## 🛡️ Hak Cipta & Serah Terima
Seluruh kode sumber dan aset digital ini telah diserahkan sepenuhnya kepada Takmir Masjid Al-Hidayah. Tim KKN berharap sistem ini dapat membantu meningkatkan kepercayaan jamaah melalui transparansi keuangan digital.

*Salam Takzim,*  
**Tim KKN Masjid Al-Hidayah (2025)**
