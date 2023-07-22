//main.js
let canvas = document.getElementById('board');
let ctx = canvas.getContext('2d');

// Calculate size of canvas from constants.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// Key Event
let key = ['ArrowUp', 'ArrowUp'];
document.addEventListener('keydown', (event) => {
    if (
        key[0] === 'ArrowUp' 
        && key[1] === 'ArrowUp' 
        && event.code === 'ArrowDown'
    ) {
        event.preventDefault();
    }

    if (
        key[0] === 'ArrowUp' 
        && key[1] === 'ArrowDown' 
        && event.code === 'ArrowDown'
    ) {
        event.preventDefault();
    }

    if (
        key[0] === 'ArrowDown' 
        && key[1] === 'ArrowDown' 
        && event.code === 'ArrowDown'
    ) {
        event.preventDefault();
    }

    if (event.code == "ArrowUp" || event.code == "ArrowDown") key[1] = event.code;

    if (event.code === "ArrowLeft") turnLeft();
    else if (event.code === "ArrowRight") turnRight();
    else if (event.code === "ArrowUp") turnUp();
    else if (event.code === "ArrowDown") turnDown();

    key[0] = key[1];
}, false);

// Main function
let board = new Board(ctx);

function play() {
    console.table(board.grid);
}

let matrix = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]

function randomBlock() {
    let list = [];

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            if (matrix[i][j] == 0) list.push(i * 6 + j);
        }
    }

    let x = Math.floor(Math.random() * list.length);
    matrix[Math.floor(list[x] / 6)][list[x] % 6] = 2;
}

function start() {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            if (matrix[i][j] != 0) ctx.clearRect(j, i, 1, 1);
        }
    }

    matrix = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ]

    randomBlock();
    randomBlock();

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            let target = document.getElementsByClassName("play-block")[6 * i + j];
            if (matrix[i][j] != 0) { target.innerHTML = matrix[i][j]; ctx.fillStyle = "#c8cbbf"; ctx.fillRect(j, i, 1, 1); }
            else target.innerHTML = '';
        }
    }
}

function refresh() {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            let target = document.getElementsByClassName("play-block")[6 * i + j];
            if (matrix[i][j] != 0) { target.innerHTML = matrix[i][j]; ctx.fillStyle = "#c8cbbf"; ctx.fillRect(j, i, 1, 1); }
            else target.innerHTML = '';
        }
    }
}

let timeOut;

function check() {
    for (var i = 0; i < matrix.length - 1; i++) {
        for (var j = 0; j < matrix.length - 1; j++) {
            if (matrix[i][j] == 2048) {
                setTimeout(() => {location.reload(); alert("You win !!!")}, 1000);
            }
        }
    }

    let gameOver = true;
    let fullTable = true;

    firstloop1: for (var i = 0; i < matrix.length - 1; i++) {
        for (var j = 0; j < matrix.length - 1; j++) {
            if (matrix[i][j] == 0) {
                fullTable = false;
                break firstloop1;
            }
        }
    }

    firstloop2: for (var i = 0; i < matrix.length - 1; i++) {
        for (var j = 0; j < matrix.length - 1; j++) {
            if (matrix[i][j] == matrix[i][j + 1] || matrix[i][j] == matrix[i + 1][j]) {
                gameOver = false;
                break firstloop2;
            }
        }
        if (matrix[i][matrix.length - 1] == matrix[i + 1][matrix.length - 1]) {
            gameOver = false;
            break firstloop2;
        }
    }

    if (gameOver && fullTable) {
        setTimeout(() => {location.reload(); alert("You lose !!!");}, 1000);
    }
}

function turnLeft() {
    let move = 0;

    for (var i = 0; i < matrix.length; i++) {
        for (var j = matrix.length - 1; j > 0; j--) {
            if (matrix[i][j - 1] == 0 && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i][j - 1] = matrix[i][j];
                matrix[i][j] = 0;
                move++;
            } else if (matrix[i][j - 1] == matrix[i][j] && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i][j - 1] *= 2;
                matrix[i][j] = 0;
                move++;
            }
        }
    }

    for (var i = 0; i < matrix.length; i++) {
        for (var j = matrix.length - 1; j > 0; j--) {
            if (matrix[i][j - 1] == 0 && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i][j - 1] = matrix[i][j];
                matrix[i][j] = 0;
                move++;
            } else if (matrix[i][j - 1] == matrix[i][j] && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i][j - 1] *= 2;
                matrix[i][j] = 0;
                move++;
            }
        }
    }

    if (move != 0) randomBlock();
    refresh();
    check();
}

function turnUp() {
    let move = 0;

    for (var i = matrix.length - 1; i > 0; i--) {
        for (var j = 0; j < matrix.length; j++) {
            if (matrix[i - 1][j] == 0 && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i - 1][j] = matrix[i][j];
                matrix[i][j] = 0;
                move++;
            } else if (matrix[i - 1][j] == matrix[i][j] && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i - 1][j] *= 2;
                matrix[i][j] = 0;
                move++;
            }
        }
    }

    for (var i = matrix.length - 1; i > 0; i--) {
        for (var j = 0; j < matrix.length; j++) {
            if (matrix[i - 1][j] == 0 && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i - 1][j] = matrix[i][j];
                matrix[i][j] = 0;
                move++;
            } else if (matrix[i - 1][j] == matrix[i][j] && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i - 1][j] *= 2;
                matrix[i][j] = 0;
                move++;
            }
        }
    }

    if (move != 0) randomBlock();
    refresh();
    check();
}

function turnDown() {
    let move = 0;

    for (var i = 0; i < matrix.length - 1; i++) {
        for (var j = 0; j < matrix.length; j++) {
            if (matrix[i + 1][j] == 0 && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i + 1][j] = matrix[i][j];
                matrix[i][j] = 0;
                move++;
            } else if (matrix[i + 1][j] == matrix[i][j] && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i + 1][j] *= 2;
                matrix[i][j] = 0;
                move++;
            }
        }
    }

    for (var i = 0; i < matrix.length - 1; i++) {
        for (var j = 0; j < matrix.length; j++) {
            if (matrix[i + 1][j] == 0 && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i + 1][j] = matrix[i][j];
                matrix[i][j] = 0;
                move++;
            } else if (matrix[i + 1][j] == matrix[i][j] && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i + 1][j] *= 2;
                matrix[i][j] = 0;
                move++;
            }
        }
    }

    if (move != 0) randomBlock();
    refresh();
    check();
}

function turnRight() {
    let move = 0;

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length - 1; j++) {
            if (matrix[i][j + 1] == 0 && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i][j + 1] = matrix[i][j];
                matrix[i][j] = 0;
                move++;
            } else if (matrix[i][j + 1] == matrix[i][j] && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i][j + 1] *= 2;
                matrix[i][j] = 0;
                move++;
            }
        }
    }

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length - 1; j++) {
            if (matrix[i][j + 1] == 0 && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i][j + 1] = matrix[i][j];
                matrix[i][j] = 0;
                move++;
            } else if (matrix[i][j + 1] == matrix[i][j] && matrix[i][j] != 0) {
                ctx.clearRect(j, i, 1, 1);
                matrix[i][j + 1] *= 2;
                matrix[i][j] = 0;
                move++;
            }
        }
    }

    if (move != 0) randomBlock();
    refresh();
    check();
}