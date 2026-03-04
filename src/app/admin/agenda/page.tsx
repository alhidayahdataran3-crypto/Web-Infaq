import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, Clock, Trash2 } from "lucide-react";
import { createAgenda, deleteAgenda } from "@/app/admin/actions";
import AgendaForm from "@/components/AgendaForm";

export const dynamic = "force-dynamic";

export default async function AdminAgendaPage() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const agendas = await prisma.agenda.findMany({
        where: {
            date: { gte: today }
        },
        orderBy: { date: "asc" },
    });

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 text-[#409DA1]">Agenda Acara Masjid</h1>
                    <p className="text-gray-700 font-medium">Kelola jadwal kegiatan dan pengumuman terdekat</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <AgendaForm />
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Agenda</h2>
                    {agendas.length === 0 && (
                        <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-200 text-center text-gray-400">
                            Belum ada agenda yang dijadwalkan.
                        </div>
                    )}
                    {agendas.map((agenda) => (
                        <div key={agenda.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-start group">
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg text-gray-800">{agenda.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-[#409DA1]" />
                                        {format(new Date(agenda.date), "EEEE, d MMMM yyyy", { locale: id })}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-[#409DA1]" />
                                        {agenda.time} WIB
                                    </div>
                                </div>
                                {agenda.description && (
                                    <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                                        "{agenda.description}"
                                    </p>
                                )}
                            </div>
                            <form action={async () => {
                                "use server";
                                await deleteAgenda(agenda.id);
                            }}>
                                <button className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
