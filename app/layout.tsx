import type { Metadata } from "next";
import { Fraunces, Great_Vibes, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CustomCursor from "@/app/components/CustomCursor";
import { AboutPanelProvider } from "@/app/components/AboutPanelContext";
import AppShell from "@/app/components/AppShell";
import { pageMetadata, siteDescription, siteName, siteUrl } from "@/app/data/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const interDisplay = Inter({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// The storybook voice: a soft, slightly quirky serif, used only for single
// emphasis words and phrases (the .serif-em class in globals.css).
const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

// Formal pen script, for the one line of handwriting-style lettering (the hero's
// welcome); see .script in globals.css.
const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const interLabel = Inter({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
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
      className={`${inter.variable} ${interDisplay.variable} ${interLabel.variable} ${serif.variable} ${script.variable} h-full antialiased`}
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
