let puzzle;
const values = [];
let frame = 0;
let p1 = p2 = 0;
let fr = 1

function preload() {
    loadStrings("../input/day03.txt", (res) => {
        puzzle = res;
    });
}

function setup() {
    createCanvas(600, 600);
    part1();
    part2();
    frameRate(1);
}

function draw() {
    background(255);
    stroke(55);
    const {a, b, c} = values[frame];
    translate(50, 50);
    line(0, 0, c/2, 0);
    stroke(200);
    noFill();
    circle(0, 0, a);
    circle(c/2, 0, b);
    const x = (Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * c);
    if (Math.pow(a, 2) > Math.pow(x, 2)) {
        const y = Math.sqrt(Math.pow(a, 2) - Math.pow(x, 2));
        stroke(55);
        line(c/2, 0, x/2, y/2);
        line(0, 0, x/2, y/2);
        if (frame < puzzle.length) p1++;
        else p2++;
    }
    document.querySelector("#part1").innerText = "Part 1: " + p1;
    document.querySelector("#part2").innerText = "Part 2: " + p2;
    frame++;
    if (frame == values.length) noLoop();
    if (frame > 10 && fr < 60) frameRate(fr++);
}

function part1() {
    let solution = 0;
    for (let line of puzzle) {
        const [a, b, c] = line.trim().split(/\s+/).map(Number);
        values.push({"a":a, "b":b, "c":c});
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
        values.push({"a":a1, "b": b1, "c": c1});
        values.push({"a":a2, "b": b2, "c": c2});
        values.push({"a":a3, "b": b3, "c": c3});
        if (a1 + b1 > c1 && a1 + c1 > b1 && b1 + c1 > a1) solution++;
        if (a2 + b2 > c2 && a2 + c2 > b2 && b2 + c2 > a2) solution++;
        if (a3 + b3 > c3 && a3 + c3 > b3 && b3 + c3 > a3) solution++;
    }
    console.log(solution);
}