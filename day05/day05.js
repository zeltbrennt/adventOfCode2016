import {MD5} from "https://cdn.jsdelivr.net/npm/md5-js-tools@1.0.2/lib/md5.min.js";

const input = "abc";
			
const part1 = () => {
    let number = 0;
    let hash;
    let pwd = "";
    for (let i = 0; i < 8; i++) {
        do {
            hash = MD5.generate(input + number);
            number++;
        } while (hash.substring(0, 5) !== "00000");
        console.log(number-1, hash);
        pwd += hash.charAt(5);
    }
    console.log(pwd);
}

const part2 = () => {
    let number = 0;
    let hash;
    let pwd = Array(5);
    while (pwd.includes(undefined)) {
        do {
            hash = MD5.generate(input + number);
            number++;
        } while (!(hash.substring(0, 5) === "00000" && "01234567".includes(hash.charAt(5)) && pwd[hash.charAt(5)] === undefined));
        pwd[hash.charAt(5)] = hash.charAt(6);
        console.log(number-1, hash, pwd);
    }
    console.log(pwd.reduce((a,b)=>a+b));
}

part1();
part2();