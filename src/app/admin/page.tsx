import prisma from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import AdminDonationTable from "@/components/AdminDonationTable";
import MonthNavigation from "@/components/MonthNavigation";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const resolvedParams = await searchParams;
    const now = new Date();
    const currentMonth = resolvedParams.month ? parseInt(resolvedParams.month as string) : now.getMonth();
    const currentYear = resolvedParams.year ? parseInt(resolvedParams.year as string) : now.getFullYear();

    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

    let donations: any[] = [];
    let totalAllTime = 0;

    try {
        // Fetch donations for the selected month
        donations = await prisma.donation.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Fetch cumulative total (All time)
        const allTimeAcc = await prisma.donation.aggregate({
            where: { status: "ACC" },
            _sum: { nominal: true },
        });
        totalAllTime = allTimeAcc._sum.nominal || 0;

    } catch (error) {
        console.warn("Database connection unavailable at build time, skipping fetch for Admin Page.");
    }

    const pendingCount = donations.filter((d) => d.status === "PENDING").length;
    const accCount = donations.filter((d) => d.status === "ACC").length;
    const invalidCount = donations.filter((d) => d.status === "INVALID").length;

    const totalThisMonth = donations
        .filter((d) => d.status === "ACC")
        .reduce((sum, d) => sum + d.nominal, 0);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Infaq Masuk</h1>
            </div>

            {/* Month Navigation */}
            <MonthNavigation currentMonth={currentMonth} currentYear={currentYear} />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-500">
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        Menunggu Verifikasi ({currentMonth + 1}/{currentYear})
                    </p>
                    <h2 className="text-3xl font-bold text-gray-800">{pendingCount}</h2>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-[#409DA1]">
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        Diterima ({currentMonth + 1}/{currentYear})
                    </p>
                    <h2 className="text-3xl font-bold text-gray-800">{accCount}</h2>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-red-500">
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        Tidak Valid ({currentMonth + 1}/{currentYear})
                    </p>
                    <h2 className="text-3xl font-bold text-gray-800">{invalidCount}</h2>
                </div>
            </div>

            {/* Total Nominal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-[#409DA1] to-[#2c777a] p-6 rounded-2xl shadow-md text-white">
                    <p className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-80">
                        Total Infaq Diterima (Keseluruhan)
                    </p>
                    <h2 className="text-4xl font-extrabold">{formatCurrency(totalAllTime)}</h2>
                </div>
                <div className="bg-gradient-to-r from-[#2c777a] to-[#1b4a4c] p-6 rounded-2xl shadow-md text-white">
                    <p className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-80">
                        Total Infaq Diterima (Bulan Ini)
                    </p>
                    <h2 className="text-4xl font-extrabold">{formatCurrency(totalThisMonth)}</h2>
                </div>
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Daftar Konfirmasi Pembayaran</h2>
                </div>

                <AdminDonationTable initialDonations={donations} />
            </div>
        </div>
    );
}
