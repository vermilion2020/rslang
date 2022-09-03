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

export type ResponseStat = {
  data: Stat
}

export type ResponseGameStat = {
  data: StatGame
}