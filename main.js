"use strict";
const BOARD_SIZE_X = 10;
const BOARD_SIZE_Y = 10;
const CELL_SIZE_PX = 20;
const BORDER_SIZE_PX = 1;
const DEBUG_OUTPUT = true;
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
};
// -------------------------------
const addElements = function () {
    // console.log('addElements');
    const elCanvas = document.createElement('canvas');
    elCanvas.setAttribute('width', String(BOARD_SIZE_X * CELL_SIZE_PX));
    elCanvas.setAttribute('height', String(BOARD_SIZE_Y * CELL_SIZE_PX));
    elCanvas.style.border = '1px solid #ccc';
    document.body.appendChild(elCanvas);
    const elGameStatus = document.createElement('p');
    elGameStatus.setAttribute('id', 'gameStatus');
    document.body.appendChild(elGameStatus);
    const elDebug = document.createElement('pre');
    elDebug.setAttribute('id', 'debug');
    document.body.appendChild(elDebug);
};
const debugPrintJson = function (elDebug, o) {
    if (DEBUG_OUTPUT) {
        elDebug.innerHTML = JSON.stringify(o, null, 2) + "<br/>";
    }
};
const renderState = function (context, state) {
    context.clearRect(0, 0, CELL_SIZE_PX * BOARD_SIZE_X, CELL_SIZE_PX * BOARD_SIZE_Y);
    let head = state.snakeSegement[0];
    context.fillStyle = '#E8E8E8';
    context.fillRect(head.x * CELL_SIZE_PX + BORDER_SIZE_PX, head.y * CELL_SIZE_PX + BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX);
    context.fillStyle = 'red';
    context.fillRect(state.food.x * CELL_SIZE_PX + BORDER_SIZE_PX, state.food.y * CELL_SIZE_PX + BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX);
};
const isSnakeOverlappingWithFood = function (state) {
    let head = state.snakeSegement[0];
    let food = state.food;
    return head.x == food.x && head.y == food.y;
};
const generateNewFoodPosition = function (state) {
    const applyStateToMatrix = function (state) {
        const matrix = Array.from({ length: BOARD_SIZE_Y }, () => (Array.from({ length: BOARD_SIZE_X }, () => '')));
        let head = state.snakeSegement[0];
        let food = state.food;
        matrix[head.y][head.x] = 'h';
        matrix[food.y][food.x] = 'f';
        // console.log({matrix});
        return matrix;
    };
    const findEmptyCells = function (state) {
        const emptyCells = [];
        const applied = applyStateToMatrix(state);
        applied.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (!cell) {
                    emptyCells.push({
                        x,
                        y
                    });
                }
            });
        });
        return emptyCells;
    };
    const randomCell = findEmptyCells(state).random();
    return randomCell;
};
// --------------------------------------
addElements();
const elDebug = document.getElementById('debug');
const elCanvas = document.getElementsByTagName('canvas')[0];
const canvasContext = elCanvas.getContext('2d');
let state = {
    x: 0,
    y: 0,
    snakeSegement: [{ x: 0, y: 0 }],
    food: { x: 1, y: 1 }
};
generateNewFoodPosition(state);
debugPrintJson(elDebug, state);
renderState(canvasContext, state);
document.addEventListener('keydown', function (event) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
        return;
    }
    event.preventDefault();
    let head = state.snakeSegement[0];
    if (event.key == 'ArrowLeft') {
        if (head.x > 0) {
            head.x--;
        }
        else {
            head.x = BOARD_SIZE_X - 1;
        }
    }
    else if (event.key == 'ArrowRight') {
        if (head.x < BOARD_SIZE_X - 1) {
            head.x++;
        }
        else {
            head.x = 0;
        }
    }
    else if (event.key == 'ArrowUp') {
        if (head.y > 0) {
            head.y--;
        }
        else {
            head.y = BOARD_SIZE_X - 1;
        }
    }
    else if (event.key == 'ArrowDown') {
        if (head.y < BOARD_SIZE_X - 1) {
            head.y++;
        }
        else {
            head.y = 0;
        }
    }
    if (isSnakeOverlappingWithFood(state)) {
        state.food = generateNewFoodPosition(state);
    }
    debugPrintJson(elDebug, state);
    renderState(canvasContext, state);
});
//# sourceMappingURL=main.js.map