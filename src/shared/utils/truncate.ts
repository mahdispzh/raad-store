export const truncate = (text: string, max = 80): string => {
  if (text.length <= max) return text;

  return text.slice(0, max).trim() + "...";
};
