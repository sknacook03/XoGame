import React, { useState } from "react";
import Board from "../components/Board";
import { useNavigate } from "react-router-dom";

const GamePage: React.FC = () => {
  const [useAI, setUseAI] = useState(true);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [boardSize, setBoardSize] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  const handleStartGame = () => {
    console.log("🟢 เริ่มเกมด้วย config:", { useAI, difficulty, boardSize });
    setGameStarted(true);
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center w-full">
      <div className="w-150">
        {!gameStarted ? (
          <>
            <h1 className="text-2xl font-bold mb-4">ตั้งค่าเกม XO</h1>

            <label>ขนาดกระดาน</label>
            <select
              value={boardSize}
              onChange={(e) => setBoardSize(Number(e.target.value))}
              className="w-full border p-2 rounded mb-4"
            >
              {[3, 5, 7, 10].map((size) => (
                <option key={size} value={size}>
                  {size} x {size}
                </option>
              ))}
            </select>

            <label>โหมด</label>
            <select
              value={useAI ? "ai" : "human"}
              onChange={(e) => setUseAI(e.target.value === "ai")}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="human">ผู้เล่น 2 คน</option>
              <option value="ai">ผู้เล่น vs AI</option>
            </select>

            {useAI && (
              <>
                <label>ระดับความยาก</label>
                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value as "easy" | "medium" | "hard")
                  }
                  className="w-full border p-2 rounded mb-4"
                >
                  <option value="easy">ง่าย</option>
                  <option value="medium">ปานกลาง</option>
                  <option value="hard">ยาก</option>
                </select>
              </>
            )}

            <button
              onClick={handleStartGame}
              className="w-full bg-blue-600 text-white py-2 rounded  cursor-pointer"
            >
              🎮 เริ่มเกม
            </button>
            <button
              onClick={() => navigate("/replay")}
              className="w-full border border-blue-600 text-blue-600 py-2 rounded mt-4 cursor-pointer"
            >
              📼 ดูรีเพลย์
            </button>
          </>
        ) : (
          <Board boardSize={boardSize} useAI={useAI} difficulty={difficulty} onExit={() => setGameStarted(false)} />
        )}
      </div>
    </div>
  );
};

export default GamePage;
