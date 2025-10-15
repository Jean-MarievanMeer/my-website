import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMouseHandlers } from "./MyUtils/MouseHandlers";
import PlayBoard, { type State } from "./PlayBoard";
import Hints, { generateHintsFromSolution } from "./Hints";

// Utility functions for URL state management
function encodeBoard(board: State[][]): string {
  return board
    .map((row) =>
      row
        .map((cell) => {
          switch (cell) {
            case "confirmed":
              return "1";
            case "disabled":
              return "2";
            default:
              return "0";
          }
        })
        .join("")
    )
    .join("-");
}

function decodeBoard(encoded: string, height: number, width: number): State[][] {
  if (!encoded) return createEmptyBoard(height, width);

  try {
    const rows = encoded.split("-");
    if (rows.length !== height) return createEmptyBoard(height, width);

    return rows.map((row) => {
      if (row.length !== width) return Array(width).fill("default");

      return row.split("").map((char) => {
        switch (char) {
          case "1":
            return "confirmed";
          case "2":
            return "disabled";
          default:
            return "default";
        }
      });
    });
  } catch {
    return createEmptyBoard(height, width);
  }
}

function createEmptyBoard(height: number, width: number): State[][] {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => "default"));
}

export default function Board({ solution }: { solution: State[][] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const playBoardSize = {
    height: solution.length,
    width: solution[0]?.length || 0,
  };
  const mouse = useMouseHandlers();
  const [currentMove, setCurrentMove] = useState(0);

  // Generate hints from the provided solution
  const puzzleData = generateHintsFromSolution(solution);

  // Initialize board state from URL or create empty board
  const initializeBoard = () => {
    const boardState = searchParams.get("board");
    if (boardState) {
      return decodeBoard(boardState, playBoardSize.height, playBoardSize.width);
    }
    return createEmptyBoard(playBoardSize.height, playBoardSize.width);
  };

  // Initialize history from URL
  const initializeHistory = () => {
    const historyState = searchParams.get("history");
    if (historyState) {
      try {
        const historySteps = historyState.split("|");
        return historySteps.map((step) =>
          decodeBoard(step, playBoardSize.height, playBoardSize.width)
        );
      } catch {
        return [createEmptyBoard(playBoardSize.height, playBoardSize.width)];
      }
    }
    return [createEmptyBoard(playBoardSize.height, playBoardSize.width)];
  };

  const [history, setHistory] = useState<State[][][]>(() => {
    const initialHistory = initializeHistory();
    console.log("Initial history:", {
      length: initialHistory.length,
      firstBoard: initialHistory[0]?.map((row) => row.join("")).join("-"),
    });
    return initialHistory;
  });
  const [currentSquares, setCurrentSquares] = useState<State[][]>(() => {
    const initialBoard = initializeBoard();
    console.log("Initial board:", initialBoard.map((row) => row.join("")).join("-"));
    return initialBoard;
  });
  const [shouldSaveToHistory, setShouldSaveToHistory] = useState(false);

  // Reset board state when solution changes (new game) - but only if URL has no state
  useEffect(() => {
    const hasUrlState = searchParams.get("board") || searchParams.get("history");
    if (!hasUrlState) {
      const emptyBoard = createEmptyBoard(playBoardSize.height, playBoardSize.width);
      setCurrentSquares(emptyBoard);
      setHistory([emptyBoard]);
      setCurrentMove(0);
    }
  }, [solution, searchParams, playBoardSize.height, playBoardSize.width]);

  // Update URL whenever board state changes
  useEffect(() => {
    const boardEncoded = encodeBoard(currentSquares);
    const historyEncoded = history
      .slice(0, currentMove + 1)
      .map((board) => encodeBoard(board))
      .join("|");

    const newParams = new URLSearchParams(searchParams);
    newParams.set("board", boardEncoded);
    newParams.set("history", historyEncoded);
    newParams.set("move", currentMove.toString());

    setSearchParams(newParams, { replace: true });
  }, [currentSquares, history, currentMove, setSearchParams, searchParams]);

  // Initialize current move from URL
  useEffect(() => {
    const moveParam = searchParams.get("move");
    if (moveParam) {
      const move = parseInt(moveParam);
      if (!isNaN(move) && move >= 0 && move < history.length) {
        setCurrentMove(move);
      }
    }
  }, [searchParams, history.length]);

  // Save to history when shouldSaveToHistory is true
  useEffect(() => {
    if (shouldSaveToHistory) {
      setHistory((prev) => {
        const newHistory = [...prev.slice(0, currentMove + 1), currentSquares];
        console.log("Saving to history:", {
          currentMove,
          historyLength: newHistory.length,
          boardBeingSaved: currentSquares.map((row) => row.join("")).join("-"),
        });
        return newHistory;
      });
      setCurrentMove((prev) => prev + 1);
      setShouldSaveToHistory(false);
    }
  }, [shouldSaveToHistory, currentSquares, currentMove]);

  // Prevent context menu globally when component mounts
  useEffect(() => {
    const preventContextMenu = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", preventContextMenu);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);

  function handleSquareClick(row: number, col: number, button: number) {
    const currentState = currentSquares[row][col];

    // Check if this matches the mouse drag state (only during drag operations)
    if (mouse.getIsClicked() && currentState !== mouse.getStateToChange()) {
      return;
    }

    // Update the live grid state based on button click
    const newSquares = currentSquares.map((rowArr, r) =>
      rowArr.map((state, c) => {
        if (r === row && c === col) {
          if (button === 0) {
            return state !== "confirmed" ? "confirmed" : "default";
          } else if (button === 2) {
            return state !== "disabled" ? "disabled" : "default";
          }
        }
        return state;
      })
    );

    // Update the live state (not history yet)
    setCurrentSquares(newSquares);
  }

  function handleMouseDown(row: number, col: number, event: MouseEvent) {
    const currentState = currentSquares[row][col];
    mouse.handleMouseDown(event as any, currentState);
    handleSquareClick(row, col, event.button);
  }

  function handleMouseEnter(row: number, col: number) {
    if (mouse.getIsClicked()) {
      handleSquareClick(row, col, mouse.getClickedButton());
    }
  }

  function handleMouseUp() {
    if (mouse.getIsClicked()) {
      // Trigger saving to history after the current render cycle
      setShouldSaveToHistory(true);
    }
    mouse.handleMouseUp();
  }

  function clearBoard() {
    setCurrentMove(0);
    setCurrentSquares(history[0]);
  }

  return (
    <>
      <div
        className="puzzle-container"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          display: "grid",
          gridTemplateAreas: `
            "empty column-hints"
            "row-hints game-board"
          `,
          gridTemplateColumns: "auto auto",
          gridTemplateRows: "auto auto",
          gap: "5px",
          padding: "20px",
          alignItems: "end",
        }}
      >
        <div style={{ gridArea: "empty" }}></div>

        <div style={{ gridArea: "column-hints", alignSelf: "end" }}>
          <Hints hints={puzzleData.columnHints} squares={currentSquares} direction="column" />
        </div>

        <div style={{ gridArea: "row-hints", alignSelf: "start" }}>
          <Hints hints={puzzleData.rowHints} squares={currentSquares} direction="row" />
        </div>

        <div style={{ gridArea: "game-board" }}>
          <PlayBoard
            gridState={currentSquares}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
          />
        </div>
      </div>
      <button
        onClick={() => {
          if (currentMove > 0) {
            const previousMove = currentMove - 1;
            const previousBoard = history[previousMove];
            console.log("Undo clicked:", {
              currentMove,
              previousMove,
              historyLength: history.length,
              previousBoard: previousBoard?.map((row) => row.join("")).join("-"),
            });
            setCurrentMove(previousMove);
            setCurrentSquares(previousBoard);
          }
        }}
        disabled={currentMove === 0}
      >
        Undo
      </button>
      <button onClick={clearBoard}>Clear Board</button>
    </>
  );
}
