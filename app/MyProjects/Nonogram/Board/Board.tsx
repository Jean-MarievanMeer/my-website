import { useRef, useState } from 'react';
import type { State } from './Tiles/Tile';
import TileGrid from './Tiles/TileGrid';
import { MouseButton, useMouse } from '~/MyUtils/MyMouse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import "../nonogram.css"
import HintsSide from './Hints/HintsSide';
import { getHints } from './Hints/Hint';
import { useSearchParams } from 'react-router';

const Board = () => {



    const dummySolution: State[][] = [["confirmed", "default", "default", "default", "default"],

    // R2: O X X O O  (Horizontal Hint: [2])
    ["default", "confirmed", "confirmed", "default", "default"],

    // R3: O O X X X  (Horizontal Hint: [3])
    ["confirmed", "default", "confirmed", "confirmed", "confirmed"],

    // R4: O O O X X  (Horizontal Hint: [2])
    ["confirmed", "default", "default", "confirmed", "confirmed"],

    // R5: O O O O X  (Horizontal Hint: [1])
    ["default", "default", "default", "default", "confirmed"]]

    const [searchParams, setSearchParams] = useSearchParams();

    const mouse = useMouse();
    const [tiles, setTiles] = useState<State[][]>(initiateTiles());
    const [history, setHistory] = useState<State[][][] | null>(() => [tiles]);

    const xToChange = useRef<number>(null);
    const getXtoChange = () => xToChange.current;
    const yToChange = useRef<number>(null);
    const getYtoChange = () => yToChange.current;

    const beginState = useRef<State>(null);

    const Buttons = () => {
        return (
            <div>
                <button className="tile-undo" onClick={() => undo()}><FontAwesomeIcon icon={faRotateLeft} /></button>
                <button className="new-game-button">Start new game</button>
                <button onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert(
                        "URL gekopieerd! Open de URL op een ander device om daar verder te spelen"
                    );
                }} className="tile-undo"> <FontAwesomeIcon icon={faFloppyDisk} /> </button>
            </div>
        );
    }

    // function changebleTile  ()  {
    //     const xToChange = useRef<number>(null);
    //     const yToChange = useRef<number>(null);
    //     const beginState = useRef<State>(null);


    //     function setX(x: number|null) {
    //         xToChange.current = x;
    //     }

    //     function setY(y: number|null) {
    //         yToChange.current = y;
    //     }

    //     function setBeginState(state: State|null){
    //         beginState.current = state;
    //     }

    //     function clear(){
    //         setX(null);
    //         setY(null);
    //         setBeginState(null);
    //     }

    //     return{
    //         getX: ()=>xToChange.current,
    //         getY: ()=>yToChange.current,
    //         getState: ()=>beginState.current,
    //     };

    // }


    return (
        <div>
            <div className="main-board" onContextMenu={event => event.preventDefault()} onMouseDownCapture={mouse.handleMouseDown} onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp} >
                <div></div>
                <HintsSide alignment="vertical" hints={getHints("vertical", dummySolution)} tiles={tiles} />
                <HintsSide alignment="horizontal" hints={getHints("horizontal", dummySolution)} tiles={tiles} />
                <TileGrid tiles={tiles} handleMouseDown={handleMouseDownTile} handleMouseEnter={handleMouseEnterTile} />
            </div>
            <Buttons />
        </div>
    );

    function undo() {
        if (!(!history || history.length <= 1)) {
            history && setTiles(history[history.length - 2]);
            setHistory(history!.slice(0, -1));
        }
    }

    function initiateTiles() {

        return createEmptyBoardBySolution(dummySolution);
    }

    function createEmptyBoardBySolution(solution: State[][]) {
        return createEmptyBoard(solution[0].length, solution.length);
    }

    function createEmptyBoard(width: number, height: number) {
        const toReturn = Array<State[] | null>(width).fill(null).map(() =>
            Array<State>(height).fill("default")
        );
        return toReturn;
    }

    function changeTile(x: number, y: number) {
        if (!mouse.isClicked() || tiles[y][x] !== beginState.current) {
            return;
        }

        if (!(x === getXtoChange() || y === getYtoChange())) {
            return;
        }

        const newTiles = tiles.map(row => [...row]);

        if (mouse.clickedButton() === MouseButton.Left) {
            newTiles[y][x] = newTiles[y][x] === "confirmed" ? "default" : "confirmed";
        } else if (mouse.clickedButton() === MouseButton.Right) {
            newTiles[y][x] = newTiles[y][x] === "disabled" ? "default" : "disabled";

        }
        setTiles(newTiles);
    }

    function handleMouseDownTile(x: number, y: number) {
        beginState.current = tiles[y][x];
        xToChange.current = x;
        yToChange.current = y;
        changeTile(x, y);
    }

    function handleMouseEnterTile(x: number, y: number) {


        if (!(getXtoChange() === null && getYtoChange() === null)) {
            if (getXtoChange() === x) {
                yToChange.current = null;
            } else if (getYtoChange() === y) {
                xToChange.current = null;
            }

        } changeTile(x, y);

    }

    function handleMouseUp() {
        xToChange.current = null;
        yToChange.current = null;
        mouse.isClicked() && updateHistory();

        mouse.handleMouseUp();

    }

    function updateHistory() {
        const newTiles = [...tiles];
        const newHistory = [...(history || []), newTiles];
        setHistory(newHistory);
        updateURL();
    }

    function updateURL() {
        setSearchParams({tiles: BoardToString(tiles)});
    }

    function BoardToString(tiles: State[][]): string {
        return tiles.map((row) => row.map(tile => tile === "default" ? 0 : tile === "confirmed" ? 1 : 2).join("")).join("-");
    }
}

export default Board;