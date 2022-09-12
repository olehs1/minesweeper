import styled from "styled-components";

const cellSize = 90;
const visibleColor = 'rgba(8,154,199,0.14)';
const hiddenColor = '#3d4648';

const hoverVisibleColor = 'rgba(2,61,79,0.09)';
const hoverHiddenColor = '#32393b';

interface CellProps {
    $column: number;
    $row: number;
    $isVisible: boolean;
    $size: number;
}

export const Cell = styled.div<CellProps>`
  background-color: ${({ $isVisible }) => $isVisible ? visibleColor : hiddenColor};
  width: ${cellSize}px;
  height: ${cellSize}px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: ${({ $isVisible }) => $isVisible ? hoverVisibleColor : hoverHiddenColor};
  }

  flex: ${({ $size }) => `1 0 ${100 / $size}%`};
`

interface ValueProps {
    $value: number;
}

export const Value = styled.div<ValueProps>`
  font-size: 20px;
  font-weight: 800;

  display: ${({ $value }) => $value === 0 ? 'none' : 'flex'};
`

interface BoardProps {
    $size: number;
}

export const Board = styled.div<BoardProps>`
  display: flex;
  flex-wrap: wrap;
  width: ${({ $size }) => `${$size * cellSize}px` };
`