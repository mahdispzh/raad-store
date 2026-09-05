export function formatLastActivity(date: string | null): string {
  if (!date) return "بدون فعالیت";

  return new Date(date).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
