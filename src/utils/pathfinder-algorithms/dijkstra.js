const {
    PriorityQueue,
} = require('@datastructures-js/priority-queue');

function isSafe(grid, row, col) {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

const directions = [[0, 1, 1], [1, -1, 1.414], [0, -1, 1], [-1, 1, 1.414], [1, 0, 1], [1, 1, 1.414], [-1, 0, 1], [-1, -1, 1.414]]

export const DIJKSTRA = (Grid, startNode, endNode) => {
    let grid = Grid.map(row => row.map(obj => ({ ...obj })))
    let src = grid[startNode.row][startNode.col];
    let dest = grid[endNode.row][endNode.col];
    let isDestinationReached = false;
    let priorityQueue = new PriorityQueue((a, b) => a.distance - b.distance);
    let traversedNode = [];

    src.isTraversed = true;
    src.distance = 0;
    priorityQueue.push(src);

    while (!priorityQueue.isEmpty()) {
        let current_node = priorityQueue.pop();
        if (current_node === dest) {
            isDestinationReached = true;
            break;
        }
        traversedNode.push(current_node);
        current_node.isTraversed = true;

        for (let k = 0; k < directions.length; k++) {
            let newNodeRow = current_node.row + directions[k][0];
            let newNodeCol = current_node.col + directions[k][1];

            if (isSafe(grid, newNodeRow, newNodeCol)) {
                let newNode = grid[newNodeRow][newNodeCol];
                let newDistance = current_node.distance + directions[k][2];

                if (!newNode.isTraversed && !newNode.isWall && newDistance < newNode.distance) {
                    newNode.parent = current_node;
                    newNode.distance = newDistance;
                    priorityQueue.push(newNode);
                }
            }
        }
    }

    let path = [];
    if (isDestinationReached) {
        let pathNode = dest;
        while (pathNode !== null) {
            path.push(pathNode);
            pathNode.isPath = true;
            pathNode = pathNode.parent;
        }
    }
    path.reverse();

    return { path, traversedNode };
}