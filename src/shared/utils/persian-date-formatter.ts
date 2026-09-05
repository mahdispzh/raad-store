// src/shared/utils/persian-date-formatter.ts

const persianNumbers: string[] = [
  "صفر",
  "یک",
  "دو",
  "سه",
  "چهار",
  "پنج",
  "شش",
  "هفت",
  "هشت",
  "نه",
];

const teens: string[] = [
  "ده",
  "یازده",
  "دوازده",
  "سیزده",
  "چهارده",
  "پانزده",
  "شانزده",
  "هفده",
  "هجده",
  "نوزده",
];

const tens: string[] = [
  "",
  "ده",
  "بیست",
  "سی",
  "چهل",
  "پنجاه",
  "شصت",
  "هفتاد",
  "هشتاد",
  "نود",
];

const hundreds: string[] = [
  "",
  "صد",
  "دویست",
  "سیصد",
  "چهارصد",
  "پانصد",
  "ششصد",
  "هفتصد",
  "هشتصد",
  "نهصد",
];

function numberToPersianWords(num: number): string {
if (num === 0) return persianNumbers[0]!;
  const parts: string[] = [];

  if (num >= 1000) {
    const thousands = Math.floor(num / 1000);

    if (thousands === 1) {
      parts.push("هزار");
    } else {
      parts.push(`${persianNumbers[thousands] ?? ""} هزار`);
    }

    num %= 1000;
  }

  if (num >= 100) {
    const h = Math.floor(num / 100);

    if (hundreds[h]) {
      parts.push(hundreds[h]);
    }

    num %= 100;
  }

  if (num >= 10 && num < 20) {
    parts.push(teens[num - 10] ?? "");
    return parts.filter(Boolean).join(" و ");
  }

  if (num >= 20) {
    const t = Math.floor(num / 10);

    if (tens[t]) {
      parts.push(tens[t]);
    }

    num %= 10;
  }

  if (num > 0) {
    parts.push(persianNumbers[num] ?? "");
  }

  return parts.filter(Boolean).join(" و ");
}

export const getTodayPersianDate = (): string => {
  const date = new Date();

  const day = Number(
    new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
      day: "numeric",
    }).format(date)
  );

  const month = new Intl.DateTimeFormat("fa-IR", {
    month: "long",
  }).format(date);

  const year = Number(
    new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
      year: "numeric",
    }).format(date)
  );

  return `${numberToPersianWords(day)} ${month} ${numberToPersianWords(year)}`;
};