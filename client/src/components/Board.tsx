import Cell from "./Cell";
import type { Board as BoardType } from "../types/game.types";
import "../styles/board.scss"

interface BoardProps {
  board: BoardType;
  onCellClick: (index: number) => void;
  currentPlayer: "X" | "O";
}

function Board({ board, onCellClick, currentPlayer }: BoardProps) {
  return (
    <div className="board modern-board">
      {board.map((cell, i) => (
        <Cell key={i} value={cell} currentPlayer={currentPlayer} onClick={() => onCellClick(i)} />
      ))}
    </div>
  );
}

export default Board;