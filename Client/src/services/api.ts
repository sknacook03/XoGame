import axios from "axios";
import type { GameHistory } from "../types";

const API_URL = "http://localhost:3001";

type CreateGameData = Omit<GameHistory, "id" | "createdAt">;

export const saveGame = async (data: CreateGameData) => {
  try {
    const res = await axios.post(`${API_URL}/api/games`, data);
    return res.data;
  } catch (error) {
    throw new Error("Failed to save game");
  }
};

export const fetchGames = async () => {
  const res = await axios.get(`${API_URL}/api/games`);
  return res.data;
};

export const fetchGameById = async (id: string) => {
  const res = await axios.get(`${API_URL}/api/games/${id}`);
  return res.data;
};
