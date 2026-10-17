import AssemblySection from "../_components/assembly-section/assembly-section";
import { AssemblySectionData } from "../_components/assembly-section/assembly-section-constants";
import BrandSection from "../_components/brand-section/brand-section";
import CategoryCardSection from "../_components/category-card/category-card-section";
import CertificateCardSection from "../_components/certificate-card/certificate-card-section";
import CtaSection from "../_components/cta-section/cta-section";
import { CtaSectionData } from "../_components/cta-section/cta-section-constants";
import HeroSection from "../_components/hero-section/hero-section";
import { HeroSectionData } from "../_components/hero-section/hero-section-constants";
import PartnerCardSection from "../_components/partner-card/partner-card-section";
import ProcessCardSection from "../_components/process-card/process-card-section";
import ReadyPanelCardSection from "../_components/ready-panel-card/ready-panel-card-section";
import ServiceCardSection from "../_components/service-card/service-card-section";
import SupplyCardSection from "../_components/supply-card/supply-card-section";


export default function HomePage() {
  return (
  <>
    <HeroSection {...HeroSectionData} />
    <CategoryCardSection />
    <ServiceCardSection />
    <ReadyPanelCardSection />
    <AssemblySection {...AssemblySectionData} />
    <SupplyCardSection />
    <BrandSection />
    <PartnerCardSection />
    <CertificateCardSection />
    <ProcessCardSection />
    <CtaSection {...CtaSectionData} />
  </>
);
}