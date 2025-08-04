import React, { useEffect, useState } from "react";
import { fetchGames } from "../services/api";
import type { GameHistory } from "../types";
import { useNavigate } from "react-router-dom";

const ReplayPage: React.FC = () => {
  const [games, setGames] = useState<GameHistory[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const load = async () => {
      const data = await fetchGames();
      setGames(data);
      console.log(data);
    };
    load();
  }, []);

  return (
    <div className="p-4 flex flex-col justify-center items-center w-full">
      <h1 className="text-xl font-semibold">Game History</h1>
      <ul className="mt-2 space-y-2 w-200">
        {games.map((game) => (
          <li
            key={game.id}
            onClick={() => navigate(`/replay/${game.id}`)}
            className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
          >
            🎮 {game.mode.toUpperCase()} — Winner: {game.winner} | Board:{" "}
            {game.boardSize}x{game.boardSize}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReplayPage;
