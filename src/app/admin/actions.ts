"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function createAuditLog(action: string, details: any) {
    const session = await getServerSession(authOptions);
    try {
        await prisma.auditLog.create({
            data: {
                action,
                details: JSON.stringify(details),
                adminEmail: session?.user?.email || "Unknown Admin",
            },
        });
    } catch (err) {
        console.error("Audit log failed:", err);
    }
}

export async function updateDonationStatus(id: number, status: string) {
    try {
        const donation = await prisma.donation.findUnique({ where: { id } });
        await prisma.donation.update({
            where: { id },
            data: { status },
        });

        await createAuditLog("UPDATE_STATUS", { id, oldStatus: donation?.status, newStatus: status, name: donation?.name });

        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Update status error:", error);
        return { error: "Gagal memperbarui status" };
    }
}

export async function editDonation(id: number, name: string, nominal: number) {
    try {
        const old = await prisma.donation.findUnique({ where: { id } });
        await prisma.donation.update({
            where: { id },
            data: { name, nominal },
        });

        await createAuditLog("EDIT_DONATION", { id, name, nominal, oldName: old?.name, oldNominal: old?.nominal });

        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Edit donation error:", error);
        return { error: "Gagal mengedit data donasi" };
    }
}

export async function submitExpenseAction(prevState: any, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const type = formData.get("type") as string;
        const amountStr = formData.get("amount") as string;
        const priceStr = formData.get("price") as string;
        const file = formData.get("proof") as File | null;

        if (!name || !type || !amountStr || !priceStr) {
            return { success: false, message: "", error: "Harap isi semua kolom yang wajib." };
        }

        const amount = parseInt(amountStr);
        const price = parseFloat(priceStr);

        let proofUrl = null;
        if (file && file.size > 0) {
            const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const ext = file.name.split(".").pop() || "jpg";
            const filename = `expense-${uniquePrefix}.${ext}`;

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const { error: uploadError } = await supabase.storage
                .from("payment-proofs")
                .upload(filename, buffer, {
                    contentType: file.type || 'image/jpeg',
                    upsert: false
                });

            if (uploadError) {
                console.error("Supabase upload error:", uploadError);
                return { success: false, message: "", error: "Gagal mengunggah bukti pengeluaran." };
            }

            const { data: { publicUrl } } = supabase.storage
                .from("payment-proofs")
                .getPublicUrl(filename);

            proofUrl = publicUrl;
        }

        const expense = await prisma.expense.create({
            data: { name, type, amount, price, proofUrl },
        });

        await createAuditLog("CREATE_EXPENSE", { id: expense.id, name, amount, price });

        revalidatePath("/admin/expenses");
        return { success: true, message: "Pengeluaran berhasil dicatat.", error: "" };
    } catch (error) {
        console.error("Expense error:", error);
        return { success: false, message: "", error: "Gagal menyimpan pengeluaran." };
    }
}

export async function deleteExpense(id: number) {
    try {
        const old = await prisma.expense.findUnique({ where: { id } });
        await prisma.expense.delete({
            where: { id },
        });

        await createAuditLog("DELETE_EXPENSE", { id, name: old?.name });

        revalidatePath("/admin/expenses");
        return { success: true };
    } catch (error) {
        console.error("Delete expense error:", error);
        return { error: "Gagal menghapus pengeluaran" };
    }
}

export async function editExpense(id: number, data: { name: string, type: string, amount: number, price: number }) {
    try {
        await prisma.expense.update({
            where: { id },
            data: {
                name: data.name,
                type: data.type,
                amount: data.amount,
                price: data.price,
            },
        });

        await createAuditLog("EDIT_EXPENSE", { id, ...data });

        revalidatePath("/admin/expenses");
        return { success: true };
    } catch (error) {
        console.error("Edit expense error:", error);
        return { error: "Gagal memperbarui pengeluaran" };
    }
}

export async function deleteDonation(id: number) {
    try {
        const old = await prisma.donation.findUnique({ where: { id } });
        await prisma.donation.delete({
            where: { id },
        });

        await createAuditLog("DELETE_DONATION", { id, name: old?.name });

        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Delete donation error:", error);
        return { error: "Gagal menghapus data donasi" };
    }
}

export async function createAgenda(data: { title: string, date: string, time: string, description: string }) {
    try {
        await prisma.agenda.create({
            data: {
                title: data.title,
                date: new Date(data.date),
                time: data.time,
                description: data.description,
            },
        });

        await createAuditLog("CREATE_AGENDA", { title: data.title });

        revalidatePath("/");
        revalidatePath("/admin/agenda");
        return { success: true };
    } catch (error) {
        console.error("Create agenda error:", error);
        return { error: "Gagal membuat agenda" };
    }
}

export async function deleteAgenda(id: number) {
    try {
        const old = await prisma.agenda.findUnique({ where: { id } });
        await prisma.agenda.delete({ where: { id } });

        await createAuditLog("DELETE_AGENDA", { title: old?.title });

        revalidatePath("/");
        revalidatePath("/admin/agenda");
        return { success: true };
    } catch (error) {
        console.error("Delete agenda error:", error);
        return { error: "Gagal menghapus agenda" };
    }
}
