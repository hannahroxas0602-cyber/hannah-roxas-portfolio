import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/app/components/CustomCursor";
import { AboutPanelProvider } from "@/app/components/AboutPanelContext";
import AppShell from "@/app/components/AppShell";

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

const interLabel = Inter({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const siteTitle = "Hannah Roxas | Portfolio";
const siteDescription =
  "Hannah Roxas is a UX and visual designer who designs connected digital systems that reward curiosity.";
const siteUrl = "https://www.hannahroxas.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
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
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    images: [
      {
        url: "/images/Link_preview_final.png",
        width: 2878,
        height: 1556,
        alt: "Hannah Roxas — Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/Link_preview_final.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${interDisplay.variable} ${interLabel.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden md:cursor-none">
        <AboutPanelProvider>
          <AppShell>{children}</AppShell>
        </AboutPanelProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
