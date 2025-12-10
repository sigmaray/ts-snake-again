const BOARD_SIZE_X = 10;
const BOARD_SIZE_Y = 10;
const CELL_SIZE_PX = 30;
const BORDER_SIZE_PX = 1;
const DEBUG_OUTPUT = false;

// -------------------------------

type State = {
    x: number,
    y: number,
    snakeSegement: SnakeSegment[],
    food: Food
};

type Coordinate = {
    x: number,
    y: number
}

type SnakeSegment = Coordinate

type Food = Coordinate

// -------------------------------


interface Array<T> {
    random(): T;
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

// -------------------------------

function isMobileUserAgent() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone/i.test(userAgent);
}

const addElements = function () {
    // // console.log('addElements');
    // const elCanvas = document.createElement('canvas');
    // elCanvas.setAttribute('width', String(BOARD_SIZE_X * CELL_SIZE_PX));
    // elCanvas.setAttribute('height', String(BOARD_SIZE_Y * CELL_SIZE_PX));

    // // elCanvas.style.width = String(BOARD_SIZE_X * CELL_SIZE_PX) + 'px';
    // // elCanvas.style.height = String(BOARD_SIZE_Y * CELL_SIZE_PX) + 'px';

    // elCanvas.style.border = '1px solid #ccc';
    // // elCanvas.style.margin = '0 auto';
    // document.body.appendChild(elCanvas);

    // // const elGameStatus = document.createElement('p');
    // // elGameStatus.setAttribute('id', 'gameStatus');
    // // document.body.appendChild(elGameStatus);

    if (isMobileUserAgent()) {
        document.head.innerHTML += `
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        `;
    }

    document.head.innerHTML += `        
        <style>
        /* p, pre {
            max-width: 100vw;
            overflow: hidden;
        } */

        button {
            width: 5rem;
            height: 5rem;
        }

        table {
            margin-top: 5rem;
            width: 100%;
        }
        </style>
    `;

    // alert('l50');
    document.body.innerHTML += `
        <center>
            <canvas
                style="border: 1px solid #ccc"
                width="${String(BOARD_SIZE_X * CELL_SIZE_PX)}"
                height="${String(BOARD_SIZE_Y * CELL_SIZE_PX)}"
            ></canvas>
        </center>
        <p id="gameStatus"></p>        
    `;

    if (isMobileUserAgent()) {
        document.body.innerHTML += `
        <table border="1">
            <tr>
                <td></td>
                <td width="1"></td>
                <td width="1"><button id="buttonUp">↑</button></td>
                <td width="1"></td>
                <td></td>                
            </tr>
            <tr>
                <td></td>
                <td width="1"><button id="buttonLeft">←</button></td>
                <td width="1"></td>
                <td width="1"><button id="buttonRight">→</button></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td width="1"></td>                
                <td width="1"><button id="buttonDown">↓</button></td>
                <td width="1"></td>
                <td></td>
            </tr>
        </table>
        `;     
    }

    // alert('l70');


    const elDebug = document.createElement('pre');
    elDebug.setAttribute('id', 'debug');
    document.body.appendChild(elDebug);
}

const debugPrintJson = function (elDebug: HTMLElement, o: Object) {
    if (DEBUG_OUTPUT) {
        elDebug.innerHTML = JSON.stringify(o, null, 2) + "<br/>";
    }
}

const renderState = function (context: any, state: State) {
    context.clearRect(0, 0, CELL_SIZE_PX * BOARD_SIZE_X, CELL_SIZE_PX * BOARD_SIZE_Y);

    let head = state.snakeSegement[0] as SnakeSegment;

    context.fillStyle = '#E8E8E8';
    context.fillRect(head.x * CELL_SIZE_PX + BORDER_SIZE_PX, head.y * CELL_SIZE_PX + BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX);

    context.fillStyle = 'red';
    context.fillRect(state.food.x * CELL_SIZE_PX + BORDER_SIZE_PX, state.food.y * CELL_SIZE_PX + BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX);
}

const isSnakeOverlappingWithFood = function (state: State): boolean {
    let head = state.snakeSegement[0] as SnakeSegment;
    let food = state.food;
    return head.x == food.x && head.y == food.y;
}

const generateNewFoodPosition = function (state: State) {
    const applyStateToMatrix = function (state: State) {
        const matrix = Array.from({ length: BOARD_SIZE_Y }, () => (
            Array.from({ length: BOARD_SIZE_X }, () => '')
        ));

        let head = state.snakeSegement[0] as SnakeSegment;
        let food = state.food;

        matrix[head.y]![head.x] = 'h';

        matrix[food.y]![food.x] = 'f';

        // console.log({matrix});

        return matrix;
    }

    const findEmptyCells = function (state: any) {
        const emptyCells: Array<Coordinate> = [];
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
    }
    const randomCell = findEmptyCells(state).random();
    return randomCell;
}

// --------------------------------------

addElements();

const elDebug = document.getElementById('debug') as HTMLElement;
const elCanvas = document.getElementsByTagName('canvas')[0] as HTMLCanvasElement;
const canvasContext = elCanvas.getContext('2d') as CanvasRenderingContext2D;

const elButtonLeft = document.getElementById('buttonLeft') as HTMLButtonElement;
const elButtonRight = document.getElementById('buttonRight') as HTMLButtonElement;
const elButtonUp = document.getElementById('buttonUp') as HTMLButtonElement;
const elButtonDown = document.getElementById('buttonDown') as HTMLButtonElement;

let state: State = {
    x: 0,
    y: 0,
    snakeSegement: [{ x: 0, y: 0 }],
    food: { x: 1, y: 1 }
}

generateNewFoodPosition(state);

debugPrintJson(elDebug, state);
renderState(canvasContext, state);

const handleEvent = function(direction: string) {
    let head = state.snakeSegement[0] as SnakeSegment;

    if (direction == 'ArrowLeft') {
        if (head.x > 0) {
            head.x--;
        } else {
            head.x = BOARD_SIZE_X - 1;
        }
    } else if (direction == 'ArrowRight') {
        if (head.x < BOARD_SIZE_X - 1) {
            head.x++;
        } else {
            head.x = 0;
        }
    } else if (direction == 'ArrowUp') {
        if (head.y > 0) {
            head.y--;
        } else {
            head.y = BOARD_SIZE_X - 1;
        }
    } else if (direction == 'ArrowDown') {
        if (head.y < BOARD_SIZE_X - 1) {
            head.y++;
        } else {
            head.y = 0;
        }
    }

    if (isSnakeOverlappingWithFood(state)) {
        state.food = generateNewFoodPosition(state);
    }

    debugPrintJson(elDebug, state);

    renderState(canvasContext, state);
}

document.addEventListener('keydown', function (event) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
        return;
    }

    event.preventDefault();

    handleEvent(event.key);    
});

if (isMobileUserAgent()) {
    elButtonLeft.addEventListener("click", function() { handleEvent('ArrowLeft') });
    elButtonRight.addEventListener("click", function() { handleEvent('ArrowRight') });
    elButtonUp.addEventListener("click", function() { handleEvent('ArrowUp') });
    elButtonDown.addEventListener("click", function() { handleEvent('ArrowDown') });
}
