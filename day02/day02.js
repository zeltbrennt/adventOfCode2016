let puzzle;
let scaling;
let frame;
let visited;
const keypad = [0, 0, 1, 0, 0,
    0, 2, 3, 4, 0,
    5, 6, 7, 8, 9, 
    0,'A','B','C',0,
    0, 0, 'D',0,0];
const intervals = [0];
let solution = "";

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
    for (let line of puzzle) {
        let sum = intervals[intervals.length -1] + line.length;
        intervals.push(sum);
    }
    intervals.shift();
}

function draw() {
    background(255);
    if (frame < visited.length / 2) {
        drawP1Keypad(frame);
        if (intervals.includes(frame)) document.querySelector("#part1").innerText = "Part 1: " + solution.substring(0, intervals.indexOf(frame) + 1);
    }
    else {
        drawP2Keypad(frame);
        if (intervals.includes(frame - intervals[intervals.length-1])) {
            let stop = intervals.indexOf(frame - intervals[intervals.length-1]) + puzzle.length;
            document.querySelector("#part2").innerText = "Part 2: " + solution.substring(puzzle.length, stop + 1) ;
        }
    }
    frame++;

}

function drawP1Keypad(frame) {
    strokeWeight(4);
    textSize(width / 6);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let idx = i + j * 3;
            fill(idx === visited[frame] ? 51 : 200);
            newRect(i * scaling, j * scaling, scaling, scaling);
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
            newRect(i * scaling, j * scaling, scaling, scaling);
            fill(0);
            text(keypad[idx], i * scaling, j * scaling, 80); 
        }
    }
}


function part1() {
    let pos = 5;
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
    console.log(solution.substring(puzzle.length));
}