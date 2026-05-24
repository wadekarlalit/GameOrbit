import type { Board, Player } from "../types/game.types";

export function checkWinner(board: Board): Player | null {
    const patterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for(let [a, b, c] of patterns){
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
        return board[a];
    }
  }

  return null;
}

export function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null);
}