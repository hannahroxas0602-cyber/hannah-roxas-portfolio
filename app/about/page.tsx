import type { Metadata } from "next";
import { caseStudyTitle, pageMetadata } from "@/app/data/seo";
import Header from "@/app/components/Header";
import HoleLink from "@/app/components/HoleLink";
import Footer from "@/app/components/Footer";
import About from "@/app/components/About";
import { aboutIntro, availability } from "@/app/about/data";

export const metadata: Metadata = pageMetadata({
  title: caseStudyTitle("About"),
  description: `${aboutIntro.tagline} ${availability.summary}`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <main className="relative mx-auto w-full max-w-7xl flex-1 border-x border-neutral-200/80">
        <div className="px-6 pt-24 pb-10 sm:px-10 sm:pt-28">
          <HoleLink direction="out"
            href="/"
            className="group/back inline-flex items-center gap-1.5 rounded-full bg-panel px-3.5 py-1.5 text-sm font-medium text-neutral-700 ring-1 ring-black/[0.05] transition-colors hover:bg-panel-2 hover:text-neutral-950"
          >
            ← Back to home
          </HoleLink>
        </div>
        <About />
      </main>
      <Footer />
    </div>
  );
}
