import Link from "next/link";
import Header from "@/app/components/Header";
import HoleLink from "@/app/components/HoleLink";
import Footer from "@/app/components/Footer";
import { Em } from "@/app/components/Em";
import Melt from "@/app/components/Melt";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <title>Page not found | Hannah Roxas</title>
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-6 py-20 text-center sm:px-10 sm:py-28">
        {/* The Cheshire Cat, as in the book: only the grin is left, fading in and out of the dark. */}
        <div role="img" aria-label="A Cheshire Cat's grin floating in the dark" className="relative grid h-36 w-36 place-items-center overflow-hidden rounded-full bg-[#0e1216] sm:h-44 sm:w-44">
          <svg viewBox="0 0 120 120" className="cheshire size-full" aria-hidden>
            {/* A wide crescent, and the teeth cut into it. */}
            <path d="M9 50C24 104 96 104 111 50 99 74 82 83 60 83S21 74 9 50z" fill="#f4f6f7" />
            <path d="M31 70v20M43 78v21M55 82v22M65 82v22M77 78v21M89 70v20" stroke="#0e1216" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M4 40c3-1 6 0 8 2M116 40c-3-1-6 0-8 2" stroke="#8fc4c9" strokeWidth="2" strokeLinecap="round" className="cheshire-eye" />
          </svg>
        </div>

        <p className="mt-10 font-label text-xs font-medium tracking-widest text-neutral-400 uppercase">
          Error 404
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl"><Melt as="span" className="block" mode="load" delay={0.3} maxBlur={3.4}>
          Which way ought I to go from <Em>here?</Em>
        </Melt></h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-600">
          That depends a good deal on where you want to get to. This page doesn&apos;t
          exist, or it has moved. (We&apos;re all a little mad here.)
        </p>

        <HoleLink
          direction="out"
          href="/"
          data-cursor="Climb back up"
          className="link-underline mt-8 text-sm font-semibold text-neutral-900"
        >
          Climb back up →
        </HoleLink>
        <p className="mt-4 text-sm text-neutral-500">
          Or go to{" "}
          <Link href="/uiux" className="link-underline text-neutral-700">
            UI/UX
          </Link>{" "}
          or{" "}
          <Link
            href="/graphic-design"
            className="link-underline text-neutral-700"
          >
            Graphics
          </Link>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
}
