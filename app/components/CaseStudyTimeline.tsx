import type { TimelineBand, TimelineTask } from "@/app/components/caseStudyTypes";

const ROW_HEIGHT = 40;
const ROW_GAP = 28;

export default function CaseStudyTimeline({
  heading,
  totalWeeks,
  bands,
  tasks,
}: {
  heading: string;
  totalWeeks: number;
  bands: TimelineBand[];
  tasks: TimelineTask[];
}) {
  const rowCount = Math.max(...tasks.map((t) => t.row)) + 1;
  const chartHeight = rowCount * ROW_HEIGHT + (rowCount - 1) * ROW_GAP;

  const pct = (week: number) => (week / totalWeeks) * 100;
  const bandColor = (bandLabel: string) =>
    bands.find((b) => b.label === bandLabel)?.colorClass ?? "bg-neutral-900";

  return (
    <section id="timeline" className="mx-auto max-w-4xl px-6 py-24 sm:px-10 sm:py-32">
      <h2 className="font-[family-name:var(--font-manrope)] text-3xl font-semibold text-neutral-900 sm:text-4xl">
        {heading}
      </h2>

      <div className="mt-16 overflow-x-auto sm:mt-20">
        <div className="min-w-[640px] rounded-2xl border border-black/[0.06] bg-white p-6 shadow-soft sm:p-8">
          {/* Phase bands — colored strip + label */}
          <div className="flex gap-1.5">
            {bands.map((band) => (
              <div key={band.label} style={{ width: `${pct(band.endWeek - band.startWeek)}%` }}>
                <div className={`h-1.5 rounded-full ${band.colorClass}`} />
                <p className="mt-2.5 flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
                  <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${band.colorClass}`} />
                  {band.label}
                </p>
              </div>
            ))}
          </div>

          {/* Task bars — label sits above its bar so title length never depends on bar width */}
          <div className="relative mt-7" style={{ height: chartHeight }}>
            {tasks.map((task, i) => (
              <div
                key={i}
                className="group absolute"
                style={{
                  left: `${pct(task.startWeek)}%`,
                  width: `${pct(task.endWeek - task.startWeek)}%`,
                  top: task.row * (ROW_HEIGHT + ROW_GAP),
                  minWidth: "2.5rem",
                }}
              >
                <p className="mb-1.5 w-max max-w-[12rem] text-xs font-medium whitespace-nowrap text-neutral-600">
                  {task.title}
                </p>
                <div
                  className={`h-2.5 w-full rounded-full ${bandColor(task.band)} transition-transform duration-200 ease-out group-hover:scale-y-125`}
                />
              </div>
            ))}
          </div>

          {/* Week axis */}
          <div className="mt-8 flex border-t border-black/[0.08] pt-4">
            {Array.from({ length: totalWeeks }).map((_, i) => (
              <div key={i} className="flex-1 text-xs font-medium text-neutral-400">
                {i % 2 === 0 ? `Week ${i + 1}` : ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
