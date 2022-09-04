export interface Stat {
  easy: number;
  new: number;
  percent: number;
}

export interface StatGame {
  new: number;
  percent: number;
  maxSuccess: number;
}

export interface StatData {
  value: number;
  source: string;
  field: string;
  totalValue: number
}

export type ResponseStat = {
  data: Stat
}

export type ResponseGameStat = {
  data: StatGame
}

export type ChartAxisData = {
  label: string,
  value: number
}

export type DateChartData = {
  date: number;
  value: number;
}