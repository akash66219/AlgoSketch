import { Queue } from "@datastructures-js/queue"

function isSafe(grid, row, col) {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]

export const BFS = (Grid, startNode, endNode) => {
    let grid = Grid.map(row => row.map(obj => ({ ...obj })))
    let src = grid[startNode.row][startNode.col]
    let dest = grid[endNode.row][endNode.col]
    let isDestinationReached = false
    let queue = new Queue()
    let traversedNode = []
    src.isTraversed = true
    src.distance = 0
    queue.push(src)
    while (!queue.isEmpty()) {
        let current_node = queue.pop();
        if (current_node === dest) {
            isDestinationReached = true
            break;
        }
        traversedNode.push(current_node)
        for (let k = 0; k < 4; k++) {
            let newNodeRow = current_node.row + directions[k][0];
            let newNodeCol = current_node.col + directions[k][1];
            if (isSafe(grid, newNodeRow, newNodeCol)) {
                let newNode = grid[newNodeRow][newNodeCol]
                if (newNode.isTraversed === false && newNode.isWall === false) {
                    newNode.isTraversed = true
                    newNode.parent = current_node
                    newNode.distance = current_node.distance+1
                    queue.push(newNode)
                }
            }
        }
    }
    let path = []
    if (isDestinationReached) {
        let pathNode = grid[endNode.row][endNode.col]
        while (pathNode !== null) {
            path.push(pathNode)
            pathNode.isPath = true
            pathNode = pathNode.parent
        }
    }
    path.reverse();
    return { path, traversedNode }
}