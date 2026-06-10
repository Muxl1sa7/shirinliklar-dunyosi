export function formatPrice(value: number): string {
  const rounded = Math.round(value);
  const grouped = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${grouped} so'm`;
}
