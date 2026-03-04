"use client";

import { Printer, MessageCircle } from "lucide-react";

interface AdminActionsProps {
    waUrl: string;
}

export default function AdminActions({ waUrl }: AdminActionsProps) {
    return (
        <div className="flex gap-2 w-full md:w-auto">
            <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-green-200"
            >
                <MessageCircle className="w-5 h-5" /> Share WA
            </a>
            <button
                onClick={() => window.print()}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-800 hover:bg-black text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-gray-200"
            >
                <Printer className="w-5 h-5" /> Cetak
            </button>
        </div>
    );
}
