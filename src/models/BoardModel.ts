import CellModel from "./CellModel";
import {getRandomFromLimit} from "./modelsUtils";
import NeighbourPositionType from "../interfaces/NeighbourPositionType";
import cellModel from "./CellModel";

class BoardModel {
    cells: CellModel[];

    constructor(columns: number, rows: number) {
        this.cells = [];

        for(let i = 0 ; i < columns ; i++) {
            for(let j = 0 ; j < rows ; j++) {
                this.cells.push(new CellModel(this.cells.length, i, j, columns, rows))
            }
        }
    }

    getData(): CellModel[] {
        return this.cells;
    }

    setRandomCellAsHole() {
        const cell = this.cells[getRandomFromLimit(0, this.cells.length - 1)];
        if(cell.isHole()){
            this.setRandomCellAsHole();
        } else {
            cell.setAsHole();
        }
    }

    calculateCellsValuesDependsOnHoles() {
        this.cells.forEach(cell => {
            if(cell.isHole()) {
                cell.getNeighboursPositions().forEach((position) => {
                    const neighbourCell = this.getCellByPosition(position);
                    if(neighbourCell && !neighbourCell.isHole()){
                        neighbourCell.increaseValue();
                    }
                })
            }
        });
    }

    getCellByPosition(position: NeighbourPositionType) {
        return this.cells.find(cell => cell.row === position.row && cell.column === position.column);
    }

    makeCellVisible(cell: cellModel) {
        this.cells[cell.index].makeVisible();
    }

    makeCellsNeighboursVisible(cell: cellModel) {
        cell.getNeighboursPositions().forEach((position) => {
            const neighbourCell = this.getCellByPosition(position);
            const isMakeZeroCellVisible = neighbourCell && neighbourCell.isZeroValue() && !neighbourCell.isVisible();
            if(isMakeZeroCellVisible){
                this.cells[neighbourCell.index].makeVisible();
                this.makeCellsNeighboursVisible(neighbourCell);
            }
            const isMakeNotZeroCellVisible = neighbourCell && !neighbourCell.isHole() && !neighbourCell.isVisible();
            if(isMakeNotZeroCellVisible){
                this.cells[neighbourCell.index].makeVisible();
            }
        })
    }

    isWin() {
        const holesCount = this.cells.filter(cell => cell.isHole()).length;
        const visibleCellsCount = this.cells.filter(cell => cell.isVisible()).length;

        return this.cells.length === (holesCount + visibleCellsCount);
    }
}

export default BoardModel;