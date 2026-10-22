// The four-line summary at the top of each case study. A line still holding a
// placeholder is hidden; `resultMetric` is appended to Result once it's filled.
export type CaseStudyTldr = {
  problem: string;
  role: string;
  whatIDid: string;
  result: string;
  resultMetric: string | null;
};

export type TimelineBand = {
  label: string;
  colorClass: string;
  startWeek: number;
  endWeek: number;
};

export type TimelineTask = {
  title: string;
  band: string;
  startWeek: number;
  endWeek: number;
  row: number;
  colorClass: string;
  // "end" right-aligns the label so tasks near the chart's right edge don't overflow it.
  labelAlign?: "start" | "end";
};

// Replaces the default "Week N" axis with labels placed at specific weeks.
export type TimelineAxisLabel = {
  atWeek: number;
  label: string;
};
