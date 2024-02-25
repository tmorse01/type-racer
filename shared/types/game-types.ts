export interface Player {
  name: string;
  score: number;
}

export interface GameState {
  players: Player[];
  gameInProgress: boolean;
}
