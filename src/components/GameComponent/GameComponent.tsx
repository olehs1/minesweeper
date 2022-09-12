import BoardComponent from "../BoardComponent/BoardComponent";
import {useEffect, useRef, useState} from "react";
import BoardModel from "../../models/BoardModel";
import CellModel from "../../models/CellModel";
import * as S from './GameComponent.style';

const COLUMNS = 7;
const ROWS = COLUMNS;
const bombCount = 3;

const GameComponent = () => {
    const [boardData, setBoardData] = useState<CellModel[]>();
    const boardRef = useRef<BoardModel>();

    useEffect(() => {
        if(!boardRef.current){
            boardRef.current = new BoardModel(COLUMNS, ROWS);
            for(let i = 0 ; i < bombCount ; i++){
                boardRef.current.setRandomCellAsHole();
            }
            boardRef.current.calculateCellsValuesDependsOnHoles();

            setBoardData([...boardRef.current.getData()]);
        }
    }, []);

    const onCellClick = (cell: CellModel) => {
        if(!boardRef.current){
            return;
        }

        if(cell.isHole()){
            alert(`It's a hole, you lose for this time, try again`);
        }

        boardRef.current.makeCellVisible(cell);
        if(cell.isZeroValue()){
            boardRef.current.makeCellsNeighboursVisible(cell);
        }
        setBoardData([...boardRef.current.getData()]);

        if(boardRef.current.isWin()){
            alert('Congratulations! You win!')
        }
    };

    console.log('boardData: ', boardData);

    return <S.Game>
        {boardData && <BoardComponent boardData={boardData} size={COLUMNS} onCellClick={onCellClick}/>}
    </S.Game>
}

export default GameComponent;