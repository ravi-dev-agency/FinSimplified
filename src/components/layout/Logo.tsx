/**
 * The mark: a rupee sign inside a bookmark.
 *
 * A bookmark says reading; the rupee says money. Together they say what the
 * site is — money you read about — which a plain rupee badge does not. The
 * notch at the base keeps the silhouette recognisable at favicon size, where
 * a rounded square is indistinguishable from every other fintech icon.
 *
 * Proportions are tuned for the header (30px) and the favicon (16px), which
 * is where a mark like this usually fails:
 *   - The body is wide (5 → 27 of 32) so there is enough ink to read small.
 *   - The notch is shallow, so it reads as a bookmark without eating the
 *     rupee's leg, which is what makes the glyph identifiable.
 *   - Three strokes only — two bars and the bowl — plus a separate leg. Any
 *     more detail merges into a blob below about 20px.
 *
 * Drawn on a 32-unit grid with no text, so the wordmark beside it stays real
 * selectable text.
 */
export default function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <path
        d="M5 5.4A2.6 2.6 0 0 1 7.6 2.8h16.8A2.6 2.6 0 0 1 27 5.4v23.2a1 1 0 0 1-1.54.84L16 23.3l-9.46 6.14A1 1 0 0 1 5 28.6z"
        fill="var(--color-brand)"
      />
      {/* Rupee: two bars and the bowl's return. */}
      <path
        d="M11.2 8.6h9.6 M11.2 12.6h9.6 M11.2 16.6h4.2c2.9 0 4.9-1.8 4.9-4.3"
        stroke="#fff"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      {/* The leg, drawn separately so it keeps its own clean cap. */}
      <path
        d="M14.6 16.6 20.4 22.4"
        stroke="#fff"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
