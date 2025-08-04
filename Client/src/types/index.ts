export interface Move {
  player: "X" | "O";
  index: number;
}

export type Player = "X" | "O";

export interface GameHistory {
  id: string;
  boardSize: number;
  winner: Player | "draw" | null;
  mode: "ai" | "human";
  difficulty?: "easy" | "medium" | "hard";
  moves: {
    index: number;
    player: Player;
  }[];
  timestamp: string;
}

export type CreateGameData = Omit<GameHistory, "id">;

