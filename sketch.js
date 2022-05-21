function makeGrid(cols, rows) {
    let arr = new Array(cols);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function mouseDragged() {
    gridNow[floor(mouseX / res)][floor(mouseY / res)] = 1;
}

const width = 800;
const height = 800;
const res = 10;
const cols = width / res;
const rows = height / res;

let gridNow;
let gridNext;

function setup() {
    createCanvas(width, height);
    gridNow = makeGrid(cols, rows);
    gridNext = makeGrid(cols, rows);
    frameRate(10);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            gridNow[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(255);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * res;
            let y = j * res;
            noStroke();
            // stroke(0);
            gridNow[i][j] === 0 ? fill(255) : fill(0)
            rect(x, y, res, res)
        }
    }

    // let gridNext = makeGrid(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let neighbors = countNeighbors(gridNow, i, j);

            if (gridNow[i][j] == 0 && neighbors == 3) {
                gridNext[i][j] = 1;
            } else if (gridNow[i][j] == 1 && (neighbors < 2 || neighbors > 3)) {
                gridNext[i][j] = 0;
            } else {
                gridNext[i][j] = gridNow[i][j];
            }
        }
    }

    gridNow = JSON.parse(JSON.stringify(gridNext));
}