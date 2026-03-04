"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface ChartData {
    name: string;
    pemasukan: number;
    pengeluaran: number;
}

export default function AdminOverviewChart({ data }: { data: ChartData[] }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px]">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Visualisasi Keuangan</h3>
                <p className="text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Statistik Tahunan
                </p>
            </div>
            <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            tickFormatter={(value) => `Rp ${value / 1000}k`}
                        />
                        <Tooltip
                            cursor={{ fill: '#F9FAFB' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: any) => [formatCurrency(Number(value || 0)), ""]}
                        />
                        <Legend verticalAlign="top" height={36} />
                        <Bar
                            dataKey="pemasukan"
                            name="Infaq Masuk"
                            fill="#409DA1"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                        />
                        <Bar
                            dataKey="pengeluaran"
                            name="Pengeluaran"
                            fill="#EF4444"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
