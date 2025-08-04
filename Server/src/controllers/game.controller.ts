// src/controllers/game.controller.ts
import type { Request, Response } from "express";
import gameService from "../services/game.service";

const gameController = {
  saveGame: async (req: Request, res: Response) => {
    try {
      const { boardSize, moves, winner, mode, difficulty } = req.body;

      const savedGame = await gameService.createGameHistory({
        boardSize,
        moves,
        winner,
        mode,
        difficulty,
      });

      res.status(201).json(savedGame);
    } catch (error) {
      res.status(500).json({ message: "Failed to save game", error });
    }
  },
  getAllGames: async (_req: Request, res: Response) => {
    try {
      const games = await gameService.getAllGameHistories();
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch games", error });
    }
  },
  getGameById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const game = await gameService.getGameHistoryById(id);

      if (!game) return res.status(404).json({ message: "Game not found" });
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game", error });
    }
  },
};

export default gameController;
