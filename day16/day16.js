const dragonCurve = (str, minChar) => {
    do {
        str = str + "0" + str.split("").map(x => x === "1" ? "0" : "1").reverse().join("");
    } while (str.length < minChar);
    return str.slice(0, minChar);
}

const checkSum = (str) => {
    do {
        let check = [];
        for (let i = 0; i < str.length; i += 2) {
            if (str[i] === str[i+1]) check.push(1);
            else check.push(0);
        }
        str = check.join("");
    } while (str.length % 2 === 0);
    return str;
}

let dragon = dragonCurve("10000", 20);
let check = checkSum(dragon);
console.log(check);

