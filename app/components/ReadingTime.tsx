// "⌚ N min read" with a small pocket-watch icon, shown beside a case study's date.
// Static on purpose: case study reading areas stay calm.
export default function ReadingTime({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        className="h-3.5 w-3.5"
      >
        {/* bow, crown, case, hands */}
        <circle cx="8" cy="1.9" r="1.1" />
        <path d="M8 3v1.2" />
        <circle cx="8" cy="9.6" r="5.4" />
        <path d="M8 9.6V6.9M8 9.6l2 1.3" />
      </svg>
      {minutes} min read
    </span>
  );
}
