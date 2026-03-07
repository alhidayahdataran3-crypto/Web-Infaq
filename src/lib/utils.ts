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

export function formatDate(date: Date | string | number): string {
    return format(new Date(date), "dd/MM/yyyy");
}

export function formatTimeAgo(date: Date | string | number): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: id });
}
