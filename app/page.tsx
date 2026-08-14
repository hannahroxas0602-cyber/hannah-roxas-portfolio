import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import ProjectsTabbed from "@/app/components/ProjectsTabbed";
import About from "@/app/components/About";
import Services from "@/app/components/Services";
import Footer from "@/app/components/Footer";
import FadeIn from "@/app/components/FadeIn";

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
