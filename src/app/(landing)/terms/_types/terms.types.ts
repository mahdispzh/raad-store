// src/app/(landing)/terms/_types/terms.types.ts
export interface FaqItem {
  id: number;
  question: string;
  answer: string[];
}

export interface TermsData {
  title: string;
  intro: string;
  faqs: FaqItem[];
}