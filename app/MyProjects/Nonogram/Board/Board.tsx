import { useEffect, useRef, useState } from 'react';
import type { State } from './Tiles/Tile';
import TileGrid from './Tiles/TileGrid';
import { MouseButton, useMouse } from '~/MyUtils/MyMouse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import "../nonogram.css"
import HintsSide from './Hints/HintsSide';
import { getHints } from './Hints/Hint';
import { useSearchParams, useNavigate } from 'react-router';
import createSeededRandom from '~/MyUtils/PRNG';

const Board = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const nav = useNavigate();
    const gameID = searchParams.get("id");
    const dummySolution: State[][] = [["confirmed", "default", "default", "default", "default"],

    // R2: O X X O O  (Horizontal Hint: [2])
    ["default", "confirmed", "confirmed", "default", "default"],

    // R3: O O X X X  (Horizontal Hint: [3])
    ["confirmed", "default", "confirmed", "confirmed", "confirmed"],

    // R4: O O O X X  (Horizontal Hint: [2])
    ["confirmed", "default", "default", "confirmed", "confirmed"],

    // R5: O O O O X  (Horizontal Hint: [1])
    ["default", "default", "default", "default", "confirmed"]]

    const [solution, setSolution] = useState<State[][]>(dummySolution);

    const mouse = useMouse();
    const [tiles, setTiles] = useState<State[][]>(dummySolution);
    const [history, setHistory] = useState<State[][][] | null>([tiles]);

    const xToChange = useRef<number>(null);
    const getXtoChange = () => xToChange.current;
    const yToChange = useRef<number>(null);
    const getYtoChange = () => yToChange.current;

    const beginState = useRef<State>(null);

    const Buttons = () => {
        return (


            <div>
                <button className="tile-undo" onClick={() => undo()}><FontAwesomeIcon icon={faRotateLeft} /></button>
                <button onClick={() => nav("")} className="new-game-button">Start new game</button>
                <button onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert(
                        "URL gekopieerd! Open de URL op een ander device om daar verder te spelen"
                    );
                }} className="tile-undo"> <FontAwesomeIcon icon={faFloppyDisk} /> </button>
            </div>
        );
    }

    // 4. Update useEffect to run the setup logic
    useEffect(() => {
        setupGame();
        console.log(solution);
    }, [gameID])

    // New function to handle the synchronous setup logic
    function setupGame() {
        // --- 1. SET GAME ID ---
        let id = searchParams.get("id");
        if (!id) {
            id = Date.now().toString();
            updateSearchParams("id", id);
            // NOTE: The URL is updated, but the gameID in this component instance 
            // will still reflect the old value from searchParams until the next render.
        }

        // --- 2. SET SOLUTION ---
        // This function will now use the gameID to generate a new solution
        const newSolution = createBoard(id);
        setSolution(newSolution);

        // --- 3. INITIATE TILES (CURRENT BOARD STATE) ---
        // This function now relies on the newly generated/loaded solution.
        initiateTiles(newSolution);
    }

    function initiateTiles(currentSolution: State[][]) {
        const tilesParam = searchParams.get("tiles");
        let toReturn;

        if (tilesParam) {
            toReturn = convertStringToBoard(tilesParam);
        }

        if (toReturn) {
            setTiles(toReturn);
            // 5. Update history based on loaded tiles
            setHistory([toReturn]);
        } else {
            // 6. Create empty board based on the generated solution
            const emptyBoard = createEmptyBoardBySolution(currentSolution);
            setTiles(emptyBoard);
            // 7. Update history with the initial empty board
            setHistory([emptyBoard]);
        }
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
            <Buttons />
            <div className="main-board" onContextMenu={event => event.preventDefault()} onMouseDownCapture={mouse.handleMouseDown} onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp} >
                <div><p>Game id:</p>
                    <p>{gameID}</p></div>
                <HintsSide alignment="vertical" hints={getHints("vertical", solution)} tiles={tiles} />
                <HintsSide alignment="horizontal" hints={getHints("horizontal", solution)} tiles={tiles} />
                <TileGrid tiles={tiles} handleMouseDown={handleMouseDownTile} handleMouseEnter={handleMouseEnterTile} />
            </div>
        </div>
    );

    function undo() {
        if (!(!history || history.length <= 1)) {
            history && setTiles(history[history.length - 2]);
            updateHistory(history[history.length - 2]);
        }
    }

    // function initiateTiles() {
    //     const tilesParam = searchParams.get("tiles");
    //     console.log(tilesParam);
    //     let toReturn;

    //     if (tilesParam) {
    //         toReturn = convertStringToBoard(tilesParam);
    //     }

    //     if (toReturn) {
    //         setTiles(toReturn);
    //     } else { setTiles(createEmptyBoardBySolution(dummySolution)); }


    // }

    function createEmptyBoardBySolution(solution: State[][]) {
        return createEmptyBoard(solution[0].length, solution.length);
    }

    function createEmptyBoard(width: number, height: number) {
        const toReturn = Array<State[] | null>(height).fill(null).map(() =>
            Array<State>(width).fill("default")
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
        mouse.isClicked() && updateHistory(tiles);

        mouse.handleMouseUp();

    }

    function updateHistory(tiles: State[][]) {
        const newTiles = [...tiles];
        const newHistory = [...(history || []), newTiles];
        setHistory(newHistory);
        updateURL();
    }

    function updateURL() {
        // setSearchParams({tiles: BoardToString(tiles)});
        updateSearchParams("tiles", convertBoardToString(tiles));
    }

    function convertBoardToString(tiles: State[][]): string {
        return tiles.map((row) => row.map(tile => tile === "default" ? 0 : tile === "confirmed" ? 1 : 2).join("")).join("-");
    }

    function convertStringToBoard(tilesParam: string) {
        const rowStrings = tilesParam.split("-");
        const length = rowStrings[0].length;

        for (let row of rowStrings) {
            if (row.length !== length) {
                console.warn("Invalid input");
                return null;
            }
        }

        const newBoard: State[][] = rowStrings.map(rowString => {
            return rowString.split("").map(state => {
                switch (state) {
                    case '0':
                        return "default" as State;
                    case '1':
                        return "confirmed" as State;
                    case '2':
                        return "disabled" as State;
                    default:
                        console.warn(`Unexpected token: ${state}. Value is set to Default`);
                        return "default" as State;
                }
            }) as State[]
        })

        return newBoard;
    }

    function setID() {
        let id = searchParams.get("id");
        if (!id) {
            id = Date.now().toString();
            updateSearchParams("id", id);
        }
    }

    function updateSearchParams(param: string, value: string | null) {
        // @ts-ignore
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()), [param]: value
        });
    }

    function createBoard(gameID: string | null): State[][] {
        console.log(`game ID: ${gameID}`);

        if (gameID) {
            const random = createSeededRandom(gameID);
            const height = Math.floor(random() * 10 + 5);
            const width = Math.floor(random() * 10 + 5);

            const toReturn: State[][] = [];

            for (let y = 0; y < height; y++) {
                const row: State[] = [];
                for (let x = 0; x < width; x++) {
                    const state: State = random() < 0.5 ? "confirmed" : "default";
                    row.push(state);
                }
                toReturn.push(row);
            }
            return toReturn;

        } else {
            return dummySolution;
        }
    }
}
export default Board;