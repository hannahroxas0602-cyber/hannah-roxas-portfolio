import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import ProjectsTabbed from "@/app/components/ProjectsTabbed";
import Services from "@/app/components/Services";
import Footer from "@/app/components/Footer";
import FadeIn from "@/app/components/FadeIn";

export const metadata: Metadata = {
  title: "Hannah Roxas | UX & Product Designer",
  description:
    "Hannah Roxas is a UX and visual designer who designs connected digital systems that reward curiosity. Product design, UX research, and brand systems.",
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background">
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
