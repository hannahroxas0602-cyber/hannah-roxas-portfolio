import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import ProjectsTabbed from "@/app/components/ProjectsTabbed";
import Footer from "@/app/components/Footer";
import FadeIn from "@/app/components/FadeIn";
import ScrollToHash from "@/app/components/ScrollToHash";
import Testimonial, { hasTestimonial } from "@/app/components/Testimonial";
import { testimonial } from "@/app/learvo/data";
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
        {/* Renders only once a real quote is filled in (see learvo/data.ts). */}
        {hasTestimonial(testimonial) && (
          <FadeIn>
            <section className="mx-auto max-w-6xl px-6 pb-8 sm:px-10">
              <Testimonial testimonial={testimonial} />
            </section>
          </FadeIn>
        )}
      </main>
      <Footer />
    </div>
  );
}
