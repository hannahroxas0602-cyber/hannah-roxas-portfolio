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
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:px-10 sm:pt-20">
          <HoleLink direction="out"
            href="/"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
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
