'use client'

import { TILE_STYLE, TRAVERSED_TILE_STYLE, PATH_TILE_STYLE } from "@/components/path-finder/node"
import { createMazeWithWalls, destroyWall } from "@/utils/pathfinder-algorithms/createMaze"

const { generateGrid, MAX_ROWS, MAX_COLS, delay, removeWall, isEqual, getRandInt } = require("@/utils/pathfinder-utility")
const { createSlice } = require("@reduxjs/toolkit")

const pathFinderSlice = createSlice({
    name: 'pathFinder',
    initialState: {
        grid: generateGrid({ row: 1, col: 1 }, { row: MAX_ROWS - 2, col: MAX_COLS - 2 }),
        maze: "none",
        algorithm: "bfs",
        startNode: { row: 1, col: 1 },
        endNode: { row: MAX_ROWS - 2, col: MAX_COLS - 2 },
        traversalSpeed: 2.5,
        isVisualizationRunning: false,
        isGraphTraversed: true
    },
    reducers: {
        setGrid: (state, action) => {
            state.grid = generateGrid({ row: 1, col: 1 }, { row: MAX_ROWS - 2, col: MAX_COLS - 2 })
        },
        setMaze: (state, action) => {
            state.maze = action.payload
        },
        setAlgorithm: (state, action) => {
            state.algorithm = action.payload
        },
        setStartNode: (state, action) => {
            state.startNode = { row: action.payload.row, col: action.payload.col }
        },
        setEndNode: (state, action) => {
            state.startNode = { row: action.payload.row, col: action.payload.col }
        },
        setTraversalSpeed: (state, action) => {
            state.traversalSpeed = action.payload
        },
        setisGraphTraversed: (state, action) => {
            state.isGraphTraversed = action.payload
        },
        toggleGridNodeToWall: (state, action) => {
            state.grid[action.payload.row][action.payload.col].isWall = !state.grid[action.payload.row][action.payload.col].isWall
        },
        
        setGridNodeToWall: (state, action) => {
            state.grid[action.payload.row][action.payload.col].isWall = !action.payload.value
        },
        modifyGrid: (state, action) => {
            state.grid = action.payload
        },
        setVisualizerRunning: (state, action) => {
            state.isVisualizationRunning = action.payload
        }
    }
})

export const pathFinderActions = pathFinderSlice.actions

export const generateMaze = (grid, startNode, endNode, setIsDisabled, speed) => {
    return async (dispatch) => {
        await createMazeWithWalls(grid, startNode, endNode, setIsDisabled, speed);

        const changes = [];
        await destroyWall(grid, 1, 1, 1, changes);
        await destroyWall(grid, 1, 1, 0, changes);
        changes.push({row:2, col:1})
        changes.push({row:1, col:2})
        const wallDetroyer = async () => {
            for (let r = 1; r < MAX_ROWS; r += 2) {
                for (let c = 1; c < MAX_COLS; c += 2) {
                    if (r === MAX_ROWS - 2 && c === MAX_COLS - 2) {
                        continue;
                    } else if (r === MAX_ROWS - 2) {
                        await destroyWall(grid, r, c, 1, changes);
                    } else if (c === MAX_COLS - 2) {
                        changes.push({ row: r + 1, col: c });
                        await destroyWall(grid, r, c, 0, changes);
                    } else {
                        let x = getRandInt(0, 3);
                        await destroyWall(grid, r, c, x, changes);
                    }
                }
            }
        }
        await wallDetroyer();   
        // await wallDetroyer();
        const newGrid = grid.map((row, rowIndex) =>
            row.map((obj, colIndex) => {
                const newObj = { ...obj };
                if (rowIndex % 2 === 0 || colIndex % 2 === 0) {
                    newObj.isWall = true;
                }
                return newObj;
            })
        );

        changes.forEach(({ row, col }) => {
            newGrid[row][col].isWall = false;
        });

        dispatch(pathFinderActions.modifyGrid(newGrid));
        dispatch(pathFinderActions.setVisualizerRunning(false))
    };
};

export const resetGrid = () => {
    return async (dispatch) => {
        for (let r = 0; r < MAX_ROWS; r++) {
            for (let c = 0; c < MAX_COLS; c++) {
                if((r == MAX_ROWS-2 && c == MAX_COLS-2) || (r == 1 && c == 1)){
                    continue;
                }
                let node = document.getElementById(`${r}-${c}`)
                node.className = `${TILE_STYLE}`
                if(r === MAX_ROWS-1){
                    node.classList.add("border-b")
                }
                if(c === 0){
                    node.classList.add("border-l")
                }
            }
        }
        const highestId = window.setTimeout(() => {
            for (let i = highestId; i >= 0; i--) {
                window.clearInterval(i);
                window.clearTimeout(i);
            }
        }, 0);
        dispatch(pathFinderActions.setGrid())
    }
}

export const runPathAnimation = (path, traversedNode, traversalSpeed, startNode, endNode) => {
    return async (dispatch) => {
        let gap = 1 / traversalSpeed;

        const animateTraversedNodes = () => {
            return new Promise((resolve) => {
                for (let i = 0; i < traversedNode.length; i++) {
                    setTimeout(() => {
                        const node = traversedNode[i];
                        if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
                            document.getElementById(`${node.row}-${node.col}`).className = `${TRAVERSED_TILE_STYLE}`;
                        }
                        if (i === traversedNode.length - 1) {
                            resolve();
                        }
                    }, gap * i * 2);
                }
            });
        };

        await animateTraversedNodes()

        function traversePath(){
            return new Promise((resolve) => {
                for (let i = 0; i < path.length; i++) {
                    setTimeout(() => {
                        const node = path[i];
                        if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
                            document.getElementById(`${node.row}-${node.col}`).className = `${PATH_TILE_STYLE} animate-bounce`;
                        }
                        if(i == path.length-1) {
                            resolve()
                        }
                    }, 10 * i);
                }
            })
        }

        if(path.length) await traversePath()
        dispatch(pathFinderActions.setVisualizerRunning(false))
    }
}


export const pathFinderReducer = pathFinderSlice.reducer