export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroSectionProps {
  title: string;
  description: string;
  stats: HeroStat[];
  image: string;
}