import CaseStudySection, { lightTile } from "@/app/components/CaseStudySection";

// A dated milestone list: a rail down the left with a dot for each entry, the
// date beside it, and the entry as a tile. The most recent is marked with the
// accent. Used where a case study's timeline is a series of dated moments
// (the Gantt chart is for work planned in weeks).
export type Milestone = { slug: string; date: string; title: string; body: string };

export default function CaseStudyMilestones({
  heading,
  items,
}: {
  heading: string;
  items: Milestone[];
}) {
  return (
    <CaseStudySection id="timeline" kicker="How it unfolded" heading={heading}>
      <ol className="relative">
        <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-black/[0.08] sm:left-[7.5rem]" />
        {items.map((item, i) => {
          const latest = i === items.length - 1;
          return (
            <li
              key={item.slug}
              id={item.slug}
              className="relative scroll-mt-28 pb-3 pl-6 last:pb-0 sm:grid sm:grid-cols-[7.5rem_1fr] sm:pl-0"
            >
              <span
                aria-hidden
                className={`absolute top-6 left-0 size-[11px] rounded-full ring-4 ring-background sm:left-[calc(7.5rem-5px)] ${
                  latest ? "bg-accent" : "bg-neutral-300"
                }`}
              />
              <p className="font-label text-xs font-medium text-neutral-500 sm:pt-[1.1rem] sm:pr-6 sm:text-right">
                {item.date}
              </p>
              <div className={`${lightTile} mt-1.5 p-5 sm:mt-0 sm:ml-5`}>
                <h3 className="font-display text-base font-semibold text-neutral-950">{item.title}</h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </CaseStudySection>
  );
}
