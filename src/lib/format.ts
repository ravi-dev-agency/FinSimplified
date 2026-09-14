/**
 * Indian number formatting.
 * en-IN gives the lakh/crore grouping people expect: 25,22,880 not 2,522,880.
 */

export function formatRupees(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/** "₹25.2 lakh" — easier to grasp than a long string of digits. */
export function formatShort(value: number): string {
  const v = Math.round(value);
  if (v >= 1_00_00_000) return `₹${(v / 1_00_00_000).toFixed(2)} crore`;
  if (v >= 1_00_000) return `₹${(v / 1_00_000).toFixed(1)} lakh`;
  if (v >= 1_000) return `₹${(v / 1_000).toFixed(0)},000`;
  return formatRupees(v);
}
