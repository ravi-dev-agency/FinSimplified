import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * The card social platforms show when someone shares a link.
 *
 * Generated rather than a static file so it always carries the current
 * tagline, and drawn in the site's own palette so a shared link looks like
 * the page it opens. 1200x630 is the size every platform crops from.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* The rupee drawn as strokes, not a glyph: the image renderer
              has no font with ₹ and would emit an empty box. */}
          <svg width="44" height="44" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#1668cc" />
            <path
              d="M11.2 8.6h9.6 M11.2 12.6h9.6 M11.2 16.6h4.2c2.9 0 4.9-1.8 4.9-4.3"
              stroke="#fff"
              strokeWidth="2.3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M14.6 16.6 20.4 22.4"
              stroke="#fff"
              strokeWidth="2.3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#1a1d21" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 70,
              fontWeight: 800,
              color: "#1a1d21",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Finance, made simple
          </div>
          <div style={{ fontSize: 30, color: "#5b6169", lineHeight: 1.4 }}>
            Plain-English chapters on money, for beginners in India.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#8a9099" }}>
          Free · No signup · Nothing is sold here
        </div>
      </div>
    ),
    size,
  );
}
