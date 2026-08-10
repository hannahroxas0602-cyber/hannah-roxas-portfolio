import type { TimelineBand, TimelineTask } from "@/app/continuum/continuum/data";

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
    <section id="timeline" className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
      <h2 className="font-[family-name:var(--font-manrope)] text-3xl font-semibold text-neutral-900 italic">
        {heading}
      </h2>

      <div className="mt-10 overflow-x-auto">
        <div className="min-w-[560px]">
          {/* Category bands */}
          <div className="flex gap-1">
            {bands.map((band) => (
              <div
                key={band.label}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium text-white ${band.colorClass}`}
                style={{ width: `${pct(band.endWeek - band.startWeek)}%` }}
              >
                {band.label}
              </div>
            ))}
          </div>

          {/* Task bars */}
          <div className="relative mt-3" style={{ height: chartHeight }}>
            {/* week gridlines */}
            <div className="absolute inset-0 flex">
              {Array.from({ length: totalWeeks }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full flex-1 ${i % 2 === 0 ? "bg-black/[0.03]" : "bg-transparent"}`}
                />
              ))}
            </div>

            {tasks.map((task, i) => (
              <div
                key={i}
                className={`absolute flex items-center overflow-visible rounded-lg px-3 text-xs whitespace-nowrap text-neutral-700 ${task.colorClass}`}
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
          <div className="mt-4 flex border-t border-black/[0.08] pt-3">
            {Array.from({ length: totalWeeks }).map((_, i) => (
              <div
                key={i}
                className="flex-1 border-l border-black/[0.08] pl-3 text-sm text-neutral-500 first:border-l-0 first:pl-0"
              >
                Week {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
