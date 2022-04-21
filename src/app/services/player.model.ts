export interface Player {
  id: number,
  name: string,
  remainingPoints: number,
  lastScore: number,
  history: number[],
  // map(MatBadgeButtonRef,MatBadgeValue)
}

export const DEFAULT_PLAYER: Player = { id: -1, name: 'unknown', remainingPoints: -1, lastScore: -1, history: [-1] };
