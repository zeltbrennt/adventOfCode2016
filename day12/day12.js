const solve = (part) => {
    const reg  = {"a": 0, "b": 0, "c": 0, "d": 0};
    let idx = 0;
    if (part == 2) reg.c = 1;
    while (idx < puzzle.length) {
        const inst = puzzle[idx].split(" ");
        if (inst[0] === "inc") reg[inst[1]]++;
        if (inst[0] === "dec") reg[inst[1]]--;
        if (inst[0] === "jnz" && reg[inst[1]] != 0) idx+= inst[2] - 1;
        if (inst[0] === "cpy") {
            if (reg.hasOwnProperty(inst[1])) reg[inst[2]] = reg[inst[1]];
            else reg[inst[2]] = Number(inst[1]);
        }
        idx++;
    }
    console.log(`Part ${part}: ${reg.a}`);
}

solve(1);
solve(2);
