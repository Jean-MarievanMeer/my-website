import type { State } from '../Tiles/Tile';
import "../../nonogram.css"
import React from 'react';

export type Alignment = "vertical" | "horizontal";

//hint on the side or top of the board
const Hint = ({ hint, alignment, line }: { hint: number[], alignment: Alignment, line:State[] }) => {
    const isCorrect = JSON.stringify(hint) === JSON.stringify(calcLine(line));

    return (
        <div className={"hint-" + alignment}>
            {
                hint.map(hint => {
                    return (
                        <button className={"tile-hint" + (isCorrect ? "-correct" : "")}>
                            {hint}
                        </button>
                    )
                })
            }
        </div>
    );
}

//functional, if this equals the hint, row could be correct
export const calcLine = (states: State[]) => {
    const toReturn = [];
    let counter = 0;

    for (const state of states) {
        if (state === "confirmed") {
            counter++;
        } else if (counter !== 0) {
            toReturn.push(counter);
            counter = 0;
        }
    }

    if (counter > 0) {
        toReturn.push(counter);
    }

    return toReturn;
}

//functional, gives a single row or column if the complete grid is given
export const extractLine = (alignment: Alignment, index: number, states: any[][]): State[] => {
    let toReturn = [];
    if (alignment === "vertical") {
        for (let y = 0; y < states.length; y++) {
            toReturn.push(states[y][index]);
        }
    } else {
        toReturn = [...states[index]];
    }

    return (toReturn);
}

// functional, gives either upper or left hint, given the solution
export function getHints(alignment: Alignment, solution: State[][]): number[][] {
    const toReturn = [];

    for (let i = 0; i < (alignment === "horizontal" ? solution.length : solution[0].length); i++) {
        toReturn.push(calcLine(extractLine(alignment, i, solution)));
    }

    return toReturn;
}

export default React.memo(Hint);


