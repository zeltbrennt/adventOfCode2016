let puzzle;

function preload() {
    loadStrings("../input/day03.txt", (res) => {
        puzzle = res;
    });
}

function setup() {
    createCanvas(800, 800);
    part1();
    part2();
}

function draw() {
    background(220);
}

function part1() {
    let solution = 0;
    for (let line of puzzle) {
        const [a, b, c] = line.trim().split(/\s+/).map(Number);
        if (a + b > c && a + c > b && b + c > a) solution++;
    }
    console.log(solution);
}

function part2() {
    let solution = 0;
    for (let i = 0; i < puzzle.length; i+=3) {
        const [a1, a2, a3] = puzzle[i].trim().split(/\s+/).map(Number);
        const [b1, b2, b3] = puzzle[i+1].trim().split(/\s+/).map(Number);
        const [c1, c2, c3] = puzzle[i+2].trim().split(/\s+/).map(Number);
        if (a1 + b1 > c1 && a1 + c1 > b1 && b1 + c1 > a1) solution++;
        if (a2 + b2 > c2 && a2 + c2 > b2 && b2 + c2 > a2) solution++;
        if (a3 + b3 > c3 && a3 + c3 > b3 && b3 + c3 > a3) solution++;
    }
    console.log(solution);
}