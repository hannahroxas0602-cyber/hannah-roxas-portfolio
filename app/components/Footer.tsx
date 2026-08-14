import Link from "next/link";
import { social } from "@/app/data/social";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-neutral-900">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 55%), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.1), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-white/50 uppercase">
          Get in touch
        </p>
        <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-manrope)] text-4xl leading-[1.05] text-white sm:text-6xl">
          Thanks for wandering.
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
          Built with care, curiosity, and a few good questions.
        </p>

        <a
          href={`mailto:${social.email}`}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Email me"
          className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 hover:bg-white/15"
        >
          Say hello
          <span aria-hidden>→</span>
        </a>

        <div className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-white/70">Hannah Roxas</span>

          <div className="flex gap-x-10 gap-y-2 sm:gap-x-12">
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline w-fit text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              LinkedIn
            </a>
            <Link
              href="/#works"
              className="link-underline w-fit text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Works
            </Link>
            <Link
              href="/#about1"
              className="link-underline w-fit text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
