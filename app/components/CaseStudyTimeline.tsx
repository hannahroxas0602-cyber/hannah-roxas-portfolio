import type { TimelineBand, TimelineTask } from "@/app/components/caseStudyTypes";

const ROW_HEIGHT = 44;
const ROW_GAP = 10;

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

  return (
    <section id="timeline" className="mx-auto max-w-4xl px-6 py-24 sm:px-10 sm:py-32">
      <h2 className="font-[family-name:var(--font-manrope)] text-3xl font-semibold text-neutral-900 sm:text-4xl">
        {heading}
      </h2>

      <div className="mt-16 overflow-x-auto sm:mt-20">
        <div className="min-w-[560px]">
          {/* Category bands — colored strip + label */}
          <div className="flex gap-1.5">
            {bands.map((band) => (
              <div key={band.label} style={{ width: `${pct(band.endWeek - band.startWeek)}%` }}>
                <div className={`h-1.5 rounded-full ${band.colorClass}`} />
                <p className="mt-2.5 text-sm font-semibold text-neutral-900">{band.label}</p>
              </div>
            ))}
          </div>

          {/* Task bars */}
          <div className="relative mt-6" style={{ height: chartHeight }}>
            {tasks.map((task, i) => (
              <div
                key={i}
                className="absolute flex items-center overflow-visible rounded-full bg-neutral-900 px-4 text-xs font-medium whitespace-nowrap text-white shadow-sm"
                style={{
                  left: `${pct(task.startWeek)}%`,
                  width: `${pct(task.endWeek - task.startWeek)}%`,
                  top: task.row * (ROW_HEIGHT + ROW_GAP),
                  height: ROW_HEIGHT,
                }}
              >
                {task.title}
              </div>
            ))}
          </div>

          {/* Week axis */}
          <div className="mt-8 flex border-t border-black/[0.12] pt-4">
            {Array.from({ length: totalWeeks }).map((_, i) => (
              <div key={i} className="flex-1 text-xs font-medium text-neutral-500">
                {i % 2 === 0 ? `Week ${i + 1}` : ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
