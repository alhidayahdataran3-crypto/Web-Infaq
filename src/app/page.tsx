import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { DonationForm } from "@/components/DonationForm";
import { formatCurrency, formatTimeAgo } from "@/lib/utils";
import { MapPin, Building2, Landmark, CheckCircle2, LogIn, Mail, Instagram, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  let totalAcc = 0;
  let donors: any[] = [];

  // ... (keep the rest the same until </main>)


  try {
    const accDonations = await prisma.donation.aggregate({
      where: { status: "ACC" },
      _sum: { nominal: true },
    });
    totalAcc = accDonations._sum.nominal || 0;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    donors = await prisma.donation.findMany({
      where: {
        status: "ACC",
        showName: true,
        createdAt: { gte: oneWeekAgo }
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, name: true, nominal: true, createdAt: true },
    });
  } catch (error) {
    console.warn("Database connection unavailable at build time, skipping fetch for Home Page.");
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="relative py-28 shadow-lg overflow-hidden flex items-center justify-center min-h-[450px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/masjid.png"
            alt="Background Masjid Al-Hidayah"
            fill
            className="object-cover"
            priority
          />
          {/* Overlays for better text readability */}
          <div className="absolute inset-0 bg-[#409DA1]/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b4344]/90 to-transparent"></div>
        </div>

        <Link href="/login" className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-xl transition-all text-sm border border-white/30">
          <LogIn className="w-4 h-4" /> Login Admin
        </Link>
        <div className="container mx-auto px-4 relative z-10 text-center text-white mt-8">
          <Image
            src="/logo-putih.png"
            alt="Logo Masjid Al-Hidayah"
            width={120}
            height={120}
            className="mx-auto mb-6 opacity-100 drop-shadow-lg"
            priority
          />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Masjid Al-Hidayah
          </h1>
          <a
            href="https://maps.app.goo.gl/UVYotj3WWAEZBWMPA?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg md:text-xl font-medium opacity-90 max-w-3xl mx-auto flex items-start md:items-center justify-center gap-3 hover:underline hover:opacity-100 transition-all drop-shadow-md"
          >
            <MapPin className="w-6 h-6 flex-shrink-0 mt-1 md:mt-0" />
            <span className="text-left md:text-center leading-relaxed">Jl. Daratan 3, Daratan III, Sendangagung, Kec. Minggir, Kab. Sleman, DIY 55562</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 relative z-20 max-w-6xl">

        {/* Total Infaq Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 text-center border-b-4 border-[#409DA1] transform transition hover:-translate-y-1">
          <p className="text-gray-500 font-semibold mb-2 uppercase tracking-wide">Total Infaq & Shadaqah Terkumpul</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#409DA1]">
            {formatCurrency(totalAcc)}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Payment Info */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#409DA1]/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Landmark className="text-[#409DA1] w-7 h-7" />
                Transfer Bank BPD
              </h3>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="text-gray-600 mb-1">Bank Pembangunan Daerah (BPD)</p>
                <p className="text-3xl font-mono font-bold tracking-wider text-gray-800 mb-2">051231000167</p>
                <p className="text-gray-600 font-semibold text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />a/n Masjid Al-Hidayah
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center w-full">Pembayaran via QRIS</h3>
              <div className="border-4 border-[#409DA1] rounded-2xl p-2 inline-block bg-white shadow-md">
                <Image
                  src="/QR.png"
                  alt="QRIS Masjid Al-Hidayah"
                  width={300}
                  height={300}
                  className="rounded-xl"
                  priority
                />
              </div>
              <p className="text-center text-gray-500 mt-4 text-sm font-medium">Scan QR code di atas menggunakan aplikasi e-wallet atau mobile banking Anda.</p>
            </div>
          </div>

          {/* Donation Form */}
          <div>
            <DonationForm />

            {/* Recent Donors List */}
            <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Donatur Terbaru</h3>
              {donors.length > 0 ? (
                <ul className="space-y-4">
                  {donors.map((donor) => (
                    <li key={donor.id} className="flex justify-between items-center group">
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-[#409DA1] transition-colors">{donor.name}</p>
                        <p className="text-xs text-gray-400">{formatTimeAgo(donor.createdAt)}</p>
                      </div>
                      <p className="font-bold text-[#409DA1] bg-[#409DA1]/10 px-3 py-1 rounded-lg">
                        {formatCurrency(donor.nominal)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-xl">Belum ada donatur yang dapat ditampilkan.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Location Map */}
      <section className="container mx-auto px-4 max-w-6xl mt-16 mb-0 relative z-20">
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 px-2">
            <MapPin className="text-[#409DA1] w-7 h-7" />
            Lokasi Masjid
          </h3>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden relative border border-gray-100/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212745.78287857032!2d110.41214273760617!3d-7.7785599745043355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7af6c16994e6c1%3A0x811a3584c07d774!2sMasjid%20Al-Hidayah!5e0!3m2!1sid!2sid!4v1772438376529!5m2!1sid!2sid"
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1b4344] text-white pt-16 pb-8 border-t-4 border-[#409DA1] mt-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 border-b border-white/10 pb-10 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo-putih.png" alt="Logo Masjid" width={40} height={40} className="drop-shadow-sm" />
                <h3 className="text-xl font-bold tracking-wide">Masjid Al-Hidayah</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Mari salurkan sedekah dan infaq terbaik Anda untuk operasional dan kemakmuran Masjid Al-Hidayah.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-[#409DA1]">Hubungi Kami</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:alhidayah.dataran3@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                    <div className="bg-white/10 p-2 rounded-lg group-hover:bg-[#409DA1] transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm">alhidayah.dataran3@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/6285725999115" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                    <div className="bg-white/10 p-2 rounded-lg group-hover:bg-green-500 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm">+62 857-2599-9115</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-[#409DA1]">Ikuti Kami</h4>
              <a href="https://www.instagram.com/alhdyh_official" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 rounded-2xl transition-all group shadow-sm">
                <div className="bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-medium">Instagram</span>
                  <span className="text-sm font-bold text-white group-hover:text-[#409DA1] transition-colors">@alhdyh_official</span>
                </div>
              </a>
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Takmir Masjid Al-Hidayah. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors cursor-pointer">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
