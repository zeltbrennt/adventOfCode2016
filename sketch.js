let puzzle;

function preload() {
  loadStrings("../input/dayXX.txt", (res) => {
    puzzle = res;
  });
}

function setup() {
  createCanvas(600, 600);
  part1();
  part2();
}

function draw() {
  background(220);
}

function part1() {
  let solution;
  console.log(solution);
}

function part2() {
  let solution;
  console.log(solution);
}