import CaseStudySection, { darkTile, lightTile } from "@/app/components/CaseStudySection";
import { filled } from "@/app/data/placeholder";

// My Role & Impact: numbered steps (Problem, Solution, Impact), the last one in
// the dark tile. Columns whose text is still a placeholder are left out.
export default function CaseStudyRoleImpact({
  heading,
  columns,
}: {
  heading: string;
  columns: { label: string; body: string }[];
}) {
  const cols = columns.filter((c) => filled(c.body));
  const grid = cols.length === 2 ? "sm:grid-cols-2" : cols.length >= 3 ? "sm:grid-cols-3" : "";
  return (
    <CaseStudySection id="role-impact" kicker="What I owned" heading={heading}>
      <div className={`grid grid-cols-1 items-stretch gap-2.5 ${grid}`}>
        {cols.map((col, i) => {
          const last = i === cols.length - 1 && cols.length > 1;
          return (
            <div key={col.label} className={`${last ? darkTile : lightTile} flex flex-col p-6`}>
              <div className="flex items-center gap-2.5">
                <span
                  className={`font-label inline-flex size-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                    last ? "bg-white/10 text-white/80" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {i + 1}
                </span>
                <h3 className={`text-sm font-semibold ${last ? "text-white" : "text-neutral-900"}`}>
                  {col.label}
                </h3>
              </div>
              <p className={`mt-4 text-sm leading-relaxed ${last ? "text-white/80" : "text-neutral-600"}`}>
                {col.body}
              </p>
            </div>
          );
        })}
      </div>
    </CaseStudySection>
  );
}
