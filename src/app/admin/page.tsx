import prisma from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import AdminDonationTable from "@/components/AdminDonationTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    let donations: any[] = [];
    try {
        donations = await prisma.donation.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.warn("Database connection unavailable at build time, skipping fetch for Admin Page.");
    }

    const pendingCount = donations.filter(d => d.status === "PENDING").length;
    const accCount = donations.filter(d => d.status === "ACC").length;
    const invalidCount = donations.filter(d => d.status === "INVALID").length;

    const accDonations = donations.filter(d => d.status === "ACC");
    const totalAllTime = accDonations.reduce((sum, d) => sum + d.nominal, 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const totalThisMonth = accDonations
        .filter(d => new Date(d.createdAt).getMonth() === currentMonth && new Date(d.createdAt).getFullYear() === currentYear)
        .reduce((sum, d) => sum + d.nominal, 0);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Infaq Masuk</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-500">
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Menunggu Verifikasi</p>
                    <h2 className="text-3xl font-bold text-gray-800">{pendingCount}</h2>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-[#409DA1]">
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Diterima (ACC)</p>
                    <h2 className="text-3xl font-bold text-gray-800">{accCount}</h2>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-red-500">
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Tidak Valid</p>
                    <h2 className="text-3xl font-bold text-gray-800">{invalidCount}</h2>
                </div>
            </div>

            {/* Total Nominal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-[#409DA1] to-[#2c777a] p-6 rounded-2xl shadow-md text-white">
                    <p className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-80">Total Infaq Diterima (Keseluruhan)</p>
                    <h2 className="text-4xl font-extrabold">{formatCurrency(totalAllTime)}</h2>
                </div>
                <div className="bg-gradient-to-r from-[#2c777a] to-[#1b4a4c] p-6 rounded-2xl shadow-md text-white">
                    <p className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-80">Total Infaq Diterima (Bulan Ini)</p>
                    <h2 className="text-4xl font-extrabold">{formatCurrency(totalThisMonth)}</h2>
                </div>
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Daftar Konfirmasi Pembayaran</h2>
                </div>

                {/* We use a Client Component for interactive actions (ACC, INVALID, Edit) */}
                <AdminDonationTable initialDonations={donations} />
            </div>
        </div>
    );
}
