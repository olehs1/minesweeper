import {getNeighboursPositions} from "./modelsUtils";
import NeighbourPositionType from "../interfaces/NeighbourPositionType";

const HOLE_VALUE = -1;

class CellModel {
    index: number;

    column: number;
    row: number;
    value: number;
    neighboursPositions: NeighbourPositionType[];
    visible: boolean = false;

    constructor(index: number, column: number, row: number, maxColumn: number, maxRow: number) {
        this.column = column;
        this.row = row;
        this.value = 0;
        this.index = index;

         this.neighboursPositions = getNeighboursPositions(column, row, maxColumn, maxRow);
    }

    setAsHole() {
        this.value = HOLE_VALUE;
    }

    isHole() {
        return this.value === HOLE_VALUE;
    }

    getNeighboursPositions(){
        return this.neighboursPositions;
    }

    increaseValue() {
        this.value++;
    }

    makeVisible() {
        this.visible = true;
    }

    isZeroValue() {
        return this.value === 0;
    }

    isVisible() {
        return this.visible;
    }
}

export default CellModel;