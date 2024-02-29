export interface Player {
  name: string;
  score: number;
  element: Element;
  finished?: boolean;
}

export type Element = "Fire" | "Water" | "Earth" | "Air" | string;

export interface GameState {
  players: Player[];
  inProgress: boolean;
  countdown: boolean;
}
