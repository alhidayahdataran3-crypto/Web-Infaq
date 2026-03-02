import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Receipt, LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login");
    }

    // ToDo: Implement actual email whitelist later.
    // if (session.user.email !== "admin@masjidalhidayah.org") { return <div>Access Denied</div> }

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#409DA1]">Admin Infaq</h2>
                    <p className="text-xs text-gray-500 mt-1">{session.user.email}</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#409DA1]/10 hover:text-[#409DA1] transition-colors font-medium">
                        <LayoutDashboard className="w-5 h-5" /> Infaq Masuk
                    </Link>
                    <Link href="/admin/expenses" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#409DA1]/10 hover:text-[#409DA1] transition-colors font-medium">
                        <Receipt className="w-5 h-5" /> Pengeluaran
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <Link href="/api/auth/signout?callbackUrl=/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium">
                        <LogOut className="w-5 h-5" /> Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 max-h-screen overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
