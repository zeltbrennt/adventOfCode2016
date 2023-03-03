const puzzle = 5;

let a = Math.log(puzzle) / Math.log(2);
console.log(`Part 1: ${((puzzle ^ ( 1 << a)) << 1) + 1}`);

let b = Math.log(puzzle) / Math.log(3) | 0;
let p = 3 ** b;
let temp = puzzle - p;
if (temp > p) {
    console.log(`Part 2: ${p + 2 * (temp - p)}`);
} else console.log(`Part 2: ${temp}`);