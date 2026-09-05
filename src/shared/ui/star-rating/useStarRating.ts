export function useStarRating(value: number, max: number = 5) {
  const safeValue = Math.min(max, Math.max(0, value));

  const fullStars = Math.floor(safeValue);
  const emptyStars = max - fullStars;

  return {
    fullStars,
    emptyStars,
  };
}
