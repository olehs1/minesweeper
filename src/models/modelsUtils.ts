import NeighbourPositionType from "../interfaces/NeighbourPositionType";

export const getNeighboursPositions = (
    column: number,
    row: number,
    maxColumn: number,
    maxRow: number
): NeighbourPositionType[] => {
    return [
        {
            column: column - 1,
            row: row - 1
        },
        {
            column: column - 1,
            row
        },
        {
            column,
            row: row - 1
        },
        {
            column: column + 1,
            row
        },
        {
            column,
            row: row + 1
        },
        {
            column: column + 1,
            row: row + 1
        },
        {
            column: column + 1,
            row: row - 1
        },
        {
            column: column - 1,
            row: row + 1
        }
    ].filter((position) =>
        position.row >= 0 && position.column >= 0 && position.column < maxColumn && position.row < maxRow
    );
}

export const getRandomFromLimit = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;