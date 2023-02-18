let puzzle;

function preload() {
    loadStrings("../input/day02.txt", (res) => {
        puzzle = res;
    });
}

function setup() {
    createCanvas(800, 800);
    console.log(puzzle);
}

function draw() {
    background(220);
}
