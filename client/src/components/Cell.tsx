import type { CellValue } from "../types/game.types";

interface CellProps {
    value: CellValue;
    onClick: () => void;
    currentPlayer: "X" | "O";
}

function Cell({ value, currentPlayer, onClick }: CellProps) {

    return (
        <div
            className="cell modern-cell"
            onClick={onClick}
        >
            {!value && (
                <>
                    {!value && currentPlayer === "X" && (
                        <div className="x-hover">
                            <span></span>
                            <span></span>
                        </div>
                    )}
                    {!value && currentPlayer === "O" && (
                        <div className="o-hover"></div>
                    )}
                </>
            )}

            {
                value === "X" && (
                    <div className="x-symbol">
                        <span></span>
                        <span></span>
                    </div>
                )
            }

            {
                value === "O" && (
                    <div className="o-symbol"></div>
                )
            }

        </div>
    );
}

export default Cell;