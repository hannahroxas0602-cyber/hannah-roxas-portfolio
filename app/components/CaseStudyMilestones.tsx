import CaseStudySection from "@/app/components/CaseStudySection";

// A dated milestone list, built to be read in one glance: the span up top, then one
// tight row per milestone (date on the left, a rail with a dot, then the title and one
// short line), separated by hairlines instead of cards so the whole story fits on one
// screen. The most recent milestone is marked in the accent. (The Gantt chart is for
// work planned in weeks; this is for work told as a series of dated moments.)
export type Milestone = { slug: string; date: string; title: string; body: string };

export default function CaseStudyMilestones({
  heading,
  items,
}: {
  heading: string;
  items: Milestone[];
}) {
  const first = items[0]?.date.replace(/,.*$/, "");
  const last = items[items.length - 1]?.date.replace(/,.*$/, "");
  return (
    <CaseStudySection
      id="timeline"
      kicker="How it unfolded"
      heading={heading}
      intro={items.length > 1 ? `${items.length} milestones, ${first} to ${last}.` : undefined}
    >
      <ol className="relative">
        <span aria-hidden className="absolute top-3 bottom-3 left-[5px] w-px bg-black/[0.1] sm:left-[7.5rem]" />
        {items.map((item, i) => {
          const latest = i === items.length - 1;
          return (
            <li
              key={item.slug}
              id={item.slug}
              className="relative scroll-mt-28 border-t border-black/[0.06] py-4 pl-6 first:border-t-0 sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-x-0 sm:pl-0"
            >
              <span
                aria-hidden
                className={`absolute top-[1.4rem] left-0 size-[11px] rounded-full ring-4 ring-background sm:left-[calc(7.5rem-5px)] ${
                  latest ? "bg-accent" : "bg-neutral-300"
                }`}
              />
              <p className="font-label text-xs font-medium text-neutral-500 sm:pt-0.5 sm:pr-6 sm:text-right">
                {item.date}
              </p>
              <div className="mt-1 sm:mt-0 sm:pl-6">
                <h3 className="font-display text-base font-semibold text-neutral-950">{item.title}</h3>
                <p className="mt-0.5 max-w-2xl text-sm leading-relaxed text-neutral-500">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </CaseStudySection>
  );
}
