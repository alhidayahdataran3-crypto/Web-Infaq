"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Eye, Edit, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { deleteExpense, editExpense } from "@/app/admin/actions";

interface Expense {
    id: number;
    name: string;
    type: string;
    amount: number;
    price: number;
    proofUrl: string | null;
    createdAt: Date;
}

export default function ExpenseTable({
    initialExpenses,
    currentMonth,
    currentYear
}: {
    initialExpenses: any[],
    currentMonth: number,
    currentYear: number
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [expenses, setExpenses] = useState(initialExpenses);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    // Sync state with props when server-side revalidation happens
    useEffect(() => {
        setExpenses(initialExpenses);
    }, [initialExpenses]);

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus data pengeluaran ini?")) return;

        setIsDeleting(id);
        const res = await deleteExpense(id);
        if (res.success) {
            setExpenses(expenses.filter(e => e.id !== id));
        } else {
            alert(res.error || "Gagal menghapus data");
        }
        setIsDeleting(null);
    };

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingExpense) return;

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const type = formData.get("type") as string;
        const amount = parseInt(formData.get("amount") as string);
        const price = parseFloat(formData.get("price") as string);

        const res = await editExpense(editingExpense.id, { name, type, amount, price });
        if (res.success) {
            setExpenses(expenses.map(exp =>
                exp.id === editingExpense.id
                    ? { ...exp, name, type, amount, price }
                    : exp
            ));
            setEditingExpense(null);
        } else {
            alert(res.error || "Gagal memperbarui data");
        }
    };

    const handleNavigate = (monthDir: number = 0, yearDir: number = 0) => {
        let newMonth = currentMonth + monthDir;
        let newYear = currentYear + yearDir;

        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set("month", newMonth.toString());
        params.set("year", newYear.toString());
        router.push(`?${params.toString()}`);
    };

    const monthName = format(new Date(currentYear, currentMonth), "MMMM", { locale: id });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col xl:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800">Daftar Pengeluaran</h2>

                {/* Inline Integrated Navigation */}
                <div className="flex flex-wrap items-center justify-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-sm">
                    {/* Year Navigation */}
                    <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100">
                        <button
                            onClick={() => handleNavigate(0, -1)}
                            className="p-2 hover:bg-white rounded-l-xl text-gray-400 hover:text-[#409DA1] transition-all"
                            title="Tahun Sebelumnya"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-bold text-gray-500 px-3 border-x border-gray-100">{currentYear}</span>
                        <button
                            onClick={() => handleNavigate(0, 1)}
                            className="p-2 hover:bg-white rounded-r-xl text-gray-400 hover:text-[#409DA1] transition-all"
                            title="Tahun Selanjutnya"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="hidden md:block w-px h-6 bg-gray-200 mx-1" />

                    {/* Month Navigation */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => handleNavigate(-1)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-xl text-gray-600 hover:text-[#409DA1] transition-all font-medium text-sm"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Sebelumnya</span>
                        </button>

                        <span className="text-base font-bold text-[#409DA1] min-w-[100px] text-center capitalize px-2">
                            {monthName}
                        </span>

                        <button
                            onClick={() => handleNavigate(1)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-xl text-gray-600 hover:text-[#409DA1] transition-all font-medium text-sm"
                        >
                            <span className="hidden sm:inline">Selanjutnya</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white text-gray-500 font-semibold border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Tanggal</th>
                            <th className="px-6 py-4">Nama/Jenis</th>
                            <th className="px-6 py-4">Qty & Harga</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Bukti</th>
                            <th className="px-6 py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {expenses.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    Belum ada data pengeluaran.
                                </td>
                            </tr>
                        )}
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-500">{formatDate(expense.createdAt)}</td>
                                <td className="px-6 py-4">
                                    <p className="font-bold text-gray-800">{expense.name}</p>
                                    <p className="text-xs text-gray-500">{expense.type}</p>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {expense.amount} x {formatCurrency(expense.price)}
                                </td>
                                <td className="px-6 py-4 font-bold text-red-600">
                                    {formatCurrency(expense.amount * expense.price)}
                                </td>
                                <td className="px-6 py-4">
                                    {expense.proofUrl ? (
                                        <a
                                            href={expense.proofUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-[#409DA1] hover:underline font-medium bg-[#409DA1]/10 px-3 py-1.5 rounded-lg w-max"
                                        >
                                            <Eye className="w-4 h-4" /> Buka
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 text-xs italic">Tidak ada</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setEditingExpense(expense)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(expense.id)}
                                            disabled={isDeleting === expense.id}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                            title="Hapus"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editingExpense && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <h3 className="text-xl font-bold text-gray-800">Edit Pengeluaran</h3>
                            <button onClick={() => setEditingExpense(null)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleEdit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama/Tujuan</label>
                                <input
                                    name="name"
                                    defaultValue={editingExpense.name}
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent outline-none text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                                <select
                                    name="type"
                                    defaultValue={editingExpense.type}
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent outline-none text-gray-900"
                                >
                                    <option value="Operasional">Operasional</option>
                                    <option value="Pembangunan">Pembangunan</option>
                                    <option value="Kegiatan">Kegiatan</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Jumlah (Qty)</label>
                                    <input
                                        name="amount"
                                        type="number"
                                        defaultValue={editingExpense.amount}
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent outline-none text-gray-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Harga Satuan</label>
                                    <input
                                        name="price"
                                        type="number"
                                        defaultValue={editingExpense.price}
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent outline-none text-gray-900"
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingExpense(null)}
                                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-[#409DA1] text-white font-bold rounded-xl hover:bg-[#327e81] transition-colors"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
