import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/app/components/CustomCursor";

const bodyMono = IBM_Plex_Mono({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
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
      className={`${bodyMono.variable} ${fraunces.variable} ${labelMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col md:cursor-none">
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
