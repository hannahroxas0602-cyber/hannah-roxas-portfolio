import Link from "next/link";
import { social } from "@/app/data/social";

export default function Footer() {
  return (
    <footer className="relative">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 sm:px-10 sm:pt-24">
        <div className="rounded-3xl border border-black/[0.06] bg-white/70 px-8 py-14 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150 sm:px-14 sm:py-20">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-neutral-500 uppercase">
            Get in touch
          </p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-manrope)] text-4xl leading-[1.05] text-neutral-900 sm:text-6xl">
            Thanks for wandering.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600">
            Built with care, curiosity, and a few good questions.
          </p>

          <a
            href={`mailto:${social.email}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Email me"
            className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/60 px-6 py-3 text-sm font-medium text-neutral-900 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 hover:bg-white"
          >
            Say hello
            <span aria-hidden>→</span>
          </a>

          <div className="mt-16 flex flex-col gap-8 border-t border-black/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-medium text-neutral-900">Hannah Roxas</span>

            <div className="flex gap-x-10 gap-y-2 sm:gap-x-12">
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline w-fit text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
              >
                LinkedIn
              </a>
              <Link
                href="/#works"
                className="link-underline w-fit text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
              >
                Works
              </Link>
              <Link
                href="/#about1"
                className="link-underline w-fit text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Neon gradient fading to white at the very bottom of the page */}
      <div
        className="h-32 w-full sm:h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(215, 234, 75, 0.55) 35%, rgba(232, 95, 224, 0.5) 70%, var(--background) 100%)",
        }}
      />
    </footer>
  );
}
