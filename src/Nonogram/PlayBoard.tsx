// import "/ReactPractise/Nonogram/src/App.css";

export type State = "default" | "confirmed" | "disabled";

export default function PlayBoard({
  gridState,
  onMouseDown,
  onMouseEnter,
}: {
  gridState: State[][];
  onMouseDown: (row: number, col: number, event: MouseEvent) => void;
  onMouseEnter: (row: number, col: number) => void;
}) {
  const size = { height: gridState.length, width: gridState[0]?.length || 0 };

  const colors = {
    default: "#ffffffff",
    left: "#000000ff",
    right: "#00e1ffff",
  };

  function SquareTile({ row, col }: { row: number; col: number }) {
    const state = gridState[row][col];
    const color =
      state === "default" ? colors.default : state === "confirmed" ? colors.left : colors.right;

    function handleMouseDown(event: React.MouseEvent) {
      onMouseDown(row, col, event.nativeEvent);
    }

    function handleMouseEnter() {
      onMouseEnter(row, col);
    }

    return (
      <button
        style={{
          all: "unset",
          backgroundColor: color,
          width: "30px !important",
          height: "30px",
          minWidth: "30px",
          minHeight: "30px",
          maxWidth: "30px",
          maxHeight: "30px !important",
          border: "1px solid #000000ff",
          boxShadow: "inset 0 0 0 1.5px #ffffff",
          padding: "0 !important",
          margin: 0,
          fontSize: "16px",
          display: "inline-block",
          verticalAlign: "top",
          lineHeight: "1",
          boxSizing: "border-box",
          borderRadius: 7,
          cursor: "pointer",
          // Override all global button styles
          fontFamily: "inherit",
          fontWeight: "normal",
          transition: "none",
          outline: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onContextMenu={(e) => e.preventDefault()}
      ></button>
    );
  }

  function CreateBoard() {
    const board = [];

    for (let i = 0; i < size.height; i++) {
      const row = [];

      for (let j = 0; j < size.width; j++) {
        row.push(<SquareTile key={`${i}-${j}`} row={i} col={j} />);
      }

      board.push(<div key={i}>{row}</div>);
    }

    return <div>{board}</div>;
  }

  return (
    <div>
      <CreateBoard />
    </div>
  );
}
