import type { ReactNode } from "react";
import Image from "next/image";
import CaseStudySection, { darkTile, lightTile } from "@/app/components/CaseStudySection";
import type { AiProcess, AiProcessImage } from "@/app/components/caseStudyTypes";
import { SHOW_TODOS, filled, todoLabel } from "@/app/data/placeholder";
import { publicFileExists } from "@/app/data/publicFile";

// True when the section has something to show: real content, or (in local development
// only) placeholders to fill. Pages use this to decide whether to render it and whether
// it gets a left-nav entry, so nothing unfinished ever reaches the live site.
export function hasAiProcess(ai: AiProcess) {
  return (
    SHOW_TODOS ||
    ai.tools.some(filled) ||
    [ai.usedFor, ai.fellShort, ai.whatIChanged, ai.impact].some(filled) ||
    imagesReady(ai)
  );
}

function imagesReady(ai: AiProcess) {
  return (
    filled(ai.before.alt) &&
    filled(ai.after.alt) &&
    publicFileExists(ai.before.src) &&
    publicFileExists(ai.after.src)
  );
}

// A dev-only dashed box standing in for an unfilled field.
function Todo({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <p
      className={`rounded-xl border border-dashed px-3 py-2 text-sm leading-relaxed ${
        dark ? "border-white/40 text-white/80" : "border-neutral-400 text-neutral-600"
      }`}
    >
      {todoLabel(text)}
    </p>
  );
}

function Field({ value, dark }: { value: string; dark?: boolean }): ReactNode {
  if (filled(value)) return <p className={dark ? "text-white/90" : "text-neutral-700"}>{value}</p>;
  return SHOW_TODOS ? <Todo text={value} dark={dark} /> : null;
}

function Shot({ label, img }: { label: string; img: AiProcessImage }) {
  const ready = filled(img.alt) && publicFileExists(img.src);
  return (
    <figure>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/[0.06] bg-neutral-50">
        {ready ? (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-contain"
            sizes="(min-width: 640px) 45vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center border border-dashed border-neutral-400 p-4 text-center text-xs text-neutral-600">
            [Image slot: {label}. Add the file at {img.src}, and fill the alt text]
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-sm leading-relaxed text-neutral-600">
        <span className="font-semibold text-neutral-900">{label}</span>
        {filled(img.caption) ? `: ${img.caption}` : SHOW_TODOS ? `: ${todoLabel(img.caption)}` : ""}
      </figcaption>
    </figure>
  );
}

// A 10-second read: tool tags, then what AI did, where it fell short and what I changed,
// the raw output beside my final version, and one dark line for what it made possible.
// It sits below the main story of each case study and never leads it.
export default function CaseStudyAiProcess({
  ai,
  id = "ai-process",
  heading = "AI in My Process",
  intro = "Where AI sped me up, and where the call stayed mine.",
  inline = false,
}: {
  ai: AiProcess;
  id?: string;
  heading?: string;
  intro?: string;
  /** True when it sits inside a feature (smaller, no page-level section frame). */
  inline?: boolean;
}) {
  if (!hasAiProcess(ai)) return null;

  const tools = ai.tools.filter(filled);
  const showShots = imagesReady(ai) || SHOW_TODOS;
  const hasImpact = filled(ai.impact) || SHOW_TODOS;

  const body = (
    <>
      <ul aria-label="Tools used" className="flex flex-wrap gap-2">
        {tools.map((t) => (
          <li
            key={t}
            className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-medium text-neutral-700"
          >
            {t}
          </li>
        ))}
        {tools.length === 0 && SHOW_TODOS && (
          <li className="rounded-full border border-dashed border-neutral-400 px-3 py-1 text-xs text-neutral-600">
            {todoLabel(ai.tools[0])}
          </li>
        )}
      </ul>

      <dl className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {[
          { label: "Used it for", value: ai.usedFor },
          { label: "Where it fell short", value: ai.fellShort },
          { label: "What I changed, and why", value: ai.whatIChanged },
        ]
          .filter((r) => filled(r.value) || SHOW_TODOS)
          .map((r) => (
            <div key={r.label} className={`${lightTile} p-5`}>
              <dt className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                {r.label}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed">
                <Field value={r.value} />
              </dd>
            </div>
          ))}
      </dl>

      {showShots && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Shot label="Raw AI output" img={ai.before} />
          <Shot label="My final version" img={ai.after} />
        </div>
      )}

      {hasImpact && (
        <div className={`${darkTile} mt-4 p-6`}>
          <p className="text-xs font-semibold tracking-wide text-white/70 uppercase">
            What it made possible
          </p>
          <div className="mt-2 text-base leading-relaxed">
            <Field value={ai.impact} dark />
          </div>
        </div>
      )}
    </>
  );

  if (inline) {
    return (
      <section id={id} aria-labelledby={`${id}-h`} className="mt-12 scroll-mt-28">
        <h4 id={`${id}-h`} className="font-display text-xl font-semibold text-neutral-900">
          {heading}
        </h4>
        <p className="mt-1 mb-5 max-w-2xl text-sm leading-relaxed text-neutral-600">{intro}</p>
        {body}
      </section>
    );
  }

  return (
    <CaseStudySection id={id} kicker="How I used AI" heading={heading} intro={intro}>
      {body}
    </CaseStudySection>
  );
}
