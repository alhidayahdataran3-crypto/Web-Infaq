import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans text-gray-800">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
                <Link href="/" className="inline-flex items-center gap-2 text-[#409DA1] hover:text-[#327e81] font-medium mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
                </Link>

                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-[#1b4344]">Kebijakan Privasi (Privacy Policy)</h1>

                <div className="space-y-6 leading-relaxed">
                    <p>
                        Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-[#409DA1]">1. Informasi yang Kami Kumpulkan</h2>
                        <p>
                            Saat Anda menggunakan layanan donasi di website Masjid Al-Hidayah, kami mungkin meminta Anda untuk memberikan informasi pribadi tertentu, seperti:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Nama (kecuali jika Anda memilih berdonasi sebagai Hamba Allah)</li>
                            <li>Jumlah/Nominal Donasi</li>
                            <li>Bukti transfer (untuk keperluan verifikasi)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-[#409DA1]">2. Penggunaan Informasi</h2>
                        <p>
                            Informasi yang dikumpulkan hanya digunakan untuk keperluan pencatatan dan verifikasi donasi secara internal oleh Takmir Masjid Al-Hidayah. Transparansi laporan keuangan (seperti daftar donatur) ditayangkan di halaman utama tanpa menyertakan detail kontak Anda.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-[#409DA1]">3. Perlindungan Bukti Transaksi</h2>
                        <p>
                            Kami sangat menghargai privasi Anda. Harap diperhatikan bahwa:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Unggahan bukti transaksi Anda disimpan secara aman.</li>
                            <li>Bukti transfer Anda <strong>tidak akan</strong> dipublikasikan untuk umum.</li>
                            <li>Hanya tim pengurus/Admin yang memiliki wewenang untuk memeriksa validitas bukti transaksi.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-[#409DA1]">4. Keamanan Data</h2>
                        <p>
                            Kami mengambil langkah-langkah yang wajar guna memastikan bahwa informasi Anda dilindungi dari akses, penggunaan, atau pengungkapan tanpa izin.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-[#409DA1]">5. Hubungi Kami</h2>
                        <p>
                            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui surel di <strong>alhidayah.dataran3@gmail.com</strong>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
