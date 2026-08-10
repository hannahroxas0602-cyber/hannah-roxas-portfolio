import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import ProjectGrid from "@/app/components/ProjectGrid";
import About from "@/app/components/About";
import Services from "@/app/components/Services";
import Footer from "@/app/components/Footer";
import FadeIn from "@/app/components/FadeIn";
import { projects } from "@/app/data/projects";

export default function Home() {
  const uiuxProjects = projects.filter((p) => p.category === "UIUX");
  const graphicDesignProjects = projects.filter((p) => p.category === "Graphic Design");

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <FadeIn>
          <ProjectGrid projects={uiuxProjects} title="UIUX" id="works" />
        </FadeIn>
        <FadeIn>
          <ProjectGrid projects={graphicDesignProjects} title="Graphic Design" id="graphic-design-works" />
        </FadeIn>
        <FadeIn>
          <About />
        </FadeIn>
        <FadeIn>
          <Services />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
