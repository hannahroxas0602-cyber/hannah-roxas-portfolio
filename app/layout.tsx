import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CustomCursor from "@/app/components/CustomCursor";
import { AboutPanelProvider } from "@/app/components/AboutPanelContext";
import AppShell from "@/app/components/AppShell";
import { pageMetadata, siteDescription, siteName, siteUrl } from "@/app/data/seo";

// The sans: one family, Inter, used the way Apple uses SF. Its optical-size axis gives
// large type a tighter, finer cut ("display") and small type a sturdier, looser one
// ("text"), so headings and body are the same typeface at two voices (.font-display
// and the default in globals.css).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

// The serif: Newsreader, warm and bookish, the closest free match to the editorial
// reference, and comfortable beside Inter. The hero statement, the welcome line, the
// footer headline, the mobile menu, and every emphasis word ("Selected", "What I Do",
// the page titles) use it: upright, with italic for emphasis. Its optical-size axis
// tightens it at headline sizes.
const welcome = Newsreader({
  variable: "--font-welcome",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata({ title: siteName, description: siteDescription, path: "/" }),
  icons: {
    icon: [
      {
        url: "/favicon-black.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-white.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${welcome.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip overscroll-y-contain md:cursor-none">
        <AboutPanelProvider>
          <AppShell>{children}</AppShell>
        </AboutPanelProvider>
        <CustomCursor />
        <Analytics />
      </body>
    </html>
  );
}
