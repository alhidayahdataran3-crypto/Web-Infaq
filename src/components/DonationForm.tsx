"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitDonationAction } from "@/app/actions";

const initialState = {
    success: false,
    message: "",
    error: "",
};

export function DonationForm() {
    const [state, formAction, isPending] = useActionState(submitDonationAction, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    const [displayNominal, setDisplayNominal] = useState("");
    const [rawNominal, setRawNominal] = useState("");

    const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove non-digit characters
        const value = e.target.value.replace(/\D/g, "");
        if (!value) {
            setDisplayNominal("");
            setRawNominal("");
            return;
        }

        // Format with thousand separator (no decimals)
        const formatted = new Intl.NumberFormat("id-ID").format(parseInt(value, 10));
        setDisplayNominal(formatted);
        setRawNominal(value);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#409DA1]"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 font-sans">Form Konfirmasi Donasi</h3>

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

            <form action={formAction} ref={formRef} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                        Nama Anda
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent transition-all"
                        placeholder="Masukkan nama Hamba Allah / nama Anda"
                    />
                </div>

                <div>
                    <label htmlFor="displayNominal" className="block text-sm font-semibold text-gray-700 mb-1">
                        Nominal (Rp)
                    </label>
                    <input
                        type="text"
                        id="displayNominal"
                        value={displayNominal}
                        onChange={handleNominalChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent transition-all"
                        placeholder="Contoh: 50.000"
                    />
                    {/* Hidden input to submit the actual integer value */}
                    <input type="hidden" name="nominal" value={rawNominal} />
                </div>

                <div>
                    <label htmlFor="proof" className="block text-sm font-semibold text-gray-700 mb-1">
                        Bukti Pembayaran
                    </label>
                    <input
                        type="file"
                        name="proof"
                        id="proof"
                        accept="image/*"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#409DA1]/10 file:text-[#409DA1] hover:file:bg-[#409DA1]/20 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent transition-all"
                    />
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <input
                        type="checkbox"
                        name="showName"
                        id="showName"
                        defaultChecked
                        className="w-5 h-5 text-[#409DA1] bg-white border-gray-300 rounded focus:ring-[#409DA1] focus:ring-2"
                    />
                    <label htmlFor="showName" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                        Tampilkan nama saya di daftar donatur
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#409DA1] hover:bg-[#327e81] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {isPending ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Memproses...
                        </span>
                    ) : (
                        "Kirim Bukti Pembayaran"
                    )}
                </button>
            </form>
        </div>
    );
}
