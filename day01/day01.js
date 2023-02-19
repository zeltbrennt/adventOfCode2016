let instruction;

function preload() {
    instructions = loadStrings("../input/day01.txt", (res) => {
        instruction = res.toString().split(", ");
    });
}

const scaling = 5;
let turn = true;
let thisInstruction;
let steps;
let direction = 0;
let corner = 0
let x = 0, y = 0;
const visited = new Set();
let part1, part2;

function setup() {
    createCanvas(1000, 1000);
    //frameRate(1);
    thisInstruction = instruction[0];
}

function draw() {
    background(51);
    translate(920, 250);
    fill(255, 255, 0);
    stroke(255);
    line(0, 0, x * scaling, 0);
    line(x * scaling, 0, x * scaling, y * scaling);
    noStroke();
    fill(0, 255, 0);
    circle(0, 0, 4);
    fill(255, 0, 0);
    for (let p of visited) circle(p.split(",")[0] * scaling, p.split(",")[1] * scaling, 4);
    part1 = abs(x) + abs(y);
    document.querySelector("#part1").innerText = "part 1: " + part1;
    document.querySelector("#part2").innerText = "part 2: " + part2;
    if (turn && corner === 0) circle(0, 0, 4);
    if (turn) {
        if (thisInstruction.startsWith("R")) direction = direction === 3 ? 0 : direction + 1;
        else direction = direction === 0 ? 3 : direction - 1;
        steps = thisInstruction.substring(1);
        turn = false;
    }
    if (steps === 0) {
        turn = true;
        corner++;
        thisInstruction = instruction[corner];
        if (corner === instruction.length) {
            fill(0, 255, 0);
            circle(x * scaling, y * scaling, 4);
            noLoop();
        }
    } else {
        x += direction % 2 === 0 ? 0 : direction === 1 ? 1 : -1;
        y += direction % 2 !== 0 ? 0 : direction === 2 ? 1 : -1;
        steps--;
        if (visited.has(x + "," + y) && !part2) {
            part2 = abs(x) + abs(y);
            fill(255, 255, 0);
            circle(x * scaling, y * scaling, scaling)
        }
        else (visited.add(x + "," + y))
    }
}