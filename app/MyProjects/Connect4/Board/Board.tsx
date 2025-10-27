import Row from './Row';

    export type Player = "yellow" | "red";

const board = () => {

    const dummy = {
        width: 5,
        height: 7,
    }



    type BoardData = (Player | null)[][];



    const boardData: BoardData = [
        [null, null, null, null, "yellow"],
        [null, null, null, null, "red"],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null]
    ]

    function createBoard(data: BoardData) {
        return (
            data.map(row=>{
                <Row row={row}/>
            })
        );
    }

    return (
        <div>
            Hello
        </div>
    );
}

export default board;