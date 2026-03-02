"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function updateDonationStatus(id: number, status: string) {
    try {
        await prisma.donation.update({
            where: { id },
            data: { status },
        });

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
        await prisma.donation.update({
            where: { id },
            data: { name, nominal },
        });

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

        await prisma.expense.create({
            data: { name, type, amount, price, proofUrl },
        });

        revalidatePath("/admin/expenses");
        return { success: true, message: "Pengeluaran berhasil dicatat.", error: "" };
    } catch (error) {
        console.error("Expense error:", error);
        return { success: false, message: "", error: "Gagal menyimpan pengeluaran." };
    }
}

export async function deleteExpense(id: number) {
    try {
        await prisma.expense.delete({
            where: { id },
        });

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

        revalidatePath("/admin/expenses");
        return { success: true };
    } catch (error) {
        console.error("Edit expense error:", error);
        return { error: "Gagal memperbarui pengeluaran" };
    }
}
