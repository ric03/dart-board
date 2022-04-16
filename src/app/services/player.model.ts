export interface Player {
  id: number,
  name: string,
  remainingPoints: number,
}

export const DEFAULT_PLAYER: Player = {id: -1, name: 'unknown', remainingPoints: -1};
