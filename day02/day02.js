let puzzle;
let scaling;
let frame;
let visited;
const keypad = [0, 0, 1, 0, 0,
    0, 2, 3, 4, 0,
    5, 6, 7, 8, 9, 
    0,'A','B','C',0,
    0, 0, 'D',0,0];

function preload() {
    loadStrings("../input/day02.txt", (res) => {
        puzzle = res;
    });
}

function setup() {
    createCanvas(600, 600);
    scaling = width / 5;
    visited = [];
    part1();
    part2();
    frame = 0;
    console.log(visited);
    //frameRate(1);
}

function draw() {
    background(255);
    if (frame < visited.length / 2) drawP1Keypad(frame);
    else drawP2Keypad(frame);
    frame++;

}

function drawP1Keypad(frame) {
    strokeWeight(4);
    textSize(width / 6);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let idx = i + j * 3;
            fill(idx === visited[frame] ? 51 : 200);
            rect(i * scaling, j * scaling, scaling, scaling);
            fill(0);
            text(idx + 1, i * scaling, j * scaling, 80);
        }
    }
}

function drawP2Keypad(frame) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let idx = i + j * 5;
            if ([0, 1, 3, 4, 5, 9, 15, 19, 20, 21, 23, 24].includes(idx)) continue;
            fill(idx === visited[frame] ? 51 : 200);
            rect(i * scaling, j * scaling, scaling, scaling);
            fill(0);
            text(keypad[idx], i * scaling, j * scaling, 80); 
        }
    }
}


function part1() {
    let pos = 5;
    let solution = "";
    for (let line of puzzle) {
        for (let char of line) {
            if (char === 'U' && pos > 2) pos -= 3;
            else if (char === 'D' && pos < 6) pos += 3;
            else if (char === 'L' && pos % 3 != 0) pos -= 1;
            else if (char === 'R' && pos % 3 != 2) pos += 1;
            visited.push(pos);
        }
        solution += pos + 1;
    }
    console.log(solution);
}

function part2() {
    let pos = 10;
    let solution = "";
    visited.push(10);
    for (let line of puzzle) {
        for (let char of line) {
            if (char === 'U' &&      ![1, 2, 4, 5, 9].includes(keypad[pos])) pos -= 5;
            else if (char === 'D' && ![5, 'A', 'D', 'C', 9].includes(keypad[pos])) pos += 5;
            else if (char === 'L' && ![5, 2, 'A', 1, 'D'].includes(keypad[pos])) pos -= 1;
            else if (char === 'R' && ![1, 4, 9, 'C', 'D'].includes(keypad[pos])) pos += 1;
            visited.push(pos);
        }
        solution += keypad[pos];
    }
    console.log(solution);
}