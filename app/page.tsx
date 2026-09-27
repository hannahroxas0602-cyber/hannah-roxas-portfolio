import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import ProjectsTabbed from "@/app/components/ProjectsTabbed";
import Services from "@/app/components/Services";
import Footer from "@/app/components/Footer";
import FadeIn from "@/app/components/FadeIn";
import ScrollToHash from "@/app/components/ScrollToHash";
import { pageMetadata, siteDescription, siteName } from "@/app/data/seo";

export const metadata: Metadata = pageMetadata({
  title: siteName,
  description: siteDescription,
  path: "/",
});

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <ScrollToHash />
      <Header />
      <main className="flex-1">
        <Hero />
        <FadeIn>
          <ProjectsTabbed id="works" />
        </FadeIn>
        <FadeIn>
          <Services />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
