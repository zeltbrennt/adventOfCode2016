const instruction = day01.split(", ");
const scaling = 5;
let turn = true;
let thisInstruction = instruction[0];
let steps;
let direction = 0;
let corner = 0
let x = 0, y = 0;
const visited = new Set();
let part1, part2;

function setup() {
    createCanvas(1000, 1000);
    //frameRate(15);
    background(51);
    console.log(instruction);
}

function draw() {

    translate(920, 250);
    fill(255, 255, 0);
    noStroke();
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
            part1 = abs(x) + abs(y);
            fill(0, 255, 0);
            circle(x * scaling, y * scaling, 4);
            noLoop();
            console.log("part1: " + part1);
            console.log("part2: " + part2);
        }
    } else {
        x += direction % 2 === 0 ? 0 : direction === 1 ? 1 : -1;
        y += direction % 2 !== 0 ? 0 : direction === 2 ? 1 : -1;
        steps--;
        fill(255, 0, 0);
        circle(x * scaling, y * scaling, scaling);
        if (visited.has(x + "," + y) && !part2) {
            part2 = abs(x) + abs(y);
            fill(255, 255, 0);
            circle(x * scaling, y * scaling, scaling)
        }
        else (visited.add(x + "," + y))
    }
}