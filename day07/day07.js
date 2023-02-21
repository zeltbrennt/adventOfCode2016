const puzzle = document.querySelector("pre").innerHTML.split("\n");

const getAllMatches = (re, str) => {
    let match;
    const result = [];
    while (match = re.exec(str)) {
        result.push(match[0]);
        re.lastIndex = match.index + 1;
    }
    return result;
}

const correspondingMatch = (outer, inner) => {
    for (m of outer) {
        for (i of inner) {
            if (m[0] === i[1] && m[1] === i[0]) return true;
        }
    }
    return false;
}

let part1 = 0;
let part2 = 0;
for (example of puzzle) {
    const ip = example.replaceAll(/\[\w+\]/g, "#");
    const hyper = example.replaceAll(/(^|\]).+?(\[|$)/g, "#");
    if (ip.match(/(.)(?!\1)(.)\2\1/) && !hyper.match(/(.)(?!\1)(.)\2\1/)) part1++;
    const outerMatch = getAllMatches(/(.)(?!\1).\1/g, ip);
    const innerMatch = getAllMatches(/(.)(?!\1).\1/g, hyper);
    if (correspondingMatch(outerMatch, innerMatch)) part2++;
}
console.log("part 1: " + part1);
console.log("part 2: " + part2);
