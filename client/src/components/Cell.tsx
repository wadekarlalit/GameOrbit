// import type { CellValue } from "../types/game.types";

// interface CellProps {
//     value: CellValue,
//     onClick: () => void,
// }

// function Cell({ value, onClick }: CellProps){
//     return (
//         <div className="cell" onClick={onClick}>
//             {value}
//         </div>
//     )
// }

// export default Cell;


//..................................................................


import type { CellValue } from "../types/game.types";

interface CellProps {
    value: CellValue;
    onClick: () => void;
}

function Cell({ value, onClick }: CellProps) {

    return (
        <div
            className="cell modern-cell"
            onClick={onClick}
        >

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