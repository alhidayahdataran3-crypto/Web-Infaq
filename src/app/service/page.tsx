import { Building2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Terms of Service - Web Infaq Masjid",
    description: "Syarat dan Ketentuan aplikasi Web Infaq Masjid",
};

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-3xl w-full border-t-4 border-[#409DA1]">
                <div className="flex items-center gap-4 mb-8 border-b pb-6">
                    <Building2 className="w-10 h-10 text-[#409DA1]" />
                    <h1 className="text-3xl font-bold text-gray-800">Syarat dan Ketentuan Layanan</h1>
                </div>

                <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
                    <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">1. Kesepakatan Syarat</h2>
                    <p>
                        Dengan mengakses situs Web Infaq Masjid, Anda setuju untuk terikat oleh Syarat dan Ketentuan Layanan ini. Jika Anda tidak setuju dengan ketentuan apa pun, Anda dilarang menggunakan atau mengakses situs ini.
                    </p>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">2. Penggunaan Layanan</h2>
                    <p>
                        Platform ini disediakan untuk memudahkan penerimaan infaq dan shodaqoh secara online untuk Masjid Al-Hidayah.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Semua donasi yang disalurkan adalah bersifat sukarela.</li>
                        <li>Donatur bertanggung jawab atas kebenaran informasi dan bukti transfer yang diunggah.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">3. Akun Admin (Pengurus)</h2>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Akses admin hanya diberikan kepada email terkait pengurus Masjid.</li>
                        <li>Pengurus setuju untuk menjaga kerahasiaan data akses mereka dan bertanggung jawab atas semua aktivitas log yang ada di bawah akun mereka.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">4. Batasan Tanggung Jawab</h2>
                    <p>
                        Dalam keadaan apapun Masjid Al-Hidayah atau pengembang web tidak bertanggung jawab ataskerugian yang timbul dari pengunaan atau ketidakmampuan menggunakan fitur aplikasi situs ini.
                    </p>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">5. Perubahan Syarat</h2>
                    <p>
                        Masjid Al-Hidayah dapat merevisi persyaratan layanan situs web ini secara berkala tanpa pemberitahuan.
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
