const md5 = require("md5");
const salt = "abc";

let number = 0;

for (let i = 0; i < 64; i++) {
    number = getKey(number) + 1;
    console.log(number- 1);
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
    while (!md5(salt + idx).match(/(.)\1\1/)) idx++;
    let char = md5(salt + idx).match(/(.)\1\1/)[1];
    return [idx , char];
}


function isKey(char, idx) {
    const re = new RegExp("(" + char + ")\\1\\1\\1\\1");
    for (let i = 1; i <= 1000; i++) {
        if (md5(salt + (idx + i)).match(re)) {
            return true;
        }
    }
    return false;
}
