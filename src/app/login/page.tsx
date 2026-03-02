"use client";

import { signIn } from "next-auth/react";
import { Building2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-4 border-[#409DA1]">
                <Building2 className="w-16 h-16 mx-auto mb-4 text-[#409DA1]" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Login Admin Masjid</h1>
                <p className="text-gray-500 mb-8 text-sm">Masuk menggunakan email resmi pengurus masjid untuk mengakses dashboard.</p>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/admin" })}
                    className="w-full bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all shadow-sm hover:bg-gray-50 hover:border-gray-300 flex justify-center items-center gap-3"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    Login dengan Google
                </button>

                <Link href="/" className="mt-6 inline-flex items-center gap-2 text-gray-500 hover:text-[#409DA1] transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
