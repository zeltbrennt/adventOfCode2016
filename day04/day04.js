let puzzle;

function preload() {
    loadStrings("../input/day04.txt", (res) => {
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
    let solution = 0;
    for (let line of puzzle) {
        const letters = new Map();
        for (let char of line) {
            if (char === "-") continue;
            if (char <= "9") break;
            if (letters.has(char)) letters.set(char, letters.get(char) + 1);
            else (letters.set(char, 1));
        }
        const sorted = [...letters.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(b[0]));
        let checksum = "";
        for (let i = 0; i < 5 && i < sorted.length; i++) checksum += sorted[i][0];
        if (checksum === line.substring(line.indexOf("[") + 1, line.indexOf("]"))) {
            solution += Number(line.replaceAll(/\D/g, ""));
        }
    }
    console.log(solution);
}

function part2() {
    for (let line of puzzle) {
        let name = "";
        const cypher = Number(line.replaceAll(/\D/g, ""));
        for (let char of line) {
            if (char === "-") {
                name += " ";
                continue;
            }
            if (char <= "9") break;
            name += String.fromCharCode((char.charCodeAt(0) - 97 + cypher) % 26 + 97);
        }
        if (name.includes("north")) {
            console.log(cypher);
            break;
        }
    }
}