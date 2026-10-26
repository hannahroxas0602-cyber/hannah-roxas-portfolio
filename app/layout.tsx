import type { Metadata } from "next";
import { Bricolage_Grotesque, Griffy, Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CustomCursor from "@/app/components/CustomCursor";
import { AboutPanelProvider } from "@/app/components/AboutPanelContext";
import AppShell from "@/app/components/AppShell";
import { pageMetadata, siteDescription, siteName, siteUrl } from "@/app/data/seo";

// The sans, in two voices. Bricolage Grotesque for headings: current and a little
// quirky, with an optical-size axis so large type gets its finer, tighter cut
// (the .font-display class in globals.css). Instrument Sans for everything else:
// body, nav, small labels (the default, and .font-label).
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

// The storybook voice: Griffy, a quirky display face with curled letters, used
// only for single emphasis words and phrases (the .serif-em class in globals.css).
// It's a display font, so never for body text or anything small.
const serif = Griffy({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
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
      className={`${display.variable} ${body.variable} ${serif.variable} h-full antialiased`}
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
