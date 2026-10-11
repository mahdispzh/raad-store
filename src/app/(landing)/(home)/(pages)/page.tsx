import HeroSection from "../_components/hero-section/hero-section";
import { HeroSectionData } from "../_components/hero-section/hero-section-constants";


export default function HomePage() {
  return <HeroSection {...HeroSectionData} />;
}