// _hooks/use-footer.ts
import footerData from "../../constants/texts/footer.json";

export type FooterKeys = keyof typeof footerData.footer;

// ==================== هوک فوتر ====================
export function useFooter() {
  const getText = (key: FooterKeys): string => {
    return footerData.footer[key] || "";
  };
  return { getText, footerData };
}
