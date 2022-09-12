import {FC} from "react";
import CellModel from "../../models/CellModel";
import * as S from './BoardComponent.style'

const isDebug = false;

interface Props {
    boardData: CellModel[];
    onCellClick: (cell: CellModel) => void;
    size: number
}

const BoardComponent: FC<Props> = ({boardData , onCellClick, size}) => {
    const renderCell = (cell: CellModel) =>
        <S.Cell key={cell.index}
                onClick={() => onCellClick(cell)}
                $isVisible={cell.isVisible()}
                $column={cell.column}
                $row={cell.row}
                $size={size}
        >
            {isDebug && <>
                <div>value: {cell.value}</div>
                <div>index: {cell.index}</div>
                <div>{cell.isVisible() ? 'visible' : 'hidden'}</div>
            </>}
            {!isDebug && cell.isVisible() && <S.Value $value={cell.value}>{cell.value >= 0 ? cell.value : 'H'}</S.Value>}
        </S.Cell>

    return <S.Board $size={size}>{boardData.map(renderCell)}</S.Board>;
}

export default BoardComponent;