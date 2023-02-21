const puzzle = document.querySelector("pre").innerHTML;
const marker = /\(\d+x\d+\)/g;

let match;
let solution = puzzle.replaceAll(/\s/g, "").length;
while (match = marker.exec(puzzle)) {
    const [len, rep] = match[0].slice(1, -1).split("x").map(Number);
    solution = solution - match[0].length + len * (rep - 1);
    marker.lastIndex = match.index + match[0].length + len;
}
console.log("Part 1: " + solution);

solution = 0;
const mult = Array(puzzle.length);
mult.fill(1);
for (match of puzzle.matchAll(marker)) {
    const [len, rep] = match[0].slice(1, -1).split("x").map(Number);
    for (let i = match.index + match[0].length; i < match.index + match[0].length + len; i++) mult[i] *= rep;
}
for (let i = 0; i < puzzle.length; i++) if (puzzle[i].match(/[A-Z]/)) solution += mult[i];

console.log("Part 2: " + solution);