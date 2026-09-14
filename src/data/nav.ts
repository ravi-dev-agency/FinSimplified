import { BookOpen, Calculator, Home, Newspaper } from "lucide-react";

export const mainNav = [
  { label: "Learn", href: "/learn" },
  { label: "Articles", href: "/articles" },
  { label: "Calculators", href: "/calculators" },
];

/**
 * Five items max — anything more is unusable on a 375px screen.
 * Articles earns a slot here because it updates weekly.
 */
export const mobileNav = [
  { label: "Home", href: "/", icon: Home },
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "Articles", href: "/articles", icon: Newspaper },
  { label: "Tools", href: "/calculators", icon: Calculator },
];
