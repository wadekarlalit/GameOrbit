import Cell from "./Cell";
import type { Board as BoardType } from "../types/game.types";

interface BoardProps {
  board: BoardType;
  onCellClick: (index: number) => void;
}

function Board({ board, onCellClick }: BoardProps) {
  return (
    <div className="board modern-board">
      {board.map((cell, i) => (
        <Cell key={i} value={cell} onClick={() => onCellClick(i)} />
      ))}
    </div>
  );
}

export default Board;