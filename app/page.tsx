import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import ProjectGrid from "@/app/components/ProjectGrid";
import About from "@/app/components/About";
import Services from "@/app/components/Services";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProjectGrid />
        <About />
        <Services />
      </main>
      <Footer />
    </div>
  );
}
