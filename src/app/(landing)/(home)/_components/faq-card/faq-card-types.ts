export interface FaqCardProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}