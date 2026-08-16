"use client";

import Link from "next/link";
import { social } from "@/app/data/social";
import { useAboutPanel } from "@/app/components/AboutPanelContext";

export default function Footer() {
  const { open: openAbout } = useAboutPanel();

  return (
    <footer className="relative overflow-hidden">
      {/* Neon gradient the glass panel floats above, smoothly fading to the page background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--background) 0%, rgba(215, 234, 75, 0.35) 20%, rgba(223, 165, 235, 0.4) 50%, rgba(232, 95, 224, 0.3) 75%, var(--background) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="rounded-3xl border border-black/[0.06] bg-white/60 px-6 py-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-neutral-500 uppercase">
                Get in touch
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-manrope)] text-3xl leading-[1.05] text-neutral-900 sm:text-4xl">
                Thanks for wandering.
              </h2>
            </div>

            <a
              href={`mailto:${social.email}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Email me"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-2.5 text-sm font-medium text-neutral-900 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 hover:bg-white"
            >
              Say hello
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-6 border-t border-black/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-medium text-neutral-900">Hannah Roxas</span>

            <div className="flex gap-x-8 gap-y-2 sm:gap-x-10">
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
              <button
                type="button"
                onClick={openAbout}
                className="link-underline w-fit text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
              >
                About
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
