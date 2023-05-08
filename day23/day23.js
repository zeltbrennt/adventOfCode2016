const puzzle = [
    "cpy a b",
    "dec b",
    "cpy a d",
    "cpy 0 a",
    "cpy b c",
    "inc a",
    "dec c",
    "jnz c -2",
    "dec d",
    "jnz d -5",
    "dec b",
    "cpy b c",
    "cpy c d",
    "dec d",
    "inc c",
    "jnz d -2",
    "tgl c",
    "cpy -16 c",
    "jnz 1 c",
    "cpy 95 c",
    "jnz 73 d",
    "inc a",
    "inc d",
    "jnz d -2",
    "inc c",
    "jnz c -5"
    
];

const solve = (part) => {
    const reg  = {"a": 7, "b": 0, "c": 0, "d": 0};
    for (let idx = 0; idx < puzzle.length; idx++) {
        const inst = puzzle[idx].split(" ");
        if (inst[0] === "inc") reg[inst[1]]++;
        else if (inst[0] === "dec") reg[inst[1]]--;
        else if (inst[0] === "jnz" && reg[inst[1]] != 0) {
            if (reg.hasOwnProperty(inst[2])) idx+= reg[inst[2]] - 1;
            else idx += Number(inst[2]) - 1;
        }
        else if (inst[0] === "cpy") {
            if (reg.hasOwnProperty(inst[1])) reg[inst[2]] = reg[inst[1]];
            else reg[inst[2]] = Number(inst[1]);
        }
        else if (inst[0] === "tgl") {
            let jump = reg[inst[1]];
            if (idx + jump >= puzzle.length) continue;
            let temp = puzzle[idx + jump].split(" ")
            if (temp.length == 2 && temp[0] == "inc") temp[0] = "dec";
            else if (temp.length == 2 && temp[0] != "inc") temp[0] = "inc";
            else if (temp.length == 3 && temp[0] == "jnz") temp[0] = "cpy";
            else if (temp.length == 3 && temp[0] != "jnz") temp[0] = "jnz";
            puzzle[idx + jump] = temp.join(" ");
        }
    }
    console.log(`Part ${part}: ${reg.a}`);
}

solve(1);
