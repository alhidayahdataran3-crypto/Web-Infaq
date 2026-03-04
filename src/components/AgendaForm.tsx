"use client";

import { useState } from "react";
import { createAgenda } from "@/app/admin/actions";
import { Plus, Loader2 } from "lucide-react";

export default function AgendaForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        await createAgenda({
            title: formData.get("title") as string,
            date: formData.get("date") as string,
            time: formData.get("time") as string,
            description: formData.get("description") as string,
        });

        (e.target as HTMLFormElement).reset();
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-4 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#409DA1]" /> Tambah Agenda
            </h2>

            <div className="space-y-3">
                <div>
                    <label className="text-xs font-bold text-gray-700 uppercase">Nama Acara</label>
                    <input
                        name="title"
                        type="text"
                        required
                        placeholder="Contoh: Kajian Rutin"
                        className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#409DA1]/20 outline-none text-gray-900 placeholder:text-gray-300"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase">Tanggal</label>
                        <input
                            name="date"
                            type="date"
                            required
                            className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#409DA1]/20 outline-none text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase">Waktu</label>
                        <input
                            name="time"
                            type="text"
                            required
                            placeholder="19:30"
                            className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#409DA1]/20 outline-none text-gray-900 placeholder:text-gray-300"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-700 uppercase">Penjelasan (Opsional)</label>
                    <textarea
                        name="description"
                        rows={3}
                        placeholder="Detail acara..."
                        className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#409DA1]/20 outline-none resize-none text-gray-900 placeholder:text-gray-300"
                    ></textarea>
                </div>

                <button
                    disabled={loading}
                    className="w-full bg-[#409DA1] hover:bg-[#358a8d] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#409DA1]/20 flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Agenda"}
                </button>
            </div>
        </form>
    );
}
