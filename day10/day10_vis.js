let grid = new Array();
const values = [31, 47, 2, 19, 5, 11, 41, 29, 17, 71, 37, 67, 73, 3, 7, 61, 13, 23, 53, 59, 43];
for (let i = 0; i < 20; i++) {
    grid[i] = new Array(i + 1);
    for (let j = 0; j <= i; j++) {
        grid[i][j] = new Array(2);
        grid[i][j][0] = j == 0 ? values[i + 1] : 0;
        grid[i][j][1] = 0;
    }
}
grid[0][0][1] = values[0];
let row, col;

function setup() {
    createCanvas(880, 440);
    //noLoop();
    frameRate(3);
    //console.log(grid);
    row = 0;
    col = 0;
}

function draw() {
    background(200);
    textAlign(CENTER);

    for (let y = 0; y < values.length; y++) {

        fill(map(values[y], 2, 73, 100, 250));
        rect(0, y * 20, 80, 20);
        fill(51);
        text(values[y], 12, y * 20 + 5, 12);
    }

    translate(40, 20);
    for (y in grid) {
        for (x in grid[y]) {
            // draw the state
            noStroke();
            fill(grid[y][x][0] == 0 ? 0 : map(grid[y][x][0], 2, 73, 100, 250));
            rect(x * 40, y * 20, 20, 20);
            fill(grid[y][x][1] == 0 ? 0 : map(grid[y][x][1], 2, 73, 100, 250));
            rect(x * 40 + 20, y * 20, 20, 20);
            fill(grid[y][x][0] < grid[y][x][1] ? "#4CAF50" : grid[y][x][0] > grid[y][x][1] ? "#F44336" : "#515151");
            text(grid[y][x][0], x * 40 + 4, y * 20 + 5, 12);
            fill(grid[y][x][1] < grid[y][x][0] ? "#4CAF50" : grid[y][x][1] > grid[y][x][0] ? "#F44336" : "#515151");
            text(grid[y][x][1], x * 40 + 24, y * 20 + 5, 12);
            noFill();
            stroke(100, 100);
            rect(x * 40, y * 20, 40, 20);
        }
    }

    noStroke();
    for (let x = 0; x < 21; x++) {
        let value = x < 20 ? Math.min(...grid[19][x]) : Math.max(...grid[19][+x - 1]);
        fill(map(value, 2, 73, 100, 250));
        rect(x * 40, 400, 40, 20);
        fill(51);
        text(value, x * 40 + 12, 405, 12);
    }
    if (col == grid.length - 1) noLoop();
    [row, col] = step(row, col);
}

function step(y, x) {
    //console.log(grid[y][x].toString());
    let idx;
    let val = Math.min(...grid[y][x]);
    if (y < grid.length - 1) {
        idx = grid[+y + 1][x].lastIndexOf(0);
        if (idx != -1 && !grid[+y + 1][x].includes(val)) {
            grid[+y + 1][x][idx] = val;
        }
    }
    val = Math.max(...grid[y][x]);

    if (x < grid[y].length - 1) {
        //console.log(grid[y][+x+1]);
        idx = grid[y][+x + 1].lastIndexOf(0);
        if (idx != -1 && !grid[y][+x + 1].includes(val)) {
            grid[y][+x + 1][idx] = val;
            return [y, +x + 1];
        }
    }

    if (x == grid[y].length - 1 && y < grid.length - 1) {
        idx = grid[+y + 1][+x + 1].lastIndexOf(0);
        if (idx != -1 && !grid[+y + 1][+x + 1].includes(val)) {
            grid[+y + 1][+x + 1][idx] = val;
            return [+y + 1, 0];
        }
    }

}