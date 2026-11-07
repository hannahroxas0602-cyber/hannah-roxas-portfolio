// The four-line summary at the top of each case study. A line still holding a
// placeholder is hidden; `resultMetric` is appended to Result once it's filled.
export type CaseStudyTldr = {
  problem: string;
  role: string;
  whatIDid: string;
  result: string;
  resultMetric: string | null;
};

// "AI in my process": one instance per case study. Every field is optional text that
// stays `{{TODO: ...}}` until you fill it; unfilled fields are hidden on the live site.
export type AiProcessImage = {
  /** Path under /public. The slot stays hidden until the file exists. */
  src: string;
  alt: string;
  caption: string;
};

export type AiProcess = {
  /** Small tags, one per tool. */
  tools: string[];
  /** What I used AI for. */
  usedFor: string;
  /** Where AI got it wrong or fell short. */
  fellShort: string;
  /** What I changed, and why. */
  whatIChanged: string;
  /** Raw AI output (before) and my final version (after). */
  before: AiProcessImage;
  after: AiProcessImage;
  /** What it saved or made possible. */
  impact: string;
};
