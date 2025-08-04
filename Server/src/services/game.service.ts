import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

const gameService = {
  createGameHistory: async (data: {
    boardSize: number;
    moves: any;
    winner: string;
    mode: string;
    difficulty?: string | null;
  }) => {
    return await prisma.gameHistory.create({
      data: {
        boardSize: data.boardSize,
        moves: data.moves,
        winner: data.winner,
        mode: data.mode,
        difficulty: data.difficulty ?? null,
      },
    });
  },
  getAllGameHistories: async () => {
    return await prisma.gameHistory.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  getGameHistoryById: async (id: string) => {
    return await prisma.gameHistory.findUnique({
      where: { id },
    });
  },
};

export default gameService;
