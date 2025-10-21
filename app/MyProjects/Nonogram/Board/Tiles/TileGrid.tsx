import Tile, { type State } from './Tile';
import "../../nonogram.css"

interface TileGridProps {
    tiles: State[][];
    handleMouseDown: (x: number, y: number) => void;
    handleMouseEnter: (x: number, y: number) => void;

}

const TileGrid = ({ tiles, handleMouseDown, handleMouseEnter }: TileGridProps) => {

    return (
        <div className="tile-grid">
            {tiles.map((row, y) => {
                return (
                    <div key={y}>
                        {row.map((tile, x) => {
                            return (
                                <Tile key={"x"+x+"y"+y} state={tile} handleMouseDown={() => handleMouseDown(x, y)} handleMouseEnter={() => handleMouseEnter(x, y)} />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
}

export default TileGrid;