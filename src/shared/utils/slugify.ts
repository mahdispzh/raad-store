export const slugify = (text: string): string => {
  return text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[?%#@!]/g, "")
    .toLowerCase();
};
