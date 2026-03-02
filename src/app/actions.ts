"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function submitDonationAction(prevState: any, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const nominalString = formData.get("nominal") as string;
        const showNameString = formData.get("showName") as string;
        const file = formData.get("proof") as File;

        if (!name || !nominalString || !file || file.size === 0) {
            return { success: false, message: "", error: "Semua kolom wajib diisi termasuk bukti pembayaran." };
        }

        const nominal = parseFloat(nominalString);
        if (isNaN(nominal) || nominal <= 0) {
            return { success: false, message: "", error: "Nominal tidak valid." };
        }

        const showName = showNameString === "on";

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.name.split(".").pop() || "png";
        const filename = `donation-${uniquePrefix}.${ext}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from("payment-proofs")
            .upload(filename, buffer, {
                contentType: file.type || 'image/png',
                upsert: false
            });

        if (uploadError) {
            console.error("Supabase upload error:", uploadError);
            return { success: false, message: "", error: "Gagal mengunggah bukti pembayaran." };
        }

        const { data: { publicUrl } } = supabase.storage
            .from("payment-proofs")
            .getPublicUrl(filename);

        await prisma.donation.create({
            data: {
                name,
                nominal,
                showName,
                proofUrl: publicUrl,
                status: "PENDING", // Wait for admin to ACC
            },
        });

        revalidatePath("/");
        return { success: true, message: "Donasi berhasil dikirim dan menunggu verifikasi admin.", error: "" };
    } catch (error: any) {
        console.error("Donation submission error:", error);
        return { success: false, message: "", error: "Terjadi kesalahan saat menyimpan data donasi." };
    }
}
