"use client";

import { useState } from "react";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils";
import { updateDonationStatus, editDonation } from "@/app/admin/actions";
import { Check, X, Edit, Eye, Save } from "lucide-react";

export default function AdminDonationTable({ initialDonations }: { initialDonations: any[] }) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");
    const [editNominal, setEditNominal] = useState(0);

    const handleUpdateStatus = async (id: number, status: string) => {
        if (confirm(`Apakah Anda yakin ingin mengubah status donasi ini menjadi ${status}?`)) {
            await updateDonationStatus(id, status);
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

    return (
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
                    {initialDonations.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                Belum ada data donasi masuk.
                            </td>
                        </tr>
                    )}
                    {initialDonations.map((donation) => (
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
                                        {!donation.showName && <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Hamba Allah Mode</span>}
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
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
