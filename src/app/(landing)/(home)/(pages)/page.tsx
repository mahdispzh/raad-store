import AssemblySection from "../_components/assembly-section/assembly-section";
import { AssemblySectionData } from "../_components/assembly-section/assembly-section-constants";
import CategoryCardSection from "../_components/category-card/category-card-section";
import HeroSection from "../_components/hero-section/hero-section";
import { HeroSectionData } from "../_components/hero-section/hero-section-constants";
import ReadyPanelCardSection from "../_components/ready-panel-card/ready-panel-card-section";
import ServiceCardSection from "../_components/service-card/service-card-section";


export default function HomePage() {
  return (
  <>
    <HeroSection {...HeroSectionData} />
    <CategoryCardSection />
    <ServiceCardSection />
    <ReadyPanelCardSection />
    <AssemblySection {...AssemblySectionData} />
  </>
);
}