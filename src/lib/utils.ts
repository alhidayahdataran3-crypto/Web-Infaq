import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(date: Date): string {
    return format(date, "dd/MM/yyyy");
}

export function formatTimeAgo(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true, locale: id });
}
