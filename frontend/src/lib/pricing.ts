export function getPriceForSize(basePrice: number, size?: string): number {
  if (!size) return basePrice;

  const parsed = parseFloat(size);
  if (Number.isNaN(parsed) || parsed <= 0) return basePrice;

  return Math.round(basePrice * parsed);
}
