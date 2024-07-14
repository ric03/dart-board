import {BehaviorSubject} from "rxjs";

export interface Player {
  id: number,
  name: string,
  throws?: Throw[][],

  remainingPoints: number,
  lastScore: number,
  history: number[],
  cricketMap: Map<number, number>,
  average: number;
  currentPoints: number[];
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
  history: [-1],
  cricketMap: new Map<number, number>(),
  average: 0,
  currentPoints: [-1],
};
