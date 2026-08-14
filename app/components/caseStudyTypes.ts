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
};
