import Link from "next/link";
import { navLinks, social } from "@/app/data/social";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-manrope)] text-base font-semibold tracking-tight text-neutral-900"
        >
          Hannah Roxas
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${social.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Contact me
          </a>
        </div>

        {/* Mobile: condensed contact link */}
        <a
          href={`mailto:${social.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white md:hidden"
        >
          Email
        </a>
      </div>
    </header>
  );
}
