const magicNumber = 1358;
const start = { "x": 1, "y": 1 };
const target = { "x": 31, "y": 39 };
const range = 50;
const queue = [];
const visited = new Set();
let maxDepth = 0;
let current = start;
const scaling = 16;
let found = false;
const con = {};

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
    let neighbors = [{ "x": pos.x + 1, "y": pos.y },
    { "x": pos.x - 1, "y": pos.y },
    { "x": pos.x, "y": pos.y + 1 },
    { "x": pos.x, "y": pos.y - 1 }]
    for (n of neighbors) {
        if (n.x >= 0 && n.y >= 0 && isOpen(n.x, n.y, magicNumber)) path.push(n);
    }
    return path;
}

const showPath = (con) => {
    const path = [];
    let current = `(${target.x},${target.y})`;
    let startKey = `(${start.x},${start.y})`;
    path.push(current);
    while (current != startKey) {
        path.push(con[current]);
        current = con[current];
    }
    return path;
}

const nextStep = () => {
    let [pos, depth] = queue.shift();
    rect(pos.x * scaling, pos.y * scaling, scaling, scaling)
    if (depth > maxDepth) maxDepth++;
    if (pos.x == target.x && pos.y == target.y) {
        found = true;
        return showPath(con);
    }
    visited.add(`(${pos.x},${pos.y})`);
    for (next of scan(pos)) {
        let nextKey = `(${next.x},${next.y})`;
        if (!visited.has(nextKey)) {
            queue.push([next, depth + 1]);
            con[nextKey] = `(${pos.x},${pos.y})`;
        }
    }
    return depth;
}

function setup() {
    createCanvas(800, 800);
    queue.push([start, 0]);
    background(220);
    con[start] = start;
}

function draw() {
    noStroke();
    fill(51, maxDepth > range ? 51 : map(maxDepth, 0, range, 250, 100), 51);
    current = nextStep();
    if (found) {
        noLoop();
        noFill();
        stroke(255, 0, 0);
        strokeWeight(3);
        beginShape();
        for (v of current) {
            let coord = v.replaceAll(/\D/g, " ").trim().split(" ");
            vertex(coord[0] * scaling + scaling / 2, coord[1] * scaling + scaling / 2);
        }
        endShape();
    }
}
