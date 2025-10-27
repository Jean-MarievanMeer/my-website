import type { Player } from './Board';

const Coin = ({player}:{player:Player|null}) => {
    return (
        <div className = {"coin" + player && `-${player}`}/>
    );
}

export default Coin;