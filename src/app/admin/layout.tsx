import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
            <AdminSidebar userEmail={session.user.email} />

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
