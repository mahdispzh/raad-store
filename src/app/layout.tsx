import type { Metadata } from "next";
import "@/src/shared/styles/globals.css";
import Footer from "@/src/shared/components/footer/footer";
import Header  from "@/src/shared/components/header/header";

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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
