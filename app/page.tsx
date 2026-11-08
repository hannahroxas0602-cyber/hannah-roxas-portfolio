import type { Metadata } from "next";
import Header from "@/app/components/Header";
import HoleHero from "@/app/components/HoleHero";
import Hall from "@/app/components/Hall";
import WhatIDo from "@/app/components/WhatIDo";
import Footer from "@/app/components/Footer";
import ScrollToHash from "@/app/components/ScrollToHash";
import ScrollRail from "@/app/components/ScrollRail";
import ChatWidget from "@/app/components/ChatWidget";
import { pageMetadata, siteDescription, siteName } from "@/app/data/seo";

export const metadata: Metadata = pageMetadata({
  title: siteName,
  description: siteDescription,
  path: "/",
});

// The home page is a fall. You start at the clock at the edge of a rabbit hole (who I am, and my work as
// its hours), fall through its pivot as you scroll (Alice's line and a miles counter), land in a hall of
// gates (the projects), climb out into the light (what I do), and end where the page always ended: the
// footer, with a tea set and a biscuit that copies my email (it does that on every page). A loader
// (Loader.tsx) opens the same fall on a first visit, and the White Rabbit in the corner answers
// questions (ChatWidget). See each component for the idea behind it.
export default function Home() {
  return (
    <div className="orb-theme relative flex flex-1 flex-col bg-white">
      <ScrollRail />
      <ScrollToHash />
      <ChatWidget variant="rabbit" />
      <Header />
      <main className="flex-1">
        <HoleHero />
        <Hall />
        <WhatIDo />
      </main>
      <Footer />
    </div>
  );
}
