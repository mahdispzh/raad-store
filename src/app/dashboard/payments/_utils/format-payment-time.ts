export function formatPaymentTime(date: string | Date | null): string {
  if (!date) return "-";

  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("fa-IR", {
    second: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}
