import { existsSync } from "node:fs";
import path from "node:path";

// Optional case study content that hasn't been written yet is `null` in the data
// files, marked with a `// PLACEHOLDER:` comment showing an example. Components
// render a field only when `filled()` passes, so no placeholder reaches the site.
// Leftover template tokens ("[N]", "[X]", "TBD", "PLACEHOLDER") also count as
// unfilled, so a half-edited value like "Team of [N]" never renders.
const TEMPLATE_TOKEN = /\[[^\]]*\]|\bTBD\b|PLACEHOLDER/i;

export function filled(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim() !== "" && !TEMPLATE_TOKEN.test(value);
}

// True once an image has actually been added under /public. Checked at build
// time, so dropping the file in and redeploying is all it takes to show it.
export function publicFileExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src));
}
