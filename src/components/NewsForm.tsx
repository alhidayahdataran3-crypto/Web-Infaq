"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitNewsAction } from "@/app/admin/actions";
import { Save, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

const initialState = {
    success: false,
    message: "",
    error: "",
};

export default function NewsForm() {
    const [state, formAction, isPending] = useActionState(submitNewsAction, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    useEffect(() => {
        if (state?.success && formRef.current) {
            formRef.current.reset();
            setPreviewUrl(null);
        }
    }, [state]);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#409DA1]"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#409DA1]" />
                Tambah Berita / Kabar Masjid
            </h3>

            {state?.error && (
                <div className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200 animate-in fade-in slide-in-from-top-1">
                    {state.error}
                </div>
            )}

            {state?.success && (
                <div className="p-4 mb-6 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200 animate-in fade-in slide-in-from-top-1">
                    {state.message}
                </div>
            )}

            <form action={formAction} ref={formRef} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Berita</label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent transition-all outline-none"
                        placeholder="Contoh: Peresmian Gedung Baru TPA"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Link Berita (Opsional)</label>
                    <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="url"
                            name="externalUrl"
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent transition-all outline-none"
                            placeholder="https://instagram.com/p/..."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Foto Berita</label>
                    <div className="mt-1 flex flex-col gap-4">
                        {previewUrl && (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200 shadow-inner bg-gray-50">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent transition-all text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 bg-gray-50/30"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#409DA1] hover:bg-[#327e81] text-white font-bold py-3 mt-2 rounded-xl transition-all shadow-sm flex justify-center items-center gap-2 active:scale-95 disabled:opacity-70 disabled:scale-100"
                >
                    {isPending ? (
                        <div className="flex items-center gap-2">
                             <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                             Mengirim...
                        </div>
                    ) : (
                        <>
                            <Save className="w-5 h-5" /> Terbitkan Berita
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
