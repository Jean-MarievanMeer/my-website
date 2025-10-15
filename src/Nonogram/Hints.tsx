import type { State } from "./PlayBoard";

interface HintsProps {
  hints: number[][];
  squares: State[][];
  direction: "row" | "column";
}

export function generateHintsFromSolution(solution: State[][]) {
  // Add safety checks
  if (!solution || !Array.isArray(solution) || solution.length === 0) {
    console.error("Invalid solution provided to generateHintsFromSolution");
    return { rowHints: [[]], columnHints: [[]] };
  }

  const rowHints: number[][] = solution.map((row) => {
    if (!Array.isArray(row)) {
      console.error("Invalid row in solution:", row);
      return [];
    }

    const hints: number[] = [];
    let count = 0;
    for (const cell of row) {
      if (cell === "confirmed") {
        count++;
      } else if (count > 0) {
        hints.push(count);
        count = 0;
      }
    }
    if (count > 0) hints.push(count);
    return hints; // Return empty array for rows with no filled squares
  });

  const columnHints: number[][] = [];
  for (let col = 0; col < solution[0].length; col++) {
    const hints: number[] = [];
    let count = 0;
    for (let row = 0; row < solution.length; row++) {
      if (solution[row][col] === "confirmed") {
        count++;
      } else if (count > 0) {
        hints.push(count);
        count = 0;
      }
    }
    if (count > 0) hints.push(count);
    columnHints.push(hints); // Return empty array for columns with no filled squares
  }

  return { rowHints, columnHints };
}

function isSolved(hint: number[], lineState: State[]): boolean {
  const groups: number[] = [];
  let count = 0;

  for (const cell of lineState) {
    if (cell === "confirmed") {
      count++;
    } else if (count > 0) {
      groups.push(count);
      count = 0;
    }
  }
  if (count > 0) {
    groups.push(count);
  }

  // Compare groups to hints
  if (groups.length !== hint.length) return false;
  for (let i = 0; i < groups.length; i++) {
    if (groups[i] !== hint[i]) return false;
  }
  return true;
}

function Hints({ hints, squares, direction }: HintsProps) {
  const isRow = direction === "row";

  if (isRow) {
    // Keep existing row logic
    const maxHints = Math.max(0, ...hints.map((hint) => hint.length));

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0px",
        }}
      >
        {hints.map((hint, index) => {
          const lineState = squares[index];
          const solved = isSolved(hint, lineState);
          const paddedHints: (number | null)[] = [...hint];
          while (paddedHints.length < maxHints) {
            paddedHints.unshift(null);
          }

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0px",
                width: "30px",
                height: "30px",
                minHeight: "30px",
                maxHeight: "30px",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "3px",
                boxSizing: "border-box",
              }}
            >
              {paddedHints.map((hintValue, hintIndex) => (
                <span
                  key={hintIndex}
                  style={{
                    backgroundColor:
                      hintValue === null ? "transparent" : solved ? "#007bff" : "#f0f0f0",
                    color: hintValue === null ? "transparent" : solved ? "#ffffff" : "#000000",
                    border: hintValue === null ? "1px solid transparent" : "1px solid black",
                    padding: "9px 09px",
                    borderRadius: "7px",
                    fontSize: "10px",
                    fontWeight: "bold",
                    lineHeight: "1",
                    display: "inline-block",
                    minWidth: "12px",
                    textAlign: "center",
                    visibility: hintValue === null ? "hidden" : "visible",
                  }}
                >
                  {hintValue || ""}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    );
  } else {
    // Column hints - mimic PlayBoard structure exactly
    const columnElements = [];

    for (let col = 0; col < hints.length; col++) {
      const columnHint = hints[col];
      const lineState = squares.map((row) => row[col]);
      const solved = isSolved(columnHint, lineState);

      columnElements.push(
        <div
          key={col}
          style={{
            width: "30px",
            height: "auto",
            border: "1px solid transparent",
            display: "inline-block",
            verticalAlign: "bottom",
            boxSizing: "border-box",
            textAlign: "center",
            padding: "0",
            margin: "0",
          }}
        >
          {columnHint.map((hintValue, hintIndex) => (
            <div
              key={hintIndex}
              style={{
                backgroundColor: solved ? "#007bff" : "#f0f0f0",
                color: solved ? "#ffffff" : "#000000",
                padding: "9px 09px",
                border: "1px solid black",
                borderRadius: "7px",
                fontSize: "10px",
                fontWeight: "bold",
                lineHeight: "1",
                display: "block",
                minWidth: "12px",
                textAlign: "center",
                marginBottom: "1px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {hintValue}
            </div>
          ))}
        </div>
      );
    }

    return <div style={{ lineHeight: 0 }}>{columnElements}</div>;
  }
}

export default Hints;
