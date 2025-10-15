import { useRef } from "react";

export enum MouseButton {
    Left = 0,
    Middle = 1,
    Right = 2
}

export default function MyMouse() {

    const clickedButton = useRef<MouseButton | null>(null);
    const isClicked = () => clickedButton.current !== null;
   
    function handleMouseDown(event: React.MouseEvent) {
        clickedButton.current = event.button as MouseButton;
    }

    return {
        isClicked: isClicked,
        clickedButton: clickedButton.current,
        handleMouseDown: handleMouseDown
    };

}
