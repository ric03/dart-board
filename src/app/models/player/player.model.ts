export interface HistoryEntry {
  sum: number,
  hits: number[],

}

export interface Player {
  id: number,
  name: string,
  throws?: Throw[][],

  remainingPoints: number,
  lastScore: number,
  history: HistoryEntry[],
  cricketMap: Map<number, number>,
  average: number;
  last3History: number[];
}

export interface Throw {
  value: number,
  multiplier: number,
}

export const DEFAULT_PLAYER: Player = {
  id: -1,
  name: 'unknown',
  remainingPoints: -1,
  lastScore: -1,
  history: [{sum: -1, hits: [-1]}],
  cricketMap: new Map<number, number>(),
  average: 0,
  last3History: [-1],
};
