const md5 = require("md5");
const salt = "abc";

let number = 0;
const hashes = [];

for (let i = 0; i < 25000; i++) {
    hashes.push(stretch(salt + i, 0));
    if (i % 1000 == 0) console.log(i / 25000);
}
console.log("done precomputing");

for (let i = 0; i < 64; i++) {
    number = getKey(number) + 1;
    console.log(i, number - 1);
}

function getKey(idx) {
    let i = idx; char = '';
    do {
        [i, char] = findCandidate(idx);
        idx = i + 1;
    } while (!isKey(char, i));
    return i;
}

function findCandidate(idx) {
    while (!hashes[idx].match(/(.)\1{2}/)) idx++;
    let char = hashes[idx].match(/(.)\1{2}/)[1];
    return [idx, char];
}


function isKey(char, idx) {
    const re = new RegExp("(" + char + ")\\1{4}");
    for (let i = 1; i <= 1000; i++) {
        if (hashes[idx + i].match(re)) {
            return true;
        }
    }
    return false;
}

function stretch(str, times) {
    let hash = md5(str);
    for (let i = 0; i < times; i++) {
        hash = md5(hash);
    }
    return hash;
}