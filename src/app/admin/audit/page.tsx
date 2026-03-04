import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ClipboardList } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AuditLogPage() {
    let logs: any[] = [];
    try {
        logs = await prisma.auditLog.findMany({
            orderBy: { createdAt: "desc" },
            take: 50,
        });
    } catch (error) {
        console.warn("Audit Log table might not exist yet. Please run prisma db push.");
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#409DA1]/10 rounded-2xl">
                    <ClipboardList className="w-8 h-8 text-[#409DA1]" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Audit Log</h1>
                    <p className="text-gray-500">Rekam jejak aktivitas administrator</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Waktu</th>
                                <th className="px-6 py-4">Admin</th>
                                <th className="px-6 py-4">Aksi</th>
                                <th className="px-6 py-4">Detail</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        Belum ada rekaman aktivitas atau tabel belum siap.
                                    </td>
                                </tr>
                            )}
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        {formatDate(log.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        {log.adminEmail}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase">
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                                        {log.details}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
