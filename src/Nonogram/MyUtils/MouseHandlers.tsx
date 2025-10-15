import React, { useRef } from "react";

export function useMouseHandlers() {
  const clickedRef = useRef<number>(-1);
  const stateToChange = useRef<string>("");

  function handleMouseDown(event: MyMouseEvent, color: string) {
    clickedRef.current = event.button; // Direct ref update - no re-render
    stateToChange.current = color;
  }

  function handleMouseUp() {
    clickedRef.current = -1;
    stateToChange.current = "";
  }

  return {
    getIsClicked: () => clickedRef.current !== -1,
    getClickedButton: () => clickedRef.current,
    handleMouseDown: handleMouseDown,
    handleMouseUp: handleMouseUp,
    getStateToChange: () => stateToChange.current,
  };
}

export interface MyMouseEvent extends React.MouseEvent {}
