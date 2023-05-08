const puzzle = [

];

const solve = (part) => {
    const reg  = {"a": 7, "b": 0, "c": 0, "d": 0};
    if (part == 2) reg.a = 12;
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
        else if (inst[0] === "mult") {
            reg[inst[1]] = reg[inst[2]] * reg[inst[3]];
        }
    }
    console.log(`Part ${part}: ${reg.a}`);
}

solve(2);
