input = [
"root@ebhq-gridcenter# df -h",
"Filesystem            Size  Used  Avail  Use%",
"/dev/grid/node-x0-y0   10T    8T     2T   80%",
"/dev/grid/node-x0-y1   11T    6T     5T   54%",
"/dev/grid/node-x0-y2   32T   28T     4T   87%",
"/dev/grid/node-x1-y0    9T    7T     2T   77%",
"/dev/grid/node-x1-y1    8T    0T     8T    0%",
"/dev/grid/node-x1-y2   11T    7T     4T   63%",
"/dev/grid/node-x2-y0   10T    6T     4T   60%",
"/dev/grid/node-x2-y1    9T    8T     1T   88%",
"/dev/grid/node-x2-y2    9T    6T     3T   66%"

]

class Node {
    static maxX = 0;
    static maxY = 0;
    constructor(x, y, size, used, avail, fill) {
        this.x = Number(x);
        this.y = Number(y);
        this.size = Number(size);
        this.avail = Number(avail);
        this.used = Number(used);
        this.fill = Number(fill)
        Node.maxX = Math.max(Node.maxX, x);
        Node.maxY = Math.max(Node.maxY, y);
    }

    isViablePair(other) {
        return this.used != 0 && !(this.x == other.x && this.y == other.y) && this.used <= other.avail;
    }
}

nodes = []
for (let s of input.slice(2)) {
    nodes.push(new Node(...s.match(/\d+/g)));
}
pairs = 0
for (let a of nodes) {
    for (let b of nodes) {
        if (a.isViablePair(b)) pairs++;
    }
}
console.log(pairs + ' / ' + nodes.length)


grid = new Array(Node.maxY + 1);
for (let y = 0; y <= Node.maxY; y++) {
    grid[y] = new Array(Node.maxY);
}

for (let node of nodes) {
    grid[node.y][node.x] = node;
}

// solve visualy
console.log(grid.map(row => row.map(element => {
    if (element.x == 0 && element.y == 0) return '>';
    if (element.x == Node.maxX && element.y == 0) return 'G';
    if (element.used > 100) return '#'
    if (element.used == 0) return '_'
    return '.'}).join(' ')).join('\n'));

