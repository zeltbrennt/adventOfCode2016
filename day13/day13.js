const magicNumber = 10;
const start = {"x": 1, "y": 1};
const target = {"x":7, "y": 4};
const range = 50;

const isOpen = (x, y, n) => {
    let z = x * x + 3 * x + 2 * x * y + y + y * y + n;
    let result = 0;
    while (z != 0) {
        result += z % 2;
        z = z / 2 | 0;
    }
    return result % 2 == 0;
}

const scan = (pos) => {
    const path = [];
    let neighbors = [{"x": pos.x + 1, "y": pos.y}, {"x": pos.x - 1, "y": pos.y }, {"x": pos.x, "y": pos.y + 1}, {"x": pos.x, "y": pos.y - 1}]
    for (n of neighbors) {
        if (n.x >= 0 && n.y >= 0 && isOpen(n.x, n.y, magicNumber)) path.push(n);
    }
    return path;
}

const solve = (part) => {
    const queue = [];
    const visited = new Set();
    queue.push([start, 0]);
    let maxDepth = 0;
    while (true) {
        let [pos, depth] = queue.shift();
        if (part == 2 && depth > range) break;
        if (depth > maxDepth) maxDepth++;
        if (part == 1 && pos.x == target.x && pos.y == target.y) {
            console.log(`Part 1: ${depth}`);
            break;
        }
        visited.add(`(${pos.x},${pos.y})`);
        for (next of scan(pos)) {
            let nextKey = `(${next.x},${next.y})`;
            if (!visited.has(nextKey)) {
                queue.push([next, depth + 1]);
            }
        }
    }
    if (part == 2) console.log(`Part 2: ${visited.size}`);
}

solve(1);
solve(2);