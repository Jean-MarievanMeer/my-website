import type { Player } from './Board';
import Coin from './Coin';

const Row = ({row}: {row:(Player|null)[]})=>{
    return (
        row.map(coin=>{
            return <Coin player = {coin}/>;
        })
    );
}

export default Row;