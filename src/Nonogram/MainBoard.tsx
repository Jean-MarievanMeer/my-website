import { useState } from "react";
import PlayBoard from "./PlayBoard";

export default function () {
  const playBoardSize = { height: 5, width: 5 };

  const [history, setHistory] = useState<Square[]>>(null  );

  setHistory(...history,)
  
  const currentSquares = history[history.length - 1];

  function handleAction(action: any) {
    // Implement your action handler logic here
  }

  function handleRelease(event: any) {
    // Implement your release handler logic here
  }


  return (
    <PlayBoard
      height={playBoardSize.height}
      width={playBoardSize.width}
      squares={currentSquares}
      onAction={handleAction}
      onRelease={handleRelease}
    />
  );
}

export type Square = {
  color: string;
  handleAction: (action: any) => void;
};
