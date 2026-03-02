import prisma from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";

export const dynamic = "force-dynamic";

export default async function ExpensesPage() {
    let expenses: any[] = [];
    let totalInfaq = 0;

    try {
        expenses = await prisma.expense.findMany({
            orderBy: { createdAt: "desc" },
        });

        const accDonations = await prisma.donation.aggregate({
            where: { status: "ACC" },
            _sum: { nominal: true },
        });
        totalInfaq = accDonations._sum.nominal || 0;
    } catch (error) {
        console.warn("Database connection unavailable at build time, skipping fetch for Expenses Page.");
    }

    const totalExpense = expenses.reduce((sum, e) => sum + (e.amount * e.price), 0);
    const sisaSaldo = totalInfaq - totalExpense;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Pengeluaran Masjid</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Form Add Expense */}
                <div className="lg:col-span-1">
                    <ExpenseForm />
                </div>

                {/* Expenses List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between border-l-4 border-l-orange-500">
                            <div>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Total Pengeluaran</p>
                                <h2 className="text-3xl font-bold text-gray-800">{formatCurrency(totalExpense)}</h2>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between border-l-4 border-l-[#409DA1]">
                            <div>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Sisa Saldo Kas</p>
                                <h2 className="text-3xl font-bold text-gray-800">{formatCurrency(sisaSaldo)}</h2>
                            </div>
                        </div>
                    </div>

                    <ExpenseTable initialExpenses={JSON.parse(JSON.stringify(expenses))} />
                </div>

            </div>
        </div>
    );
}
