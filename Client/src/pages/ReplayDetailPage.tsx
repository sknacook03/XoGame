import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGameById } from "../services/api";
import type { GameHistory } from "../types";
import { useNavigate } from "react-router-dom";

const ReplayDetailPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState<GameHistory | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchGameById(id).then(setGame);
    }
  }, [id]);

  return (
    <div className="p-4 flex flex-col justify-center items-center w-full">
      {game ? (
        <>
          <h1 className="text-xl font-bold mb-4">Replay</h1>
          <p>Winner: {game.winner}</p>
          <p>Mode: {game.mode}</p>
          <p>
            Board Size: {game.boardSize}x{game.boardSize}
          </p>
          <div
            className="grid gap-1 mt-4"
            style={{ gridTemplateColumns: `repeat(${game.boardSize}, 40px)` }}
          >
            {Array(game.boardSize * game.boardSize)
              .fill(null)
              .map((_, index) => {
                const move = game.moves.find((m) => m.index === index);
                return (
                  <div
                    key={index}
                    className="border w-10 h-10 flex items-center justify-center"
                  >
                    {move?.player ?? ""}
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={() => navigate("/replay")}
        className="mt-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
      >
        {" "}
        กลับไปหน้าก่อนหน้า
      </button>
    </div>
  );
};

export default ReplayDetailPage;
