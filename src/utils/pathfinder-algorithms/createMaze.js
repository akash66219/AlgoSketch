import { pathFinderActions } from "@/store/slices/pathfinder-slice";
import { MAX_ROWS, MAX_COLS, isRowColEqual, delay } from "../pathfinder-utility";
import { TILE_STYLE, WALL_TILE_STYLE } from "@/components/path-finder/node";


export const createMazeWithWalls = (grid, startTile, endTile, setIsDisabled, speed, change) => {
    return new Promise((resolve) => {
        const gap = 1 / speed;
        let completedRows = 0;

        for (let row = 0; row < MAX_ROWS; row++) {
            setTimeout(() => {
                for (let col = 0; col < MAX_COLS; col++) {
                    if (row % 2 === 0 || col % 2 === 0) {
                        if (!isRowColEqual(row, col, startTile) && !isRowColEqual(row, col, endTile)) {
                            setTimeout(() => {
                                document.getElementById(`${row}-${col}`).className = `${WALL_TILE_STYLE}`;
                            }, gap * col);
                        }
                    }
                }
                completedRows++;
                if (completedRows === MAX_ROWS) {
                    resolve();
                }
            }, gap * MAX_ROWS / 3 * row);
        }
    });
};


export const destroyWall = async (grid, row, col, isRight, changes) => {
    if (isRight && grid[row][col + 1]) {
        changes.push({row:row, col:col+1})
        document.getElementById(`${row}-${col + 1}`).className = TILE_STYLE;
        await delay(0.1)
    } else if (grid[row + 1]) {
        changes.push({row:row+1, col:col})
        document.getElementById(`${row + 1}-${col}`).className = TILE_STYLE;
        await delay(0.1)
    } else {
        changes.push({row:row, col:col})
        document.getElementById(`${row}-${col}`).className = TILE_STYLE;
        await delay(0.1)
    }
};