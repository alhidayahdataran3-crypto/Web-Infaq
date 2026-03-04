"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Check, X, Edit, Eye, Save, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { updateDonationStatus, editDonation, deleteDonation } from "@/app/admin/actions";

export default function AdminDonationTable({
    initialDonations,
    currentMonth,
    currentYear
}: {
    initialDonations: any[],
    currentMonth: number,
    currentYear: number
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<string>("SEMUA");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");
    const [editNominal, setEditNominal] = useState(0);



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

    const handleUpdateStatus = async (id: number, status: string) => {
        if (confirm(`Apakah Anda yakin ingin mengubah status donasi ini menjadi ${status}?`)) {
            await updateDonationStatus(id, status);
        }
    };

    const handleDeleteDonation = async (id: number, name: string) => {
        const confirmString = `DELETE_${name}`;
        const input = prompt(`PERINGATAN: Menghapus data donasi bersifat permanen.\nKetik "${confirmString}" untuk menghapus:`);

        if (input === confirmString) {
            await deleteDonation(id);
        } else if (input !== null) {
            alert("Konfirmasi gagal. Teks yang dimasukkan tidak cocok.");
        }
    };

    const handleEditClick = (donation: any) => {
        setEditingId(donation.id);
        setEditName(donation.name);
        setEditNominal(donation.nominal);
    };

    const handleSaveEdit = async (id: number) => {
        await editDonation(id, editName, editNominal);
        setEditingId(null);
    };

    const filteredDonations = initialDonations.filter((d) => {
        if (activeTab === "SEMUA") return true;
        return d.status === activeTab;
    });

    const tabs = [
        { id: "SEMUA", label: "Semua", color: "gray" },
        { id: "PENDING", label: "Menunggu", color: "yellow" },
        { id: "ACC", label: "Diterima", color: "teal" },
        { id: "INVALID", label: "Tidak Valid", color: "red" },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            {/* Table Header with Navigation */}
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col xl:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800">Daftar Konfirmasi Pembayaran</h2>

                {/* Navigation Controls */}
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

            {/* Tabs Section */}
            <div className="flex border-b border-gray-100 bg-white">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === tab.id
                            ? `border-[#409DA1] text-[#409DA1]`
                            : "border-transparent text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        {tab.label}
                        <span className="ml-2 bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px]">
                            {tab.id === "SEMUA"
                                ? initialDonations.length
                                : initialDonations.filter(d => d.status === tab.id).length
                            }
                        </span>
                    </button>
                ))}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Tanggal</th>
                            <th className="px-6 py-4">Nama</th>
                            <th className="px-6 py-4">Nominal</th>
                            <th className="px-6 py-4">Bukti</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredDonations.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    Tidak ada data untuk status ini.
                                </td>
                            </tr>
                        )}
                        {filteredDonations.map((donation) => (
                            <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-500">{formatDate(donation.createdAt)}</td>
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {editingId === donation.id ? (
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        <div>
                                            {donation.name}
                                            {!donation.showName && (
                                                <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                                                    Hamba Allah Mode
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-bold text-[#409DA1]">
                                    {editingId === donation.id ? (
                                        <input
                                            type="number"
                                            value={editNominal}
                                            onChange={(e) => setEditNominal(parseFloat(e.target.value))}
                                            className="border border-gray-300 rounded px-2 py-1 w-24"
                                        />
                                    ) : (
                                        formatCurrency(donation.nominal)
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href={donation.proofUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-[#409DA1] hover:underline font-medium bg-[#409DA1]/10 px-3 py-1.5 rounded-lg w-max"
                                    >
                                        <Eye className="w-4 h-4" /> Lihat Bukti
                                    </a>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${donation.status === "ACC"
                                            ? "bg-green-100 text-green-700"
                                            : donation.status === "INVALID"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {donation.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        {editingId === donation.id ? (
                                            <button
                                                onClick={() => handleSaveEdit(donation.id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded transition-colors"
                                                title="Simpan Pemasukan"
                                            >
                                                <Save className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEditClick(donation)}
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-1.5 rounded transition-colors"
                                                title="Edit Data"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        )}

                                        {donation.status !== "ACC" && (
                                            <button
                                                onClick={() => handleUpdateStatus(donation.id, "ACC")}
                                                className="bg-green-500 hover:bg-green-600 text-white p-1.5 rounded transition-colors"
                                                title="ACC Pemasukan"
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                        )}
                                        {donation.status !== "INVALID" && (
                                            <button
                                                onClick={() => handleUpdateStatus(donation.id, "INVALID")}
                                                className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded transition-colors"
                                                title="Tandai Tidak Valid"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                        {donation.status === "INVALID" && (
                                            <button
                                                onClick={() => handleDeleteDonation(donation.id, donation.name)}
                                                className="bg-gray-800 hover:bg-black text-white p-1.5 rounded transition-colors"
                                                title="Hapus Data Permanen"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
