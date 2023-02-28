const disks = [{ "start": 4, "size": 5 }, { "start": 1, "size": 2 }];

function evaluate(x) {
    for (let i = 0; i < disks.length; i++) {
        if ((disks[i].start + i + 1 + x) % disks[i].size != 0) return false;
    }
    return true;
}

for (let seconds = 0; true; seconds++) {
    if (evaluate(seconds)) {
        console.log(seconds);
        break;
    }
}