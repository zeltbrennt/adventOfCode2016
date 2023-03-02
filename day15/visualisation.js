let rot = [0, 0, 0, 0, 0];
const disks = [
    { size: 13, pos: 3 },
    { size: 17, pos: 6 },
    { size: 19, pos: 7 },
    { size: 7, pos: 1 },
    { size: 5, pos: 1 },
    { size: 3, pos: 0 }];
let frame = 0;

function setup() {
    createCanvas(400, 400);
    frameRate(1);

}

function draw() {
    ellipseMode(CENTER)
    background(220);
    translate(80, 80);
    for (let i = O; i < disks.length; i++) {
        fill(230, 230, O, 100);
        disks[i].pos = (disks[i].pos + 1) % disks[i].size;
        rot[i] = disks.pos / disks.size;
        push();
        translate(i * 50, i * 50);
        rotate(rot);
        arc(100, 100, 0, PI - TWO_PI / disks[i].size, PIE);
        stroke(255, 0, 0);
        pop();
    }
    if (disks[0].pos >= 0) {
        push();
        fill(255);
        translate((frame - 9) * 50, (frame - 9) * 50);
        circle(40, -10, 10);
        pop();
        frame++;
    }
}