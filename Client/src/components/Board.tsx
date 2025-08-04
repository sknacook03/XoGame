import React, { useEffect, useState } from "react";
import { saveGame } from "../services/api";
import type { CreateGameData, Player } from "../types";
interface BoardProps {
  boardSize: number;
  useAI: boolean;
  difficulty: "easy" | "medium" | "hard";
  onExit: () => void;
}

const Board: React.FC<BoardProps> = ({
  boardSize,
  useAI,
  difficulty,
  onExit,
}) => {
    
  const [board, setBoard] = useState<Player[]>(
    Array(boardSize * boardSize).fill(null)
  );

  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "draw" | null>(null);

  const saveGameToServer = async (result: Player | "draw") => {
    const moves = board
      .map((value, index) => (value ? { index, player: value } : null))
      .filter((m) => m !== null) as { index: number; player: Player }[];

    const mode: "ai" | "human" = useAI ? "ai" : "human";

    const payload: CreateGameData = {
      boardSize,
      winner: result,
      mode,
      difficulty: useAI ? difficulty : undefined,
      moves,
      timestamp: new Date().toISOString(),
    };

    try {
      await saveGame(payload);
      console.log("✅ Game saved successfully");
    } catch (error) {
      console.error("❌ Failed to save game:", error);
    }
  };

  useEffect(() => {
    const result = checkWinner();
    if (result) {
      setWinner(result);
      saveGameToServer(result); // 👉 เพิ่มตรงนี้
    } else if (board.every((cell) => cell !== null)) {
      setWinner("draw");
      saveGameToServer("draw"); // 👉 เพิ่มตรงนี้เช่นกัน
    } else if (useAI && currentPlayer === "O") {
      doAIMove();
    }
  }, [board]);

  useEffect(() => {
    const result = checkWinner();
    if (result) setWinner(result);
    else if (board.every((cell) => cell !== null)) setWinner("draw");
    else if (useAI && currentPlayer === "O") doAIMove();
  }, [board]);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };
  const checkWinnerSimulated = (tempBoard: Player[]): Player | null => {
    const lines: number[][] = [];

    for (let r = 0; r < boardSize; r++) {
      const row = [];
      for (let c = 0; c < boardSize; c++) row.push(r * boardSize + c);
      lines.push(row);
    }

    for (let c = 0; c < boardSize; c++) {
      const col = [];
      for (let r = 0; r < boardSize; r++) col.push(r * boardSize + c);
      lines.push(col);
    }

    lines.push(
      Array.from({ length: boardSize }, (_, i) => i * (boardSize + 1))
    );
    lines.push(
      Array.from({ length: boardSize }, (_, i) => (i + 1) * (boardSize - 1))
    );

    for (const line of lines) {
      const [first, ...rest] = line;
      if (
        tempBoard[first] &&
        rest.every((i) => tempBoard[i] === tempBoard[first])
      )
        return tempBoard[first];
    }

    return null;
  };

  const checkWinner = (): Player | null => {
    const lines: number[][] = [];

    for (let r = 0; r < boardSize; r++) {
      const row = [];
      for (let c = 0; c < boardSize; c++) row.push(r * boardSize + c);
      lines.push(row);
    }

    for (let c = 0; c < boardSize; c++) {
      const col = [];
      for (let r = 0; r < boardSize; r++) col.push(r * boardSize + c);
      lines.push(col);
    }

    lines.push(
      Array.from({ length: boardSize }, (_, i) => i * (boardSize + 1))
    );
    lines.push(
      Array.from({ length: boardSize }, (_, i) => (i + 1) * (boardSize - 1))
    );

    for (const line of lines) {
      const [first, ...rest] = line;
      if (board[first] && rest.every((i) => board[i] === board[first]))
        return board[first];
    }

    return null;
  };

  const doAIMove = () => {
    const emptyIndices = board
      .map((val, i) => (val === null ? i : -1))
      .filter((i) => i !== -1);

    if (emptyIndices.length === 0) return;

    let chosenIndex = -1;

    if (difficulty === "easy") {
      // Easy: สุ่มอย่างเดียว
      chosenIndex =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    } else if (difficulty === "medium") {
      // Medium: หากมีโอกาสชนะใน 1 ตาให้เลือกทันที ไม่งั้นสุ่ม
      for (const i of emptyIndices) {
        const tempBoard = [...board];
        tempBoard[i] = "O";
        if (checkWinnerSimulated(tempBoard) === "O") {
          chosenIndex = i;
          break;
        }
      }
      if (chosenIndex === -1) {
        chosenIndex =
          emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }
    } else if (difficulty === "hard") {
      // Hard: ป้องกันการแพ้ ถ้ามีโอกาสชนะก็ชนะเลย
      for (const i of emptyIndices) {
        const tempBoard = [...board];
        tempBoard[i] = "O";
        if (checkWinnerSimulated(tempBoard) === "O") {
          chosenIndex = i;
          break;
        }
      }
      if (chosenIndex === -1) {
        for (const i of emptyIndices) {
          const tempBoard = [...board];
          tempBoard[i] = "X"; // สมมุติว่าอีกฝ่ายจะเดินตรงนี้
          if (checkWinnerSimulated(tempBoard) === "X") {
            chosenIndex = i; // ป้องกัน
            break;
          }
        }
      }
      if (chosenIndex === -1) {
        chosenIndex =
          emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }
    }

    if (chosenIndex !== -1) {
      setTimeout(() => handleClick(chosenIndex), 300);
    }
  };

  return (
    <div className="mt-6 text-center">
      <h2 className="text-xl font-semibold mb-4">
        {winner
          ? winner === "draw"
            ? "🎯 เสมอ!"
            : `🏆 ผู้ชนะ: ${winner}`
          : `เทิร์น: ${currentPlayer}`}
      </h2>

      <div
        className="grid gap-1 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 60px)`,
          width: `${boardSize * 60}px`,
        }}
      >
        {board.map((cell, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className="w-[60px] h-[60px] border flex items-center justify-center text-2xl font-bold cursor-pointer select-none bg-white hover:bg-gray-100"
          >
            {cell}
          </div>
        ))}
      </div>

      <button
        onClick={onExit}
        className="mt-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        🔙 กลับหน้าแรก
      </button>
    </div>
  );
};

export default Board;
