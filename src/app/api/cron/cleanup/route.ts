import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { subDays } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    // Basic auth check (can be improved with CRON_SECRET)
    const authHeader = request.headers.get("authorization");
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return new Response("Unauthorized", { status: 401 });
    // }

    try {
        const thirtyDaysAgo = subDays(new Date(), 30);

        // 1. Handlers for Donations
        const oldDonations = await prisma.donation.findMany({
            where: {
                createdAt: { lt: thirtyDaysAgo },
                NOT: [
                    { proofUrl: null },
                    { proofUrl: "" }
                ]
            },
            select: { id: true, proofUrl: true },
        });

        for (const donation of oldDonations) {
            if (donation.proofUrl) {
                // Extract filename from URL (if it's a Supabase URL)
                const urlParts = donation.proofUrl.split("/");
                const fileName = urlParts[urlParts.length - 1];

                await supabase.storage
                    .from("payment-proofs")
                    .remove([fileName]);

                // Update record to remove proofUrl (optional: or delete record entirely)
                await prisma.donation.update({
                    where: { id: donation.id },
                    data: { proofUrl: null },
                });
            }
        }

        // 2. Handlers for Expenses
        const oldExpenses = await prisma.expense.findMany({
            where: {
                createdAt: { lt: thirtyDaysAgo },
                NOT: [
                    { proofUrl: null },
                    { proofUrl: "" }
                ]
            },
            select: { id: true, proofUrl: true },
        });

        for (const expense of oldExpenses) {
            if (expense.proofUrl) {
                const urlParts = expense.proofUrl.split("/");
                const fileName = urlParts[urlParts.length - 1];

                await supabase.storage
                    .from("payment-proofs")
                    .remove([fileName]);

                await prisma.expense.update({
                    where: { id: expense.id },
                    data: { proofUrl: null },
                });
            }
        }

        return NextResponse.json({
            success: true,
            message: `Cleanup completed: ${oldDonations.length} donations and ${oldExpenses.length} expenses processed.`,
        });
    } catch (error: any) {
        console.error("Cleanup error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
