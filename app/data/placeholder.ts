// Optional case study content that hasn't been written yet is `null` in the data
// files, marked with a `// PLACEHOLDER:` comment showing an example. Components
// render a field only when `filled()` passes, so no placeholder reaches the site.
// Leftover template tokens ("[N]", "[X]", "TBD", "PLACEHOLDER") also count as
// unfilled, so a half-edited value like "Team of [N]" never renders. So does
// "{{TODO: ...}}", the marker for real data still to be supplied (grep for it).
// No Node imports here, so client components can use it too.
const TEMPLATE_TOKEN = /\[[^\]]*\]|\bTBD\b|PLACEHOLDER|\{\{TODO/i;

export function filled(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim() !== "" && !TEMPLATE_TOKEN.test(value);
}

// Local development only: unfilled `{{TODO: ...}}` fields are drawn as dashed boxes so you
// can see where content goes. In production they stay hidden, as `filled()` already does.
export const SHOW_TODOS = process.env.NODE_ENV !== "production";

// "{{TODO: what AI got wrong}}" -> "TODO: what AI got wrong" (for the dev-only boxes).
export function todoLabel(value: string | null | undefined): string {
  const text = (value ?? "").replace(/^\s*\{\{\s*|\s*\}\}\s*$/g, "").trim();
  return text || "TODO";
}
