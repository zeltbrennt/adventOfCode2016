const input = document.querySelector("pre").innerHTML.split("\n");

for (let i = 0; i < input.length - 1; i++) {
    input[i] = input[i].split("-").map(Number);
}
input.sort((a, b) => a[0] > b[0]);

let part1 = true;
let minIP = 0;
let allowed = 0;
for (let i = 0; i < input.length; i++) {
    if (minIP >= input[i][0] && minIP < input[i][1]) minIP = input[i][1] + 1;
    else if (input[i][0] > minIP) {
        allowed += (input[i][0] - minIP);
        if (part1) {
            console.log("part 1: " + minIP);
            part1 = false;
        }
        minIP = input[i][1] + 1;
    }
}

console.log("part 2: " + allowed);