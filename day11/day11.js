/*
    
4   0   0   0   0   0   0   0   0
3   0   0   0   0   0   0   0   0
2   0   0   0   1   0   1   1   1
1   1   1   1   0   1   0   0   0

swap last   xor 1 << 0 & 1 << 4
swap second xor 1 << 1 & 1 << 5
swap third  xor 1 << 2 & 1 << 6
swap fourth xor 1 << 3 & 1 << 7

swap 1 & 2 << 0
swap 2 & 3 << 4
swap 3 & 4 << 8

bitmap full floor    15 << 0 / 4 / 8 / 12
bitmap forbidden    1010 / 1011 / 0110 / 0111
*/
const puzzle = 645;
const word = 4;
const floorMap = (1 << word) - 1;
let elevator = 0;
const options = [];
for (let x = 1; x < 1 << word + 1; x++) {
    if ((x).toString(2).replace(/0/g, "").length <= 2) options.push(x)
}
const forbidden = [0b1001, 0b1101, 0b0110, 0b0111];
const target = (floorMap << 12 ) + 0.125;

const printFloors = (state) => {
    console.log(`F4 ${state % 1 == 0.125 ? "E" : "."} ${getFloor(state, 3).toString(2).padStart(word, "0")}`)
    console.log(`F3 ${state % 1 == 0.25 ? "E" : "."} ${getFloor(state, 2).toString(2).padStart(word, "0")}`)
    console.log(`F2 ${state % 1 == 0.5 ? "E" : "."} ${getFloor(state, 1).toString(2).padStart(word, "0")}`)
    console.log(`F1 ${state % 1 == 0 ? "E" : "."} ${getFloor(state, 0).toString(2).padStart(word, "0")}`)
    console.log();
}

// given a set off all options and a floor, return every bitmap of possible movements
const getSwaps = (state) => {
    const swaps = [];
    let elevator = state % 1;
    switch (elevator) {
        case 0.5: elevator = 1; break;
        case 0.25: elevator = 2; break;
        case 0.125: elevator = 3; break;
    }
    const floor = getFloor(state, elevator);
    for (combo of options) {
        if (combo === (combo & floor)) {
            if (elevator < 3 && !forbidden.includes(getFloor(state, elevator + 1) ^ combo & floor)) 
            swaps.push({"nextFloor" : elevator+1, "bitmap": (combo ^ combo << word) << (word * elevator)});
            if (elevator > 0 && !forbidden.includes(getFloor(state, elevator - 1) ^ combo & floor)) 
            swaps.push({"nextFloor" :elevator-1, "bitmap": (combo ^ combo << word) << (word * (elevator - 1))});
        }
    }
    return swaps;
}

// given a state of floors and a floor number, return a subset of bits of this floor
const getFloor = (state, n) => {
    return (state & floorMap << n * word) >> n * word;
}

const connections = {};
const search = () => {
    const queue = [];
    const visited = new Set();
    queue.push(state);
    connections[state] = state;
    while (queue.length != 0) {
        state = queue.shift();
        if (state === target) break;
        for (swap of getSwaps(state, elevator)) {
            const newState = (state ^ swap.bitmap) + (swap.nextFloor == 0 ? 0 : 1 / (1 << swap.nextFloor));
            if (!visited.has(newState)) {
                queue.push(newState);
                visited.add(newState);
                connections[newState] = state;
            }
        }
    }
}
let state = puzzle;
search();

const path = [];
let current = target;
while (puzzle != current) {
    path.push(connections[current]);
    current = connections[current];
}
for (p of path) {
    printFloors(p);
}
console.log(path.length);