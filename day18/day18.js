let row = ".^^.^.^^^^";
console.log(row);
let safe = row.replaceAll(/\^/g, "").length;
row = "." + row + ".";
const rules = ["..^", ".^^", "^..", "^^."];

for (let r = 1; r < 10; r++) {
    let next = ["."];
    for (let i = 1; i < row.length - 1; i++) {
        if (rules.includes(row.slice(i - 1, i + 2))) next.push("^");
        else {
            next.push(".");
            safe++;
        }
    }
    next.push(".");
    row = next.join("");
    console.log(row.slice(1, -1));
}
console.log(safe);