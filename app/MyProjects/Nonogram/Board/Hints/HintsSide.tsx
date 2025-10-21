import type { Alignment } from './Hint';
import Hint, { extractLine } from './Hint';
import "../../nonogram.css";
import type { State } from '../Tiles/Tile';

const HintsSide = ({ alignment, hints, tiles }: { alignment: Alignment, hints: number[][], tiles:State[][] }) => {
    return (
        <div className={"hints-" + alignment}>
            {hints.map((hint, index) => {
                return (
                    <>
                        <Hint hint={hint} alignment = {alignment} line={extractLine(alignment, index, tiles)}/>
                    </>);
            })}
        </div>
    );
}

export default HintsSide;