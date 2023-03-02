const md5 = require("md5");

const openDoors = (pos, key) => {
    const doors = [];
    const status = md5(key).slice(0, 4).split("");
    status.forEach(x => doors.push("bcdef".includes(x)));
    if (pos.y === 0) doors[0] = false;
    if (pos.y === 3) doors[1] = false;
    if (pos.x === 0) doors[2] = false;
    if (pos.x === 3) doors[3] = false;
    return doors;
}

const bfs = (puzzle) => {
    let node = [{x: 0, y: 0}, puzzle];
    const queue = [];
    queue.push(node);
    while (queue.length !== 0) {
        let [pos, path] = queue.shift();
        if (pos.x === 3 && pos.y === 3) {
            return (path.slice(puzzle.length));
        }
        const doors = openDoors(pos, path)
        for (let i = 0; i < doors.length; i++) {
            if (i === 0 && doors[i]) {
                queue.push([{x: pos.x, y: pos.y - 1}, path + "U"]);
            } else if (i === 1 && doors[i]) {
                queue.push([{x: pos.x, y: pos.y + 1}, path + "D"]);
            } else if (i === 2 && doors[i]) {
                queue.push([{x: pos.x - 1, y: pos.y}, path + "L"]);
            } else if (i === 3 && doors[i]) {
                queue.push([{x: pos.x + 1, y: pos.y}, path + "R"]);
            }
        }
    }
    return null;
}

const dfs = (pos, path, steps) => {
    if (pos.x === 3 && pos.y === 3) {
        return steps;
    }
    const doors = openDoors(pos, path)
    const paths = [];
    for (let i = 0; i < doors.length; i++) {
        if (i === 0 && doors[i]) {
            paths.push(dfs({x: pos.x, y: pos.y - 1}, path + "U", steps + 1));
        } else if (i === 1 && doors[i]) {
            paths.push(dfs({x: pos.x, y: pos.y + 1}, path + "D", steps + 1));
        } else if (i === 2 && doors[i]) {
            paths.push(dfs({x: pos.x - 1, y: pos.y}, path + "L", steps + 1));
        } else if (i === 3 && doors[i]) {
            paths.push(dfs({x: pos.x + 1, y: pos.y}, path + "R", steps + 1));
        }
    }
    if (paths.length > 0) return paths.reduce((a, b) => a > b ? a : b);
    else return 0;
}
/*
console.assert(bfs("hijkl") === null);
console.assert(bfs("ihgpwlah") === "DDRRRD");
console.assert(bfs("kglvqrro") === "DDUDRLRRUDRD");
console.assert(bfs("ulqzkmiv") === "DRURDRUDDLLDLUURRDULRLDUUDDDRR");

console.assert(dfs({x: 0, y: 0}, "ihgpwlah", 0) === 370);
console.assert(dfs({x: 0, y: 0}, "kglvqrro", 0) === 492);
console.assert(dfs({x: 0, y: 0}, "ulqzkmiv", 0) === 830);
*/
