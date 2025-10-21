import { useSearchParams } from 'react-router';
import { calcLine, extractLine } from "../MyProjects/Nonogram/Board/Hints/Hint";
import Hint from "../MyProjects/Nonogram/Board/Hints/Hint"
import { useRef, useState } from 'react';

export default function () {

    const [searchParams, setSearchParams] = useSearchParams();
    const [counter, setCounter] = useState(0);

    const line = calcLine(extractLine("horizontal", 0, [
        // Rij 0: Goed voor rij-extractie
        ['confirmed', 'confirmed', 'disabled', 'default', 'confirmed'],

        // Rij 1: Veel defaults, goed voor kolom 0 check
        ['default', 'default', 'disabled', 'default', 'default'],

        // Rij 2: Een gemengde rij
        ['disabled', 'confirmed', 'default', 'confirmed', 'disabled'],

        // Rij 3: Goed voor rij- en kolom-extractie
        ['confirmed', 'disabled', 'confirmed', 'disabled', 'default'],

        // Rij 4: Veel confirmed
        ['confirmed', 'confirmed', 'default', 'confirmed', 'confirmed']
    ]));


    return (
        <>
            <button onClick={() => {
                setCounter(prev => prev + 1);
                setSearchParams({ counter: counter.toString() });
            }}>{counter}</button>
        </>);
}