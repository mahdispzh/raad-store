// _types/footer._types.ts
import { ReactNode } from "react";

// ==================== تایپ‌های فوتر (Footer) ====================
export interface FeatureItem {
  icon: ReactNode;
  key: string;
}

export interface FooterItem {
  key: string;
  href: string;
}
