import { useState } from "react";
import type { Board, Player } from "../types/game.types";
import { checkWinner, isDraw } from "../utils/gameLogic";

export function useGame() {
    const [board, setBoard] = useState<Board>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
    const [winner, setWinner] = useState<Player | null>(null);
    const [isDrawGame, setIsDrawGame] = useState(false);
    const [score, setScore] = useState({ X: 0, O: 0, draw: 0 })

    function makeMove(index: number) {
        if (board[index] || winner || isDrawGame) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;

        const win = checkWinner(newBoard);

        if (win) {
            setWinner(win);
            setScore((prev) => ({
                ...prev,
                [win]: prev[win] + 1,
            }));

            const history = JSON.parse(localStorage.getItem("history") || "[]");

            history.push({
                result: win,
                date: new Date().toISOString(),
            });

            localStorage.setItem("history", JSON.stringify(history));

        } else if (isDraw(newBoard)) {
            setIsDrawGame(true);
            setScore((prev) => ({
                ...prev,
                draw: prev.draw + 1,
            }))

            const history = JSON.parse(localStorage.getItem("history") || "[]");

            history.push({
                result: "draw",
                date: new Date().toISOString(),
            });

            localStorage.setItem("history", JSON.stringify(history));
            
        } else {
            // ✅ proper toggle
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }

        setBoard(newBoard);
    }

    function resetGame() {
        setBoard(Array(9).fill(null));
        setCurrentPlayer("X");
        setWinner(null);
        setIsDrawGame(false);
    }

    return {
        board,
        setBoard,
        currentPlayer,
        setCurrentPlayer,
        winner,
        setWinner,
        makeMove,
        isDrawGame,
        setIsDrawGame,
        resetGame,
        score,
        setScore,
    }
}
