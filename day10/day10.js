//const puzzle = document.querySelector("pre").innerHTML.split("\n");

const robots = {};
const values = {};
const output = {};

for (def of puzzle) {
    if (def.match("value")) {
        const [val, bot] = def.replaceAll(/\D+/g, " ").trim().split(" ");
        values[val] = bot;
    } else {
        const src = def.match(/\d+/)[0];
        const lowOut = def.match(/(?<=low to output )\d+/);
        const highOut = def.match(/(?<=high to output )\d+/);
        const lowBot = def.match(/(?<=low to bot )\d+/);
        const highBot = def.match(/(?<=high to bot )\d+/);
        robots[src] = {};
        robots[src].low = lowOut ? "out_" + lowOut[0] : lowBot[0];
        robots[src].high = highOut ? "out_" + highOut[0] : highBot[0];
        robots[src].values = new Set();
        if (highOut) output[highOut[0]] = [src, "high"];
        if (lowOut) output[lowOut[0]] = [src, "low"];
    }
}

for (value in values) {
    robots[values[value]].values.add(+value);
}

let complete;
while (!complete) {
    complete = true;
    for (bot in robots) {
        if (robots[bot].values.size == 2) {
            const low = robots[bot].low;
            const high = robots[bot].high;
            if (low in robots && robots[low].values.size < 2) robots[low].values.add(Math.min(...robots[bot].values));
            if (high in robots && robots[high].values.size < 2) robots[high].values.add(Math.max(...robots[bot].values));
        } else {
            complete = false;
        }
    }
}
console.log(robots);
let part2 = 1;
for (bot in robots) {
    if (robots[bot].values.has(61) && robots[bot].values.has(17)) console.log("Part 1: " + bot);
    if (["out_0", "out_1", "out_2"].includes(robots[bot].low)) part2 *= Math.min(...robots[bot].values);
    if (["out_0", "out_1", "out_2"].includes(robots[bot].high)) part2 *= Math.max(...robots[bot].values);
}
console.log("Part 2: " + part2);
