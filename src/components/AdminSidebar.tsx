"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, LogOut, Menu, X, ClipboardList, Calendar } from "lucide-react";

interface AdminSidebarProps {
    userEmail: string | null | undefined;
}

export default function AdminSidebar({ userEmail }: AdminSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { href: "/admin", icon: LayoutDashboard, label: "Infaq Masuk" },
        { href: "/admin/expenses", icon: Receipt, label: "Pengeluaran" },
        { href: "/admin/agenda", icon: Calendar, label: "Agenda Acara" },
        { href: "/admin/audit", icon: ClipboardList, label: "Audit Log" },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    const LinkItem = ({ href, icon: Icon, label }: any) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                    ? "bg-[#409DA1] text-white shadow-md shadow-[#409DA1]/20"
                    : "text-gray-700 hover:bg-[#409DA1]/10 hover:text-[#409DA1]"
                    }`}
            >
                <Icon className="w-5 h-5" /> {label}
            </Link>
        );
    };

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                <h2 className="text-xl font-bold text-[#409DA1]">Admin Infaq</h2>
                <button
                    onClick={toggleSidebar}
                    className="p-2.5 rounded-xl bg-gray-900 text-white shadow-lg shadow-gray-200 active:scale-95 transition-all border border-gray-800"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Backdrop for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in transition-all"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-screen md:flex md:flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-6 border-b border-gray-100 hidden md:block">
                    <h2 className="text-xl font-bold text-[#409DA1]">Admin Infaq</h2>
                    <p className="text-xs text-gray-500 mt-1 truncate">{userEmail}</p>
                </div>

                {/* Mobile Header in Sidebar */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between md:hidden">
                    <div>
                        <h2 className="text-xl font-bold text-[#409DA1]">Admin Infaq</h2>
                        <p className="text-xs text-gray-500 mt-1 truncate">{userEmail}</p>
                    </div>
                    <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
                        <X className="w-6 h-6 text-gray-900" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-2 md:mt-0">
                    {menuItems.map((item) => (
                        <LinkItem key={item.href} {...item} />
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link
                        href="/api/auth/signout?callbackUrl=/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                        <LogOut className="w-5 h-5" /> Logout
                    </Link>
                </div>
            </aside>
        </>
    );
}
