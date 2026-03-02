import { Building2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Privacy Policy - Web Infaq Masjid",
    description: "Kebijakan Privasi aplikasi Web Infaq Masjid",
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-3xl w-full border-t-4 border-[#409DA1]">
                <div className="flex items-center gap-4 mb-8 border-b pb-6">
                    <Building2 className="w-10 h-10 text-[#409DA1]" />
                    <h1 className="text-3xl font-bold text-gray-800">Kebijakan Privasi</h1>
                </div>

                <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
                    <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">1. Pendahuluan</h2>
                    <p>
                        Kebijakan Privasi ini menjelaskan bagaimana informasi Anda dikumpulkan, digunakan, dan diungkapkan oleh Web Infaq Masjid.
                        Privasi Anda penting bagi kami, dan kami berkomitmen untuk melindungi informasi pribadi Anda.
                    </p>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">2. Informasi yang Kami Kumpulkan</h2>
                    <p>
                        Ketika Anda menggunakan fitur Login (khusus Pengurus Masjid) atau memberikan infaq:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Data Login:</strong> Jika Anda menggunakan Google Sign-In, kami menerima informasi profil publik dasar seperti alamat email dan nama Anda untuk memverifikasi akses admin.</li>
                        <li><strong>Data Transaksi:</strong> Informasi terkait nominal donasi, nama donatur (opsional), dan bukti transfer.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">3. Penggunaan Informasi</h2>
                    <p>
                        Informasi Anda digunakan semata-mata untuk:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Mencatat bukti donasi secara transparan.</li>
                        <li>Memverifikasi akses pengurus masjid ke sistem dashboard admin.</li>
                        <li>Menampilkan nama donatur di halaman utama (jika diizinkan).</li>
                    </ul>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">4. Keamanan Data</h2>
                    <p>
                        Kami menerapkan langkah-langkah keamanan untuk melindungi data Anda. Namun, tidak ada pengiriman data melalui internet yang 100% aman. Kami terus berupaya yang terbaik untuk menjaga informasi Anda.
                    </p>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">5. Hubungi Kami</h2>
                    <p>
                        Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, hubungi pengurus Masjid Al-Hidayah secara langsung.
                    </p>
                </div>

                <div className="mt-10 text-center">
                    <Link href="/" className="text-[#409DA1] hover:underline font-semibold">
                        &larr; Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
