// The four-line summary at the top of each case study. A line still holding a
// placeholder is hidden; `resultMetric` is appended to Result once it's filled.
export type CaseStudyTldr = {
  problem: string;
  role: string;
  whatIDid: string;
  result: string;
  resultMetric: string | null;
};
