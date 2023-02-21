const ROWS = 6;
const COLS = 50;
const display = Array(ROWS);

for (let i = 0; i < ROWS; i++) {
    display[i] = Array(COLS);
    display[i].fill(".");
}

const newRect = (cols, rows) => {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            display[y][x] = "#";
        }
    }
}

const rotateRows = (row, amt) => {
    amt %= COLS;
    display[row] = display[row].slice(-amt).concat(display[row].slice(0, -amt));
}

const rotateCols = (col, amt) => {
    amt %= ROWS;
    const temp = Array(ROWS);
    for (let row = 0; row < ROWS; row++) temp[(row + amt) % ROWS] = display[row][col];
    for (row in display) display[row][col] = temp[row];
}


const updateDisplay = (row) => {
    let [a, b] = row.replaceAll(/\D+/g, " ").trim().split(" ").map(Number);
    if (row.match("rect")) newRect(a, b);
    else if (row.match("column")) rotateCols(a, b);
    else if (row.match("row")) rotateRows(a, b);
}

//const puzzle = document.querySelector("#puzzle").innerHTML.split("\n");
let puzzle;

function preload() {
    loadStrings("../input/day08.txt", (res) => {
        puzzle = res;
    });
}

let frame = 0;
const scaling = 20;
function setup() {
    createCanvas(COLS * scaling, ROWS * scaling);
    //noLoop();
    frameRate(10);
}

function draw() {
    background(51);
    fill(0, 255, 0, 100);
    updateDisplay(puzzle[frame]);
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (display[row][col] === "#") rect(col * scaling, row * scaling, scaling, scaling);
        }
    }
    frame++;
    if (frame === puzzle.length-1) noLoop();
}