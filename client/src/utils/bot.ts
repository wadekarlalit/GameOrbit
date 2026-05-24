import type { Board } from "../types/game.types";
import { checkWinner } from "./gameLogic";

export function getRandomMove(board: Board): number {
    const emptyCells = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((val) => val !== null) as number[];

    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    return emptyCells[randomIndex];
}


function findWinningMove(board: Board, player: "X" | "O"): number | null {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const copy = [...board];
      copy[i] = player;

      if (checkWinner(copy) === player) {
        return i;
      }
    }
  }
  return null;
}

export function getSmartMove(board: Board): number {
  // 1. Bot win move
  const winMove = findWinningMove(board, "O");
  if (winMove !== null) return winMove;

  // 2. Block player
  const blockMove = findWinningMove(board, "X");
  if (blockMove !== null) return blockMove;

  // 3. Random fallback
  const emptyCells = board
    .map((cell, i) => (cell === null ? i : null))
    .filter((v) => v !== null) as number[];

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}


function minimax(board: Board, isMaximizing: boolean): number {
  const winner = checkWinner(board);

  if (winner === "O") return 10;
  if (winner === "X") return -10;
  if (!board.includes(null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const copy = [...board];
        copy[i] = "O";

        const score = minimax(copy, false);
        bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const copy = [...board];
        copy[i] = "X";

        const score = minimax(copy, true);
        bestScore = Math.min(score, bestScore);
      }
    }

    return bestScore;
  }
}


export function getBestMove(board: Board): number {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const copy = [...board];
      copy[i] = "O";

      const score = minimax(copy, false);

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}