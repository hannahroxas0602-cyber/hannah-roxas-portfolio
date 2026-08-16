"use client";

import Link from "next/link";
import { social } from "@/app/data/social";
import { useAboutPanel } from "@/app/components/AboutPanelContext";
import { CURSOR_COLOR } from "@/app/components/CustomCursor";

export default function Footer() {
  const { open: openAbout } = useAboutPanel();

  return (
    <footer data-cursor-invert className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-8 sm:px-10 sm:pt-16 sm:pb-10">
        {/* Headline — the focal moment, no card container */}
        <a
          href={`mailto:${social.email}`}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Email me"
          className="group block"
        >
          <p className="font-[family-name:var(--font-mono)] text-xs font-medium tracking-widest text-neutral-500 uppercase">
            Get in touch
          </p>
          <h2
            className="mt-3 font-[family-name:var(--font-manrope)] leading-[0.95] tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-[var(--footer-hover)]"
            style={
              {
                fontSize: "clamp(1.75rem, 5vw, 3rem)",
                "--footer-hover": CURSOR_COLOR,
              } as React.CSSProperties
            }
          >
            Curiouser and curiouser.{" "}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              className="inline-block h-[0.7em] w-[0.7em] align-[0.05em] transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2"
            >
              <path
                d="M7 17L17 7M17 7H8M17 7V16"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h2>
          <p className="mt-4 text-sm font-medium text-neutral-600 sm:text-base">
            {social.email}
          </p>
        </a>

        {/* Footer GIF — recolored black & white */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/footer.gif"
          alt=""
          className="mt-6 h-24 w-auto sm:h-32"
          style={{ filter: "grayscale(1) contrast(3) brightness(1.1)" }}
        />

        {/* Meta row */}
        <div className="mt-8 flex flex-col gap-6 border-t border-black/[0.08] pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-neutral-900">
            © {new Date().getFullYear()} Hannah Roxas
          </span>

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
    </footer>
  );
}
