import type { Metadata } from "next";
import { Griffy, Inter, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CustomCursor from "@/app/components/CustomCursor";
import { AboutPanelProvider } from "@/app/components/AboutPanelContext";
import AppShell from "@/app/components/AppShell";
import { pageMetadata, siteDescription, siteName, siteUrl } from "@/app/data/seo";

// The sans: one family, Inter, used the way Apple uses SF. Its optical-size axis
// gives large type a tighter, finer cut ("display") and small type a sturdier,
// looser one ("text"), so headings and body are the same typeface at two
// voices (.font-display and the default in globals.css).
// The welcome line only: a simple, current serif that sits comfortably beside Inter.
const welcome = Instrument_Serif({
  variable: "--font-welcome",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
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
      className={`${inter.variable} ${serif.variable} ${welcome.variable} h-full antialiased`}
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
