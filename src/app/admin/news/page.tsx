import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import NewsForm from "@/components/NewsForm";
import NewsTable from "@/components/NewsTable";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
    let news: any[] = [];

    try {
        news = await prisma.news.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.warn("Database connection unavailable, skipping fetch for News Page.");
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Manajemen Berita</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <NewsForm />
                </div>

                {/* Table Section */}
                <div className="lg:col-span-2">
                    < NewsTable initialNews={JSON.parse(JSON.stringify(news))} />
                </div>
            </div>
        </div>
    );
}
