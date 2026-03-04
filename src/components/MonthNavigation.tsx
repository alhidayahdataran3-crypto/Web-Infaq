"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function MonthNavigation({ currentMonth, currentYear }: { currentMonth: number, currentYear: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleNavigate = (direction: number) => {
        let newMonth = currentMonth + direction;
        let newYear = currentYear;

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

    const date = new Date(currentYear, currentMonth);
    const monthName = format(date, "MMMM yyyy", { locale: id });

    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <button
                onClick={() => handleNavigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-[#409DA1] font-medium transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
                Sebelumnya
            </button>
            <h2 className="text-lg font-bold text-gray-800 capitalize">{monthName}</h2>
            <button
                onClick={() => handleNavigate(1)}
                className="flex items-center gap-2 text-gray-600 hover:text-[#409DA1] font-medium transition-colors"
            >
                Selanjutnya
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
