import type { Metadata } from "next";
import "@/src/shared/styles/globals.css";

export const metadata: Metadata = {
  title: "برق و صنعت راد",
  description: "طراحی، تامین و مونتاژ انواع تابلوهای برق صنعتی و ساختمانی",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
