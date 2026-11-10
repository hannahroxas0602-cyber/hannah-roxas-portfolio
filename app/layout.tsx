import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Newsreader, Pacifico } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CustomCursor from "@/app/components/CustomCursor";
import Loader from "@/app/components/Loader";
import ScrollReveal from "@/app/components/ScrollReveal";
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

// A cursive for the icing on the contact biscuit, and nowhere else.
// Small mono labels (index numbers, kickers, tags): the editorial detail.
const mono = IBM_Plex_Mono({ variable: "--font-mono-label", subsets: ["latin"], weight: ["400", "500"] });
const script = Pacifico({ variable: "--font-script", subsets: ["latin"], weight: "400" });

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
      suppressHydrationWarning
      className={`${inter.variable} ${welcome.variable} ${script.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        {/* A repeat visit in this tab skips the opening fall; mark it before first paint so the
            loader never flashes (see Loader.tsx). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("hannah-theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}try{if(sessionStorage.getItem("hannah-fell")&&!/[?&]fall\\b/.test(location.search))document.documentElement.dataset.fell="1"}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col overflow-x-clip overscroll-y-contain md:cursor-none">
        <AboutPanelProvider>
          <AppShell>{children}</AppShell>
        </AboutPanelProvider>
        <Loader />
        {/* A transparent, fixed full-screen layer that only exists to be a named piece of the page
            transition, so the lip of the opening hole can be drawn on top (see globals.css). */}
        <div aria-hidden className="hole-ring" />
        <ScrollReveal />
        <CustomCursor />
        <Analytics />
      </body>
    </html>
  );
}
