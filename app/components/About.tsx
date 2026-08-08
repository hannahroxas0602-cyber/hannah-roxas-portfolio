import { aboutIntro, experience } from "@/app/about/data";

export default function About() {
  return (
    <section id="about1" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 sm:px-10 sm:py-24">
      <p className="text-lg text-neutral-500">
        <span className="mr-1">{aboutIntro.eyebrow}</span>
        <span className="text-black">{aboutIntro.title}</span>
      </p>

      <div className="mt-10 border-t border-black/[0.08]">
        {experience.map((entry) => (
          <div
            key={entry.slug}
            className="flex flex-col gap-1 border-b border-black/[0.08] py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <div>
              <h2 className="text-lg font-normal text-black">{entry.role}</h2>
              <p className="mt-1 text-base leading-relaxed text-neutral-500">
                {entry.context}
              </p>
            </div>
            <p className="text-base text-neutral-500 sm:flex-none sm:text-right">
              {entry.dates}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
