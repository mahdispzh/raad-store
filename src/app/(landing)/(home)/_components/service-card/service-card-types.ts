export interface ServiceCardProps {
  title: string;
  description: string;
}

export interface ServiceItem extends ServiceCardProps {
  id: string;
}

export interface ServiceTab {
  id: string;
  label: string;
  items: ServiceItem[];
}