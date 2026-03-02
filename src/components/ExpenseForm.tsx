"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitExpenseAction } from "@/app/admin/actions";
import { Save } from "lucide-react";

const initialState = {
    success: false,
    message: "",
    error: "",
};

export default function ExpenseForm() {
    const [state, formAction, isPending] = useActionState(submitExpenseAction, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    const [displayPrice, setDisplayPrice] = useState("");
    const [rawPrice, setRawPrice] = useState("");

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove non-digit characters
        const value = e.target.value.replace(/\D/g, "");
        if (!value) {
            setDisplayPrice("");
            setRawPrice("");
            return;
        }

        // Format with thousand separator (no decimals)
        const formatted = new Intl.NumberFormat("id-ID").format(parseInt(value, 10));
        setDisplayPrice(formatted);
        setRawPrice(value);
    };

    useEffect(() => {
        if (state?.success && formRef.current) {
            formRef.current.reset();
            setDisplayPrice("");
            setRawPrice("");
        }
    }, [state]);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#409DA1]"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Tambah Pengeluaran</h3>

            {state?.error && (
                <div className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200">
                    {state.error}
                </div>
            )}

            {state?.success && (
                <div className="p-4 mb-6 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200">
                    {state.message}
                </div>
            )}

            <form action={formAction} ref={formRef} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nama/Tujuan Pengeluaran</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent transition-all"
                        placeholder="Contoh: Beli cat tembok masjid"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori/Jenis</label>
                    <select
                        name="type"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent transition-all bg-white"
                    >
                        <option value="">Pilih Kategori</option>
                        <option value="Operasional">Operasional (Listrik, Air)</option>
                        <option value="Pembangunan">Pembangunan/Renovasi</option>
                        <option value="Kegiatan">Kegiatan/Acara Masjid</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Jumlah (Qty)</label>
                        <input
                            type="number"
                            name="amount"
                            min="1"
                            defaultValue="1"
                            required
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Harga Satuan (Rp)</label>
                        <input
                            type="text"
                            id="displayPrice"
                            value={displayPrice}
                            onChange={handlePriceChange}
                            required
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent transition-all"
                            placeholder="Contoh: 150.000"
                        />
                        <input type="hidden" name="price" value={rawPrice} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Bukti Nota (Opsional)</label>
                    <input
                        type="file"
                        name="proof"
                        accept="image/*,application/pdf"
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent transition-all text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#409DA1] hover:bg-[#327e81] text-white font-bold py-3 mt-2 rounded-xl transition-all shadow-sm flex justify-center items-center gap-2"
                >
                    {isPending ? (
                        "Menyimpan..."
                    ) : (
                        <>
                            <Save className="w-5 h-5" /> Simpan Pengeluaran
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
