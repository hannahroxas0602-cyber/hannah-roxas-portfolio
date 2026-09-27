// Estimates reading time from a case study's own data, so the number always
// matches what's on the page. Counts words in every string it finds, skipping
// things a reader never reads (image paths, links, alt text, class names, IDs)
// and anything marked `isHidden`.
const WORDS_PER_MINUTE = 200;

const SKIPPED_KEYS = new Set([
  "src",
  "image",
  "images",
  "href",
  "slug",
  "url",
  "alt",
  "imageAlt",
  "demoVideo",
  "demoVideoAlt",
  "colorClass",
  "band",
  "tabTitle",
  "researchLinkHref",
]);

function countWords(value: unknown): number {
  if (typeof value === "string") {
    if (value.startsWith("/") || value.startsWith("http")) return 0;
    return value.split(/\s+/).filter(Boolean).length;
  }
  if (Array.isArray(value))
    return value.reduce((n: number, v) => n + countWords(v), 0);
  if (value && typeof value === "object") {
    if ((value as { isHidden?: boolean }).isHidden) return 0;
    return Object.entries(value).reduce(
      (n, [key, v]) => (SKIPPED_KEYS.has(key) ? n : n + countWords(v)),
      0,
    );
  }
  return 0;
}

export function readingMinutes(...sections: unknown[]) {
  return Math.max(1, Math.round(countWords(sections) / WORDS_PER_MINUTE));
}
