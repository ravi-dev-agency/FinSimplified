import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { site } from "@/data/site";
import "./globals.css";

/** One typeface, used everywhere. Plain and utilitarian on purpose. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Plain-English chapters on investing, insurance, credit and borrowing, written for beginners in India. Free, with no signup.";

export const metadata: Metadata = {
  /**
   * metadataBase turns every relative image path into an absolute URL, which
   * is what social platforms require. Without it they silently show nothing.
   */
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    /** Inner pages set their own title; this appends the brand. */
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.author.name }],
  keywords: [
    "personal finance India",
    "investing for beginners",
    "mutual funds",
    "SIP",
    "emergency fund",
    "term insurance",
    "health insurance",
    "credit score",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#1f5fa0",
  width: "device-width",
  initialScale: 1,
  /** Never block pinch-zoom — it is an accessibility failure, not a polish. */
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-link focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
