<<<<<<< HEAD
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
=======
# 🕌 Panduan Pengelolaan Website Infaq Masjid Al-Hidayah

Dokumen ini berisi informasi krusial untuk mengelola website setelah penarikan mahasiswa KKN. Pastikan dokumen ini tersimpan aman di tangan takmir masjid.

---

## 📧 Akun Utama Website
Semua layanan (GitHub, Vercel, Supabase, Cloudflare) wajib menggunakan atau ditautkan ke email pusat masjid:
- **Email Utama**: `alhidayah.dataran3@gmail.com`
- **Tujuan**: Memudahkan proses *reset password* dan pengelolaan jika pengurus berganti.

---

## 🏗️ Struktur Layanan (Infrastruktur)

### 1. Hostinger (Pembelian Domain)
- **Fungsi**: Tempat membayar tagihan domain `minggir.site` setiap tahun.
- **Biaya**: Sekitar Rp 150rb - 200rb (akan ditagih 1 tahun dari sekarang).
- **Aksi**: Jangan ubah pengaturan "Nameservers" di sini karena sudah diarahkan ke Cloudflare.

### 2. Cloudflare (DNS & Subdomain)
- **Fungsi**: Menghubungkan domain `minggir.site` ke server website.
- **Subdomain**: `masjidalhidayah.minggir.site` diatur di sini lewat record `CNAME`.

### 3. Vercel (Server Website)
- **Fungsi**: Server tempat program website berjalan 24 jam.
- **Otomatisasi**: Setiap kali ada update kode di GitHub, Vercel akan otomatis memperbarui tampilan website.
- **Troubleshooting**: Jika web tiba-tiba error, masuk ke dashboard Vercel dan lakukan **Redeploy**.

### 4. Supabase (Data Keuangan & Foto)
- **Fungsi**: Menyimpan data donatur, nominal infaq, dan foto bukti transfer.
- **PENTING**: Jika website tidak dikunjungi selama 1-2 minggu, Supabase versi gratis akan otomatis "Pause" (Tidur). 
  - **Efek**: Web akan muncul error "Database connection unavailable".
  - **Solusi**: Login ke Supabase dengan email di atas, lalu klik **"Restore Project"**.

---

## 🔐 Cara Login Admin
1. Buka alamat: `https://masjidalhidayah.minggir.site/admin`
2. Klik tombol **Login with Google**.
3. Pilih akun email `alhidayah.dataran3@gmail.com`.
4. Anda akan masuk ke Dashboard untuk mengelola Donasi dan Pengeluaran.

---

## 💾 Pengelolaan Data
- **Update Pengeluaran**: Pengurus wajib menginput setiap pengeluaran masjid di menu **"Pengeluaran"** agar saldo yang tampil di halaman depan akurat.
- **Konfirmasi Donasi**: Donasi yang masuk berstatus **Pending**. Admin harus mengecek bukti transfer terlebih dahulu sebelum klik tombol **"Terima (ACC)"**.

---

## 🏁 Penutup
Website ini sudah dirancang menggunakan layanan **Free Tier** (Gratis) untuk menghemat biaya operasional masjid. Satu-satunya biaya rutin hanya perpanjangan domain setiap 1 tahun sekali.

---
*Salam Perjuangan, Tim KKN - Masjid Al-Hidayah (2026)*
>>>>>>> 19f02387501ae009a060874bf35e2f4c4d91de54
