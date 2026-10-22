import { aboutIntro, availability, experience, process } from "@/app/about/data";
import { filled } from "@/app/data/placeholder";
import { social } from "@/app/data/social";

const label =
  "font-[family-name:var(--font-mono)] text-xs font-semibold tracking-widest text-neutral-400 uppercase";

// Full-page version of the About side panel, so /about can be linked and indexed.
export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-16 sm:px-10 sm:pb-24">
      <p className="text-lg text-neutral-500">
        <span className="mr-1 font-[family-name:var(--font-mono)] text-sm tracking-wide">
          {aboutIntro.eyebrow}
        </span>
        <span className="text-black">{aboutIntro.title}</span>
      </p>

      <h1
        className="mt-6 max-w-2xl font-[family-name:var(--font-manrope)] font-semibold tracking-tight text-neutral-900"
        style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", lineHeight: 1.05 }}
      >
        Hannah Roxas
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600">{aboutIntro.tagline}</p>
      {filled(aboutIntro.bio) && (
        <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600">{aboutIntro.bio}</p>
      )}

      <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <p className={label}>Availability</p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-700">
            {availability.summary}
          </p>
        </div>
        <div>
          <p className={label}>Process</p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-700">
            {process.steps.join(" → ")}
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500">{process.summary}</p>
        </div>
      </div>

      <p className={`mt-16 ${label}`}>Experience</p>
      <div className="relative mt-8 ml-3 sm:ml-6">
        <div className="absolute top-2 bottom-2 left-0 w-px bg-black/[0.1]" />

        {experience.map((entry) => (
          <div key={entry.slug} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
            <span className="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-black bg-[var(--background)]" />

            <p className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-neutral-400 uppercase">
              {entry.dates}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-manrope)] text-2xl text-black sm:text-3xl">
              {entry.role}
            </h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-neutral-500">
              {entry.context}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-black/[0.08] pt-6">
        <a
          href={`mailto:${social.email}`}
          data-cursor="Email me"
          className="link-underline w-fit text-sm font-medium text-neutral-700"
        >
          {social.email}
        </a>
        {[
          { label: "LinkedIn", href: social.linkedin },
          { label: "GitHub", href: social.github },
          { label: "Resume", href: social.resume },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline w-fit text-sm font-medium text-neutral-700"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
