import type { CaseStudyTldr as Tldr } from "@/app/components/caseStudyTypes";
import { filled } from "@/app/data/placeholder";
import { darkTile, lightTile } from "@/app/components/CaseStudySection";

// Skimmable summary for recruiters: Problem / My role / What I did / Result, as a
// 2x2 of tiles. The Result gets the dark tile, the same way each section below
// puts its one takeaway in dark.
export default function CaseStudyTldr({ tldr }: { tldr: Tldr }) {
  const result = filled(tldr.resultMetric) ? `${tldr.result} ${tldr.resultMetric}` : tldr.result;
  const tiles = [
    { label: "Problem", value: tldr.problem },
    { label: "My role", value: tldr.role },
    { label: "What I did", value: tldr.whatIDid },
    { label: "Result", value: result, dark: true },
  ].filter((t) => filled(t.value));

  return (
    <section aria-label="TL;DR" className="mt-8 max-w-3xl">
      <p className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
        <span aria-hidden className="size-1.5 rounded-full bg-accent-deep" />
        TL;DR
      </p>
      <dl className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {tiles.map((t) => (
          <div key={t.label} className={`${t.dark ? darkTile : lightTile} p-5`}>
            <dt className={`text-xs font-medium ${t.dark ? "text-white/55" : "text-neutral-400"}`}>
              {t.label}
            </dt>
            <dd className={`mt-2 text-sm leading-relaxed ${t.dark ? "text-white/90" : "text-neutral-700"}`}>
              {t.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
