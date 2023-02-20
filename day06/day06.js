const freq = (str, part) => {
    const tally = new Map();
    Array.prototype.flip = part == 1 ? Array.prototype.pop : Array.prototype.shift;
    for (let c of str) {
        if (tally.has(c)) tally.set(c, tally.get(c) + 1);
        else (tally.set(c, 1));
    }
    return [...tally.entries()].sort((a, b) => a[1] - b[1]).flip()[0];
}

const solve = (arr, part) => {
    let answer = "";
    for (let i = 0; i < arr[0].length; i++) {
        let col = "";
        for (let j = 0; j < arr.length; j++) {
            col += arr[j].charAt(i);
        }
        answer += freq(col, part);
    }
    console.log(answer);
}

solve(puzzle, 1);
solve(puzzle, 2);