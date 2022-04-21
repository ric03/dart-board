import { MatBadge } from "@angular/material/badge";

export interface Player {
  id: number,
  name: string,
  remainingPoints: number,
  lastScore: number,
  history: number[],
  cricketMap: Map<number, number>,
}

export const DEFAULT_PLAYER: Player = { id: -1, name: 'unknown', remainingPoints: -1, lastScore: -1, history: [-1], cricketMap: new Map<number, number>() };
