// src/app/layout.tsx
import Footer from "@/src/shared/components/footer/footer.ui";
import { NavbarLanding } from "@/src/shared/components/navbar-landing/navbar-landing.ui";


export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarLanding />
      {children}
      <Footer />
    </>
  );
}
