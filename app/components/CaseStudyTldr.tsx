import type { CaseStudyTldr as Tldr } from "@/app/components/caseStudyTypes";
import { filled } from "@/app/data/placeholder";

// Skimmable summary for recruiters: Problem / My role / What I did / Result.
export default function CaseStudyTldr({ tldr }: { tldr: Tldr }) {
  const result = filled(tldr.resultMetric) ? `${tldr.result} ${tldr.resultMetric}` : tldr.result;
  const rows = [
    { label: "Problem", value: tldr.problem },
    { label: "My role", value: tldr.role },
    { label: "What I did", value: tldr.whatIDid },
    { label: "Result", value: result },
  ].filter((row) => filled(row.value));

  return (
    <section aria-label="TL;DR" className="mt-8 max-w-2xl rounded-2xl border border-black/[0.06] bg-neutral-50 p-5 sm:p-6">
      <p className="font-label text-xs font-semibold tracking-widest text-neutral-400 uppercase">
        TL;DR
      </p>
      <dl className="mt-3 flex flex-col gap-2.5">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-1 gap-0.5 sm:grid-cols-[7rem_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-neutral-900">{row.label}</dt>
            <dd className="text-sm leading-relaxed text-neutral-700">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
