import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Wajib ditambahkan agar Vercel tidak meng-cache respon API ini
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        // Mengeksekusi query dummy "SELECT 1" murni untuk trigger aktivitas database
        // Cara ini tidak menyentuh atau merubah struktur tabel sama sekali
        await prisma.$queryRaw`SELECT 1`;

        return NextResponse.json({
            success: true,
            message: 'Supabase keep-alive ping successful!'
        });
    } catch (error: any) {
        console.error('Keep-alive ping failed:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to ping database', error: error.message },
            { status: 500 }
        );
    }
}
