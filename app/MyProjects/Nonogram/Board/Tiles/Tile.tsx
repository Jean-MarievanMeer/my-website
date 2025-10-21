import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../nonogram.css"
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import React from 'react';

interface Tile {
    state: State;
    handleMouseDown: () => void;
    handleMouseEnter: () => void;
}

export type State = "default" | "confirmed" | "disabled";

const icon = (state : State) => {

    
    return(
        <FontAwesomeIcon icon={state === "disabled" ? faXmark : faCheck } 
        />
    );
}

const Tile = ({ state, handleMouseDown, handleMouseEnter }: Tile) => {

    return (
        <button onMouseDown = {()=>handleMouseDown()} onMouseEnter = {()=>handleMouseEnter()}
            className={"tile-" + state}> {icon(state)}
        </button>
    );

}

export default React.memo(Tile);
// export default Tile;`