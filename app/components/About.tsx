import { aboutIntro, aiBlurb, availability, experience, process } from "@/app/about/data";
import { SHOW_TODOS, filled, todoLabel } from "@/app/data/placeholder";
import { social } from "@/app/data/social";
import ScrollFillList from "@/app/components/ScrollFillList";
import Melt from "@/app/components/Melt";

const label =
  "font-label text-xs font-semibold tracking-widest text-neutral-400 uppercase";

// Full-page version of the About side panel, so /about can be linked and indexed.
export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-16 sm:px-10 sm:pb-24">
      <p className="text-lg text-neutral-500">
        <span className="mr-1 font-label text-sm tracking-wide">
          {aboutIntro.eyebrow}
        </span>
        <span className="text-black">{aboutIntro.title}</span>
      </p>

      <h1
        className="welcome mt-6 max-w-2xl tracking-[-0.02em] text-neutral-950"
        style={{ fontSize: "clamp(2.25rem, 4.6vw, 3.6rem)", lineHeight: 1.04 }}
      ><Melt as="span" className="block" mode="load" delay={0.3} maxBlur={3.4}>
        Hannah Roxas
      </Melt></h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600">{aboutIntro.tagline}</p>
      {filled(aboutIntro.bio) && (
        <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600">{aboutIntro.bio}</p>
      )}

      <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div className="border-t border-neutral-900/10 pt-5">
          <p className={label}>Availability</p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-700">
            {availability.summary}
          </p>
        </div>
        <div className="border-t border-neutral-900/10 pt-5">
          <p className={label}>Process</p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-700">
            {process.steps.join(" → ")}
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500">{process.summary}</p>

          {(filled(aiBlurb) || SHOW_TODOS) && (
            <div className="mt-8">
              <p className={label}>How I work with AI</p>
              {filled(aiBlurb) ? (
                <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-700">{aiBlurb}</p>
              ) : (
                <p className="mt-3 max-w-md rounded-xl border border-dashed border-neutral-400 px-3 py-2 text-sm leading-relaxed text-neutral-600">
                  {todoLabel(aiBlurb)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <p className={`mt-16 ${label}`}>Experience</p>
      <ScrollFillList
        className="mt-8 ml-3 sm:ml-6"
        trackClassName="top-2 bottom-2 left-0 -translate-x-1/2"
      >
        {experience.map((entry, i) => (
          <li key={entry.slug} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
            <span
              aria-hidden
              className="rail-dot absolute top-[0.3rem] left-0 size-[13px] -translate-x-1/2"
              data-state={i === 0 ? "active" : "passed"}
            />
            <p className="font-label text-xs leading-6 tracking-wide text-neutral-500 uppercase">
              {entry.dates}
            </p>
            <h2 className="mt-2 font-display text-2xl text-black sm:text-3xl"><Melt as="span" className="block">{entry.role}</Melt></h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-neutral-500">{entry.context}</p>
          </li>
        ))}
      </ScrollFillList>

      <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-black/[0.08] pt-6">
        <a
          href={`mailto:${social.email}`}
          data-cursor="Email me"
          className="link-underline w-fit text-sm font-medium text-neutral-700"
        >
          {social.email}
        </a>
        {[
          { label: "LinkedIn", href: social.linkedin, cursor: "Connect" },
          { label: "GitHub", href: social.github, cursor: "See my code" },
          { label: "Resume", href: social.resume, cursor: "View resume" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={link.cursor}
            className="link-underline w-fit text-sm font-medium text-neutral-700"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
