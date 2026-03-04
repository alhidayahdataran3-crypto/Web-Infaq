import prisma from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";
import MonthNavigation from "@/components/MonthNavigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ExpensesPage({
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

    let expenses: any[] = [];
    let totalInfaqAllTime = 0;
    let totalExpenseAllTime = 0;

    let totalInfaqMonth = 0;
    let totalExpenseMonth = 0;

    try {
        // Fetch expenses for the selected month
        expenses = await prisma.expense.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                }
            },
            orderBy: { createdAt: "desc" },
        });

        // Totals for the selected month
        const monthlyInfaqAcc = await prisma.donation.aggregate({
            where: {
                status: "ACC",
                createdAt: { gte: startDate, lte: endDate }
            },
            _sum: { nominal: true },
        });
        totalInfaqMonth = monthlyInfaqAcc._sum.nominal || 0;
        totalExpenseMonth = expenses.reduce((sum, e) => sum + (e.amount * e.price), 0);

        // Cumulative Totals (All Time)
        const allTimeInfaqAcc = await prisma.donation.aggregate({
            where: { status: "ACC" },
            _sum: { nominal: true },
        });
        totalInfaqAllTime = allTimeInfaqAcc._sum.nominal || 0;

        // We'll fetch all expenses ever to get the absolute total all time.
        const allExpenses = await prisma.expense.findMany({ select: { amount: true, price: true } });
        totalExpenseAllTime = allExpenses.reduce((sum, e) => sum + (e.amount * e.price), 0);

    } catch (error) {
        console.warn("Database connection unavailable at build time, skipping fetch for Expenses Page.");
    }

    const sisaSaldoAllTime = totalInfaqAllTime - totalExpenseAllTime;
    const monthlyBalance = totalInfaqMonth - totalExpenseMonth;

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Pengeluaran Masjid</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Form Add Expense */}
                <div className="lg:col-span-1">
                    <ExpenseForm />
                </div>

                {/* Expenses List */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Monthly Stats */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-orange-400">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Pengeluaran Bulan Ini</p>
                            <h2 className="text-2xl font-bold text-gray-800">{formatCurrency(totalExpenseMonth)}</h2>
                            <p className="text-[10px] text-gray-400 mt-1">Infaq Masuk: {formatCurrency(totalInfaqMonth)}</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-[#409DA1]">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Saldo Kas (Kumulatif)</p>
                            <h2 className="text-2xl font-bold text-gray-800">{formatCurrency(sisaSaldoAllTime)}</h2>
                            <p className="text-[10px] text-gray-400 mt-1">Total Pengeluaran: {formatCurrency(totalExpenseAllTime)}</p>
                        </div>
                    </div>

                    <ExpenseTable
                        initialExpenses={JSON.parse(JSON.stringify(expenses))}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                    />
                </div>

            </div>
        </div>
    );
}
