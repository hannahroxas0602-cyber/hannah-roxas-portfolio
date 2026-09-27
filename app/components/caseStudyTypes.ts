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
