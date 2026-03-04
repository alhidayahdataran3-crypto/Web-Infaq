import prisma from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import AdminDonationTable from "@/components/AdminDonationTable";
import MonthNavigation from "@/components/MonthNavigation";
import AdminOverviewChart from "@/components/AdminOverviewChart";
import AdminActions from "@/components/AdminActions";

import Link from "next/link";

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

    const yearStart = new Date(currentYear, 0, 1);
    const yearEnd = new Date(currentYear, 11, 31, 23, 59, 59);

    let donations: any[] = [];
    let expenses: any[] = [];
    let yearlyDonations: any[] = [];
    let yearlyExpenses: any[] = [];
    let totalAllTime = 0;

    try {
        // Fetch donations for the selected month (for stats cards)
        donations = await prisma.donation.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Fetch donations for the whole year (for chart)
        yearlyDonations = await prisma.donation.findMany({
            where: {
                createdAt: { gte: yearStart, lte: yearEnd },
                status: "ACC"
            }
        });

        // Fetch expenses for the whole year (for chart & stats)
        yearlyExpenses = await prisma.expense.findMany({
            where: {
                createdAt: { gte: yearStart, lte: yearEnd },
            },
        });

        expenses = yearlyExpenses.filter(e =>
            e.createdAt >= startDate && e.createdAt <= endDate
        );

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

    const totalIncomeMonth = donations
        .filter((d) => d.status === "ACC")
        .reduce((sum, d) => sum + d.nominal, 0);

    const totalExpenseMonth = expenses.reduce((sum, e) => sum + (e.price * (e.amount || 1)), 0);

    const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const monthNamesLong = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const monthName = monthNamesLong[currentMonth];

    // Yearly Chart Data (12 months)
    const chartData = monthNamesShort.map((name, index) => {
        const income = yearlyDonations
            .filter(d => new Date(d.createdAt).getMonth() === index)
            .reduce((sum, d) => sum + d.nominal, 0);

        const expense = yearlyExpenses
            .filter(e => new Date(e.createdAt).getMonth() === index)
            .reduce((sum, e) => sum + (e.price * (e.amount || 1)), 0);

        return { name, pemasukan: income, pengeluaran: expense };
    });

    // WA Share Text
    const shareText = `*Laporan Kas Masjid Al-Hidayah*\nBulan: ${monthName} ${currentYear}\n\n- Infaq Masuk: ${formatCurrency(totalIncomeMonth)}\n- Pengeluaran: ${formatCurrency(totalExpenseMonth)}\n- Saldo Bulan Ini: ${formatCurrency(totalIncomeMonth - totalExpenseMonth)}\n\n_Update otomatis dari Website Infaq._`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Infaq Masuk</h1>

                <AdminActions waUrl={waUrl} />
            </div>

            {/* Top Chart Section */}
            <div className="mb-8">
                <AdminOverviewChart data={chartData} />
            </div>

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
                    <h2 className="text-4xl font-extrabold">{formatCurrency(totalIncomeMonth)}</h2>
                </div>
            </div>

            <AdminDonationTable
                initialDonations={donations}
                currentMonth={currentMonth}
                currentYear={currentYear}
            />
        </div>
    );
}
