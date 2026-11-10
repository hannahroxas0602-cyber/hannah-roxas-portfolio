import { aboutIntro, aiBlurb, availability, experience, process } from "@/app/about/data";
import { SHOW_TODOS, filled, todoLabel } from "@/app/data/placeholder";
import { social } from "@/app/data/social";
import ScrollFillList from "@/app/components/ScrollFillList";
import Melt from "@/app/components/Melt";
import Image from "next/image";
import { Em } from "@/app/components/Em";

const label = "font-label text-[11px] font-medium tracking-[0.16em] text-neutral-500 uppercase";

// a few frames from outside work: tilted prints, each with a caption
const PRINTS = [
  { src: "/images/about/aboutfirst.webp", caption: "hello", tilt: "-rotate-3" },
  { src: "/images/about/beach.webp", caption: "reset", tilt: "rotate-2" },
  { src: "/images/about/brunch.webp", caption: "fuel", tilt: "-rotate-1" },
  { src: "/images/about/cat.webp", caption: "the real boss", tilt: "rotate-3" },
];

// Full-page About, set like the home page: a mono eyebrow, a large statement with one serif word, tilted
// prints, soft panels for availability / process, and the experience timeline.
export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 pb-20 sm:px-10 sm:pb-28">
      <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[14rem_1fr]">
        <p className={`${label} lg:pt-4`}>
          ({aboutIntro.eyebrow}) {aboutIntro.title}
        </p>
        <div>
          <h1 className="max-w-4xl text-[clamp(2.4rem,6.4vw,5.6rem)] leading-[1.02] font-medium tracking-[-0.04em] text-neutral-950">
            <Melt as="span" className="block" mode="load" delay={0.2} maxBlur={3.4}>
              I follow the rabbit from sketch to <Em>shipped</Em> code.
            </Melt>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">{aboutIntro.tagline}</p>
          {filled(aboutIntro.bio) && <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600">{aboutIntro.bio}</p>}
        </div>
      </div>

      <ul className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {PRINTS.map((p, i) => (
          <li key={p.src} className={`${p.tilt} ${i % 2 ? "sm:translate-y-8" : ""} transition-transform duration-500 hover:z-10 hover:rotate-0 hover:scale-[1.03]`}>
            <figure className="rounded-2xl bg-white p-2 pb-1 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-panel-2">
                <Image src={p.src} alt="" fill sizes="(min-width:640px) 25vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="font-label py-2 text-center text-[10.5px] tracking-widest text-neutral-500 uppercase">{p.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-24 grid gap-4 sm:mt-28 sm:grid-cols-2">
        <div className="rounded-3xl bg-panel p-7 sm:p-9">
          <p className={label}>Availability</p>
          <p className="mt-4 max-w-md text-xl leading-snug font-medium tracking-[-0.02em] text-neutral-900">{availability.summary}</p>
        </div>
        <div className="rounded-3xl bg-panel p-7 sm:p-9">
          <p className={label}>Process</p>
          <ol className="mt-4 flex flex-wrap gap-2">
            {process.steps.map((st, i) => (
              <li key={st} className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-neutral-900 ring-1 ring-black/5">
                <span className="font-label mr-2 text-[10px] text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                {st}
              </li>
            ))}
          </ol>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">{process.summary}</p>
          {(filled(aiBlurb) || SHOW_TODOS) && (
            <div className="mt-6 border-t border-black/10 pt-5">
              <p className={label}>How I work with AI</p>
              {filled(aiBlurb) ? (
                <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-700">{aiBlurb}</p>
              ) : (
                <p className="mt-3 max-w-md rounded-xl border border-dashed border-neutral-400 px-3 py-2 text-sm leading-relaxed text-neutral-600">{todoLabel(aiBlurb)}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-24 grid gap-x-12 gap-y-6 lg:grid-cols-[14rem_1fr]">
        <p className={`${label} lg:pt-2`}>(02) Experience</p>
        <ScrollFillList className="ml-3 sm:ml-6" trackClassName="top-2 bottom-2 left-0 -translate-x-1/2">
          {experience.map((entry, i) => (
            <li key={entry.slug} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
              <span aria-hidden className="rail-dot absolute top-[0.3rem] left-0 size-[13px] -translate-x-1/2" data-state={i === 0 ? "active" : "passed"} />
              <p className="font-label text-xs leading-6 tracking-wide text-neutral-500 uppercase">{entry.dates}</p>
              <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-neutral-950 sm:text-3xl">
                <Melt as="span" className="block">{entry.role}</Melt>
              </h2>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-neutral-500">{entry.context}</p>
            </li>
          ))}
        </ScrollFillList>
      </div>

      <div className="mt-20 flex flex-wrap items-center gap-3">
        <a href={`mailto:${social.email}`} data-cursor="Email me" className="btn btn-dark">{social.email}</a>
        {[
          { label: "LinkedIn", href: social.linkedin, cursor: "Connect" },
          { label: "GitHub", href: social.github, cursor: "See my code" },
          { label: "Resume", href: social.resume, cursor: "View resume" },
        ].map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" data-cursor={link.cursor} className="btn btn-ghost">
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
