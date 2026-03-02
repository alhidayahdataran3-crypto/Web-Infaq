import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans text-gray-800">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
                <Link href="/" className="inline-flex items-center gap-2 text-[#409DA1] hover:text-[#327e81] font-medium mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
                </Link>

                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-[#1b4344]">Syarat dan Ketentuan (Terms of Service)</h1>

                <div className="space-y-6 leading-relaxed">
                    <p>
                        Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-[#409DA1]">1. Penerimaan Syarat</h2>
                        <p>
                            Dengan mengakses dan menggunakan website donasi Masjid Al-Hidayah, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui bagian mana pun dari syarat ini, mohon untuk tidak menggunakan layanan kami.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-[#409DA1]">2. Penggunaan Layanan</h2>
                        <p>
                            Website ini disediakan untuk memfasilitasi pengumpulan infaq, sedekah, dan donasi jamaah untuk operasional serta kemakmuran Masjid Al-Hidayah. Anda setuju untuk menyajikan informasi yang akurat, terutama terkait bukti transfer donasi.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-[#409DA1]">3. Proses Donasi dan Verifikasi</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Setiap donasi yang disubmit melalui formulir website berstatus <em>Pending</em> (Menunggu Verifikasi).</li>
                            <li>Admin/Pengurus berhak untuk menyetujui (ACC) atau menolak donasi berdasarkan validitas bukti transfer.</li>
                            <li>Donasi akan tercatat secara publik di daftar "Donatur Terbaru" hanya setelah diverifikasi oleh Admin.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-[#409DA1]">4. Kebijakan Pengembalian Dana (Refund)</h2>
                        <p>
                            Infaq dan sedekah yang telah diverifikasi dan masuk ke rekening Kas Masjid Al-Hidayah tidak dapat dikembalikan atau dibatalkan, kecuali terdapat kekeliruan nominal yang dapat dibuktikan secara sah dengan persetujuan Takmir Masjid.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-[#409DA1]">5. Perubahan Syarat</h2>
                        <p>
                            Takmir Masjid Al-Hidayah berhak untuk mengubah Syarat dan Ketentuan ini kapan saja. Perubahan akan berlaku segera setelah dipublikasikan di halaman ini.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-[#409DA1]">6. Hubungi Kami</h2>
                        <p>
                            Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami melalui surel di <strong>alhidayah.dataran3@gmail.com</strong>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
