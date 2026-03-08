"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, Edit, Trash2, X, ExternalLink, Image as ImageIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { deleteNews, editNews } from "@/app/admin/actions";

interface News {
    id: number;
    title: string;
    imageUrl: string | null;
    externalUrl: string | null;
    createdAt: Date;
}

export default function NewsTable({
    initialNews
}: {
    initialNews: any[]
}) {
    const router = useRouter();
    const [news, setNews] = useState(initialNews);
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    // Sync state with props
    useEffect(() => {
        setNews(initialNews);
    }, [initialNews]);

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;

        setIsDeleting(id);
        const res = await deleteNews(id);
        if (res.success) {
            setNews(news.filter(n => n.id !== id));
        } else {
            alert(res.error || "Gagal menghapus berita");
        }
        setIsDeleting(null);
    };

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingNews) return;

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const externalUrl = formData.get("externalUrl") as string;

        const res = await editNews(editingNews.id, { title, externalUrl });
        if (res.success) {
            setNews(news.map(n =>
                n.id === editingNews.id
                    ? { ...n, title, externalUrl }
                    : n
            ));
            setEditingNews(null);
        } else {
            alert(res.error || "Gagal memperbarui berita");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-[#409DA1]" />
                    Daftar Berita & Kabar
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white text-gray-500 font-semibold border-b border-gray-100 uppercase text-[10px] tracking-widest">
                        <tr>
                            <th className="px-6 py-4">Status/Tgl</th>
                            <th className="px-6 py-4">Berita</th>
                            <th className="px-6 py-4">Link Asli</th>
                            <th className="px-6 py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                        {news.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">
                                    Belum ada berita yang diterbitkan.
                                </td>
                            </tr>
                        )}
                        {news.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400">{formatDate(item.createdAt)}</span>
                                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Published</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        {item.imageUrl ? (
                                            <div className="w-16 h-10 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
                                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                <ImageIcon className="w-4 h-4 text-gray-300" />
                                            </div>
                                        )}
                                        <div className="max-w-xs truncate font-bold text-gray-800" title={item.title}>
                                            {item.title}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {item.externalUrl ? (
                                        <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="text-[#409DA1] hover:underline flex items-center gap-1 font-medium">
                                            Buka <ExternalLink className="w-3 h-3" />
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 italic text-xs">Internal</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setEditingNews(item)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shadow-sm bg-white border border-blue-50"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            disabled={isDeleting === item.id}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shadow-sm bg-white border border-red-50 disabled:opacity-50"
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
            {editingNews && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Edit className="w-5 h-5 text-[#409DA1]" />
                                Edit Berita
                            </h3>
                            <button onClick={() => setEditingNews(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleEdit} className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Berita</label>
                                <input
                                    name="title"
                                    defaultValue={editingNews.title}
                                    required
                                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent outline-none text-gray-900 bg-gray-50/30"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Link Berita (External URL)</label>
                                <input
                                    name="externalUrl"
                                    defaultValue={editingNews.externalUrl || ""}
                                    type="url"
                                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#409DA1] focus:border-transparent outline-none text-gray-900 bg-gray-50/30"
                                    placeholder="https://"
                                />
                            </div>
                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingNews(null)}
                                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors active:scale-95"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-[#409DA1] text-white font-bold rounded-2xl hover:bg-[#327e81] transition-all shadow-lg shadow-[#409DA1]/20 active:scale-95"
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
