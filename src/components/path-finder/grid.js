'use client'
import { MAX_ROWS, MAX_COLS, createNewGrid, checkIfStartOrEnd } from "@/utils/pathfinder-utility"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Node from "./node";
import { pathFinderActions } from "@/store/slices/pathfinder-slice";

export function Grid() {
    const { grid, isVisualizationRunning } = useSelector(state => state.pathFinder)
    const dispatch = useDispatch()
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown = (row, col) => {
        if (isVisualizationRunning || checkIfStartOrEnd(row, col)) {
            return;
        }
        setIsMouseDown(true);
        dispatch(pathFinderActions.toggleGridNodeToWall({row:row, col:col}));
    };

    const handleMouseUp = (row, col) => {
        if (isVisualizationRunning || checkIfStartOrEnd(row, col)) {
            return;
        }
        setIsMouseDown(false);
    };

    const handleMouseEnter = (row, col) => {
        if (isVisualizationRunning || checkIfStartOrEnd(row, col)) {
            return;
        }
        if (isMouseDown) {
            dispatch(pathFinderActions.toggleGridNodeToWall({row:row, col:col}));
        }
    }; 

    return (
        <div
            className={
                `flex items-center flex-col border-sky-300 mt-10
                lg:min-h-[${MAX_ROWS * 17}px]  md:min-h-[${MAX_ROWS * 17}px] 
                xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]
                lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] 
                xs:w-[${MAX_COLS * 8}px] w-[${MAX_COLS * 7}px]`
            }
        >
            <p className="m-1 font-semibold"> *draw on the grid to create walls in the path</p>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((node, index) => (
                        <Node
                            key={index}
                            row={node.row}
                            col={node.col}
                            isStart={node.isStart}
                            isEnd={node.isEnd}
                            isTraversed={node.isTraversed}
                            isWall={node.isWall}
                            isPath={node.isPath}
                            handleMouseDown={() => handleMouseDown(node.row, node.col)}
                            handleMouseUp={() => handleMouseUp(node.row, node.col)}
                            handleMouseEnter={() => handleMouseEnter(node.row, node.col)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
