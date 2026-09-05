
import type { StepperItem } from "./stepper.types";

export const DEFAULT_STEPS: StepperItem[] = [
  {
    id: "current",
    title: "جاری",
  },
  {
    id: "payment",
    title: "پرداخت",
  },
  {
    id: "preparing",
    title: "آماده سازی",
  },
  {
    id: "shipping",
    title: "ارسال",
  },
  {
    id: "delivered",
    title: "تحویل",
  },
];
