import Stopwatch from "@/app/components/Stopwatch";

// "N min read" with a small stopwatch, shown beside a case study's date. The hand ticks softly.
export default function ReadingTime({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <Stopwatch ticking className="h-[1.1rem] w-[1.1rem] text-neutral-950" />
      {minutes} min read
    </span>
  );
}
