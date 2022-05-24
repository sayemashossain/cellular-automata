function makeGrid(cols, rows) {
    let arr = new Array(cols);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function newStatesArray(grid) {
    let lastLine = grid.at(-1);
    let newLine = [];

    for (let i = 0; i < lastLine.length; i++) {
        const newEl = lastLine.at(i - 1) ^ (lastLine.at(i) | lastLine.at(i + 1 - lastLine.length));
        // console.log(newEl);
        newLine.push(newEl)
    }
    return newLine

}

const width = 300;
const height = 300;
const res = 2;
const cols = width / res;
const rows = height / res;

let gridNow;
let gridNext;

function setup() {
    createCanvas(width, height);
    gridNow = makeGrid(cols, rows);
    // gridNext = makeGrid(cols, rows);
    frameRate(10);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            gridNow[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(255);

    for (let i = cols - 1; i >= 0; i--) {
        for (let j = rows - 1; j >= 0; j--) {
            let y = i * res;
            let x = j * res;
            noStroke();
            // stroke(0);
            gridNow[i][j] === 0 ? fill(255) : fill(0)
            rect(x, y, res, res)
        }
    }
    let newLine = newStatesArray(gridNow);
    gridNow.push(newLine);

    if (gridNow.length > rows) {
        gridNow.shift();
    }

}