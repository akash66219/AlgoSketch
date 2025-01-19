import { MAX_ROWS, isRowColEqual } from "@/utils/pathfinder-utility";
import React from "react";
export const TILE_STYLE = "lg:w-[17.5px] md:w-[10px] xs:w-[3px] w-[5px] lg:h-[17px] md:h-[13px] xs:h-[8px] h-[9px] border-t border-r border-cyan-600";
export const TRAVERSED_TILE_STYLE = TILE_STYLE + " bg-cyan-500";
export const START_TILE_STYLE = TILE_STYLE + " bg-purple-600";
// export const END_TILE_STYLE = TILE_STYLE + " bg-green-600";
export const END_TILE_STYLE = TILE_STYLE + " bg-red-600";
export const WALL_TILE_STYLE = TILE_STYLE + " bg-[#FBF8DD]";
export const PATH_TILE_STYLE = TILE_STYLE + " bg-green-600";
import { FaFlag } from "react-icons/fa";
import { GiFinishLine } from "react-icons/gi";
import { useSelector } from "react-redux";

const Node = ({ row, col, isStart, isEnd, isTraversed, isWall, isPath, handleMouseDown, handleMouseUp, handleMouseEnter }) => {
  const {startNode, endNode} = useSelector(state => state.pathFinder)
  let nodeStyle;

  if (isStart) {
    nodeStyle = START_TILE_STYLE;
  } else if (isEnd) {
    nodeStyle = END_TILE_STYLE;
  } else if (isWall) {
    nodeStyle = WALL_TILE_STYLE;
  } else if (isPath) {
    nodeStyle = PATH_TILE_STYLE;
  } else if (isTraversed) {
    nodeStyle = TRAVERSED_TILE_STYLE;
  } else {
    nodeStyle = TILE_STYLE;
  }

  const borderStyle =
    row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";
  const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";

  return (
    <div
      className={`${nodeStyle} ${borderStyle} ${edgeStyle}`}
      id={`${row}-${col}`}
      onMouseUp={() => handleMouseUp(row, col)}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
    >
      {isRowColEqual(row, col, startNode) && <FaFlag className="relative bottom-7 left-[3px] animate-bounce" style={{ color: 'yellow', fontSize: '36px' }}></FaFlag>}
      {isRowColEqual(row, col, endNode) && <FaFlag className="relative bottom-7 left-[3px] animate-bounce" style={{ color: 'lightgreen', fontSize: '36px' }}></FaFlag>}
    </div>
  );
};

export default Node