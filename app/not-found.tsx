import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import HoleLink from "@/app/components/HoleLink";
import Footer from "@/app/components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <title>Page not found | Hannah Roxas</title>
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-6 py-20 text-center sm:px-10 sm:py-28">
        {/* The same opening as the homepage hero: the rabbit, asleep at the bottom */}
        <div className="relative h-36 w-36 overflow-hidden rounded-full bg-black sm:h-44 sm:w-44">
          <Image
            src="/images/bunny_hero.png"
            alt="A sleeping white rabbit curled up in a dark burrow"
            fill
            sizes="176px"
            className="object-contain p-6"
          />
        </div>

        <p className="mt-10 font-[family-name:var(--font-mono)] text-xs font-medium tracking-widest text-neutral-400 uppercase">
          Error 404
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
          You&apos;ve fallen a little too far.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-600">
          This page doesn&apos;t exist, or it has moved.
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
