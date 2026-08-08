import { social } from "@/app/data/social";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
        <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
          Thanks for wandering.
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
          Built with care, curiosity, and a few good questions.
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-black/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-neutral-900">
            Hannah Roxas
          </span>

          <div className="flex gap-6">
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
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
