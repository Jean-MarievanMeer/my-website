import { useRef } from "react";

export enum MouseButton {
    Left = 0,
    Middle = 1,
    Right = 2
}

export function useMouse() {

    const clickedButton = useRef<MouseButton | null>(null);
   
    function handleMouseDown(event: React.MouseEvent) {
        clickedButton.current = event.button as MouseButton;
    }

    function handleMouseUp(){
        clickedButton.current = null;
    }

    function getCurrentButton(){
        return clickedButton.current;
    }

    return {
        isClicked: ()=>getCurrentButton()!==null,
        clickedButton: ()=>getCurrentButton(),
        handleMouseDown: handleMouseDown,
        handleMouseUp: ()=>handleMouseUp(),
    };

}
