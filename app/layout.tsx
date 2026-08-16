import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/app/components/CustomCursor";
import { AboutPanelProvider } from "@/app/components/AboutPanelContext";
import AppShell from "@/app/components/AppShell";

const bodyMono = IBM_Plex_Mono({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  variable: "--font-manrope",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const labelMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Hannah Roxas — Portfolio",
  description:
    "Hannah Roxas is a UX and visual designer who designs connected digital systems that reward curiosity.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bodyMono.variable} ${newsreader.variable} ${labelMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col md:cursor-none">
        <AboutPanelProvider>
          <AppShell>{children}</AppShell>
        </AboutPanelProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
