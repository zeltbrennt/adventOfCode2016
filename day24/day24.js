const puzzle = [
  
]

const HEIGHT = puzzle.length;
const WIDTH = puzzle[0].length;

const maze = [];
const stations = {};
for (let y = 0; y < puzzle.length; y++) {
    const row = puzzle[y];
    maze.push(new Array(HEIGHT));
    for (let x = 0; x < WIDTH; x++) {
        const cell = row[x];
        maze[y][x] = cell;
        if (!isNaN(cell)) stations[cell] = {x, y};
    }
}

const getNeighbors = (x, y) => {
    const neighbors = [];
    if (x > 0 && maze[y][x-1] != "#") neighbors.push({'x': x-1, 'y': y});
    if (y > 0 && maze[y-1][x] != "#") neighbors.push({'x': x, 'y': y-1});
    if (x < WIDTH && maze[y][x+1] != "#") neighbors.push({'x': x+1, 'y': y});
    if (y < HEIGHT && maze[y+1][x] != "#") neighbors.push({'x': x, 'y': y+1});
    return neighbors;
}

const getDistance = (origin, target) => {
    const queue = [];
    const visited = new Set();
    const level = []
    queue.push(origin);
    level.push(0);
    while (queue.length != 0) {
        const current = queue.shift();
        const steps = level.shift();
        if (current.x == target.x && current.y == target.y) return steps;
        for (let neighbor of getNeighbors(current.x, current.y)) {
            if (!visited.has('' + neighbor.x + '-' + neighbor.y)) {
            visited.add('' + neighbor.x + '-' + neighbor.y);
            queue.push({'x': neighbor.x, 'y': neighbor.y});
            level.push(steps+1);
            }
        }
    }
    return NaN;
}

console.log(puzzle);
console.log(stations);

for (let s in stations) {
    for (let d in stations) {
        console.log(d);
        stations[s][d] = getDistance(stations[s], stations[d]);
    }
}

const shortestRoute = (visited, path, current) => {
    visited += current;
    for (let neighbor in stations) {
        if (!visited.includes(neighbor)) shortestRoute(visited, path + stations[current][neighbor], neighbor);
    }
    if (visited.length == Object.keys(stations).length && path < shortestPath) {
        console.log('[' + visited + ']' + ':' + path);
        shortestPath = path;
    }
}
let shortestPath = Number.MAX_SAFE_INTEGER;
shortestRoute('', 0, '0');
console.log(shortestPath);