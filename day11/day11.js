/*
    thG thM plG plM stG stM prG prM ruG ruM 
4   0   0   0   0   0   0   0   0   0   0   
3   0   0   0   0   0   0   1   1   1   1   
2   0   0   0   1   0   1   0   0   0   0   
1   1   1   1   0   1   0   0   0   0   0   


*/
//const puzzle = "5-8-2-0-0";
const puzzle = "928-80-15-0-0";
//const puzzle = "14863-1280-240-0-0";
const word = 10;
//const word = 6;
const options = [];
for (let x = 1; x < 1 << word; x++) {
    if ((x).toString(2).replace(/0/g, "").length <= 2) options.push(x)
}
//const forbidden = [0b1001, 0b1101, 0b0110, 0b0111];
const forbidden = [];
const target = "0-0-0-1023-3";
//const target = "0-0-0-16383-3";
const printFloors = (state) => {
    const floors = state.split("-").map(Number);
    const elevator = floors.pop();
    floors.reverse().forEach((x, i) => console.log(`F${4 - i} ${(3 - i) == elevator ? "E" : "."} ${x.toString(2).padStart(word, "0")}`))
    console.log();
}

const validFloor = (floor) => {
    if (0b1010101010 & floor == 0) return true;
    //if (0b1010 & floor == 0) return true;
    for (let i = 0; i < word; i+=2) {
        if ((1 << i & floor) == 0) continue; 
        if ((1 << (i + 1) & floor) == 0) return false;
    }
    return true;
}


// given a set off all options and a floor, return every bitmap of possible movements
const getNextMoves = (state) => {
    const floors = state.split("-").map(Number);
    const moves = [];
    const elevator = floors.pop();
    const floor = floors[elevator];
    const fa = floors[elevator + 1];
    const fb = floors[elevator - 1];
    for (combo of options) {
        if (combo === (combo & floor)) {
            if (elevator < 3 && validFloor(fa ^ combo)) {
                floors[elevator] = floor ^ combo;
                floors[elevator + 1] = fa ^ combo;
                let newState = "";
                floors.forEach(x => newState += x + "-");
                moves.push(newState + (elevator + 1));
                floors[elevator + 1] = fa;
                floors[elevator] = floor;
            }
            if (elevator > 0 && validFloor(fb ^ combo)) {
                floors[elevator] = floor ^ combo;
                floors[elevator - 1] = fb ^ combo;
                let newState = "";
                floors.forEach(x => newState += x + "-");
                moves.push(newState + (elevator - 1));
                floors[elevator - 1] = fb;
                floors[elevator] = floor;
            }
        }
    }
    return moves;
}

const getPath = () => {
    const path = [];
    let current = target;
    while (puzzle != current) {
        path.push(connections[current]);
        current = connections[current];
    }
    printFloors(target);
    for (p of path) {
        printFloors(p);
    }
    console.log(path.length);
    
}

const connections = {};
const search = () => {
    let state = puzzle;
    const queue = [];
    const visited = new Set();
    queue.push(state);
    connections[state] = state;
    while (queue.length != 0) {
        state = queue.shift();
        //printFloors(state);
        if (state === target) {
            getPath();
            break;
        }
        for (newState of getNextMoves(state)) {
            if (!visited.has(newState)) {
                queue.push(newState);
                visited.add(newState);
                connections[newState] = state;
            }
        }
    }
}
console.log("start");
search();
console.log("stop");



