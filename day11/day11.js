/*
    thG thM plG plM stG stM prG prM ruG ruM 
4   0   0   0   0   0   0   0   0   0   0   
3   0   0   0   0   0   0   1   1   1   1   
2   0   0   0   1   0   1   0   0   0   0   
1   1   1   1   0   1   0   0   0   0   0   


*/
//const puzzle = "5-8-2-0-0";
//const puzzle = "928-80-15-0-0";
const puzzle = "14863-1280-240-0-0";
//const word = 6;
//const word = 10;
const word = 14;
const moveDown = [];
for (let x = 1; x < 1 << word; x++) {
    if ((x).toString(2).replace(/0/g, "").length == 2) moveDown.push(x)
}
moveDown.push(...[...Array(10).keys()].map(x => 1 << x));
const moveUp = moveDown.slice().reverse();
//const target = "0-0-0-15-3";
//const target = "0-0-0-1023-3";
const target = "0-0-0-16383-3";
const printFloors = (state) => {
    const floors = state.split("-").map(Number);
    const elevator = floors.pop();
    floors.reverse().forEach((x, i) => console.log(`F${4 - i} ${(3 - i) == elevator ? "E" : "."} ${x.toString(2).padStart(word, "0")}`))
    console.log();
}

const validFloor = (floor) => {
    return true; // optimal solution under constraint is the same as without constraint for this input...
    //if ((0b101010101010 & floor) == 0) return true;
    //if (0b1010 & floor == 0) return true;
    for (let i = 0; i < word; i+=2) {
        if ((1 << i & floor) == 0) continue; 
        if ((1 << (i + 1) & floor) == 0) return false;
    }
    return true;
}


// given a set off all options and a floor, return every bitmap of possible movements
const getNextMove = (state) => {
    const floors = state.split("-").map(Number);
    const moves = [];
    const elevator = floors.pop();
    const floor = floors[elevator];
    const fa = floors[elevator + 1];
    const fb = floors[elevator - 1];

    //if (elevator > 0 && fb != 0) {
    if (elevator < 3) {
        for (combo of moveDown) {
            if (combo == (combo & floor) && validFloor(fb ^ combo) && validFloor(floor ^ combo)) {
                floors[elevator] = floor ^combo;
                floors[elevator - 1 ] = fb ^ combo;
                let newState = "";
                floors.forEach(x => newState += x + "-");
                newState += (elevator - 1);
                moves.push(newState);
            }
        }
    } else {
        for (combo of moveUp) {
            if (combo == (combo & floor) && validFloor(fa ^ combo) && validFloor(floor ^ combo)) {
                floors[elevator] = floor ^combo;
                floors[elevator + 1 ] = fa ^ combo;
                let newState = "";
                floors.forEach(x => newState += x + "-");
                newState += (elevator +1);
                moves.push(newState);
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
    const stack = [];
    const visited = new Set();
    stack.push(state);
    connections[state] = state;
    while (stack.length != 0) {
        state = stack.pop();
        if (state === target) {
            getPath();
            break;
        }
        for (newState of getNextMove(state)) {
            if (!visited.has(newState)) {
                stack.push(newState);
                visited.add(newState);
                connections[newState] = state;
            }
        }
    }
}
search();
