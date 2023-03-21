const puzzle = [
    "swap position 4 with position 0",
    "swap letter d with letter b",
    "reverse positions 0 through 4",
    "rotate left 1 step",
    "move position 1 to position 4",
    "move position 3 to position 0",
    "rotate based on position of letter b",
    "rotate based on position of letter d"
];
const password = "abcde".split("");

Array.prototype.swapPosition = function(x, y) {
    [this[y], this[x]] = [this[x], this[y]];
}

Array.prototype.swapLetter = function(x, y) {
    this.swapPosition(this.indexOf(x), this.indexOf(y));
}

Array.prototype.rotate = function(dir, offset) {
    for (let i = 0; i < offset; i++) {
        if (dir === "left") this.push(this.shift());
        else this.unshift(this.pop());
    }
}

Array.prototype.rotatePosition = function(x) {
    x = this.indexOf(x);
    x = x >= 4 ? x + 1 : x;
    for (let i = 0; i <= x; i++) {
        this.unshift(this.pop());
    }
}

Array.prototype.reversePosition = function(x, y) {
    while (x < y) {
        this.swapPosition(x, y);
        x++;
        y--;
    }
}

Array.prototype.move = function(x, y) {
    let temp = this[x];
    this.splice(x, 1);
    this.splice(y, 0, temp);
}

for (let line of puzzle) {
    if (line.match("swap position")) {
        let index = line.match(/\d/g)
        password.swapPosition(index[0], index[1]);
    }
    else if (line.match("swap letter")) {
        let index = line.match(/(?<=\s)\D(?=\s|$)/g)
        password.swapLetter(index[0], index[1]);
    }
    else if (line.match(/rotate left|right/)) {
        password.rotate(line.match(/(?<=rotate\s)\w+/)[0], line.match(/\d/)[0])
    }
    else if (line.match("rotate based")) {
        password.rotatePosition(line.match(/\D(?=$)/)[0]);
    }
    else if (line.match("reverse")) {
        let index = line.match(/\d/g)
        password.reversePosition(index[0], index[1]);
    }
    else if (line.match("move")) {
        let index = line.match(/\d/g)
        password.move(index[0], index[1]);
    }
    console.log(password);
}