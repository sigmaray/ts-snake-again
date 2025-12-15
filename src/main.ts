const BOARD_SIZE_X = 3;
const BOARD_SIZE_Y = BOARD_SIZE_X;
const CELL_SIZE_PX = 40;
const BORDER_SIZE_PX = 1;
const DEBUG_OUTPUT = false;

// -------------------------------

type State = {
    x: number,
    y: number,
    snakeSegements: SnakeSegment[],
    food: Food,
    isGameOver: boolean
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
    const userAgent = navigator.userAgent || navigator.vendor;
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

    // document.head.innerHTML += `
    //     <style>
    //     /* p, pre {
    //         max-width: 100vw;
    //         overflow: hidden;
    //     } */

    //     button {
    //         width: 5rem;
    //         height: 5rem;
    //     }

    //     table {
    //         margin-top: 5rem;
    //         width: 100%;
    //     }
    //     </style>
    // `;

    document.head.innerHTML += `        
        <style>
            /* Сброс стилей для кроссбраузерности */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            /* Основные стили для body */
            body {
                /* min-height: 100vh; */
                min-height: 90vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                font-family: system-ui, -apple-system, sans-serif;
                padding: 20px;
                background-color: #f5f5f5;
            }

            /* Контейнер для верхней части */
            .top-section {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                /* padding-top: 20px; */
            }

            /* Стили для canvas */
            .game-canvas {
                border: 1px solid #ccc;
                border-radius: 8px;                
                background-color: white;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            /* Стили для статуса игры */
            #gameStatus {
                font-size: 1.2rem;
                font-weight: 500;
                color: #333;
                text-align: center;
                min-height: 1.5em;
            }

            /* Контейнер для кнопок управления */
            .controls {
                display: grid;
                grid-template-areas:
                    ". up ."
                    "left center right"
                    ". down .";
                /* gap: 10px; */
                gap: 20px;
                /* padding: 20px; */
                /* background-color: white;
                border-radius: 12px; 
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
                /* margin-bottom: 20px; */
            }

            /* Стили для кнопок */
            .control-button {
                /* width: 70px;
                height: 70px; */
                width: 80px;
                height: 80px;
                border: none;
                border-radius: 50%;
                background-color: #4f46e5;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                user-select: none;
            }

            .control-button:hover {
                background-color: #4338ca;
                transform: scale(1.05);
            }

            .control-button:active {
                transform: scale(0.95);
            }

            /* Размещение кнопок по grid-areas */
            #buttonUp { grid-area: up; }
            #buttonLeft { grid-area: left; }
            #buttonRight { grid-area: right; }
            #buttonDown { grid-area: down; }
            /* #buttonRestart { grid-area: center; } */

            /* Адаптивность для мобильных устройств */
            @media (max-width: 480px) {
                .control-button {
                    /*
                    width: 60px;
                    height: 60px;
                    */ 
                    width: 70px;
                    height: 70px;
                    font-size: 1.3rem;
                }
                
                .controls {
                    gap: 8px;
                    gap: 20px;
                    /* padding: 15px; */
                }
                
                body {
                    /* padding: 10px; */
                }
            }

            /* Для очень маленьких экранов */
            @media (max-width: 320px) {
                .control-button {
                    width: 50px;
                    height: 50px;
                    font-size: 1.1rem;
                }
                
                .game-canvas {
                    width: 200px;
                    height: 200px;
                }
            }

            /* Улучшение доступности */
            .control-button:focus-visible {
                outline: 3px solid #3b82f6;
                outline-offset: 2px;
            }

            /* Плавные переходы для всего интерфейса */
            .top-section, .controls {
                transition: all 0.3s ease;
            }
        </style>
    `;

    /*
    document.body.innerHTML += `
        <center>
            <canvas
                style="border: 1px solid #ccc"
                width="${String(BOARD_SIZE_X * CELL_SIZE_PX)}"
                height="${String(BOARD_SIZE_Y * CELL_SIZE_PX)}"
            ></canvas>
            <p id="gameStatus"></p>        
        </center>        
    `;
    */

    document.body.innerHTML += `        
         <!-- Верхняя часть с canvas и статусом -->
        <section class="top-section" aria-label="Игровое поле">
            <button
                id="buttonRestart"
                class="control-button center-button"
                aria-label="Перезапуск"
            >⟳</button>

            <canvas
                class="game-canvas" 
                width="${String(BOARD_SIZE_X * CELL_SIZE_PX)}"
                height="${String(BOARD_SIZE_Y * CELL_SIZE_PX)}"
            ></canvas>
            <p id="gameStatus" role="status" aria-live="polite">
                <!-- Статус игры будет обновляться JavaScript -->
            </p>
        </section>
    `;

    if (true) {// if (isMobileUserAgent()) {
        /*
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
              */

        document.body.innerHTML += `
        <!-- Нижняя часть с кнопками управления -->
        <section class="controls" aria-label="Управление">
            <button 
                id="buttonUp" 
                class="control-button"
                aria-label="Движение вверх"
            >↑</button>
            
            <button 
                id="buttonLeft" 
                class="control-button"
                aria-label="Движение влево"
            >←</button>

            <!--
            <button
                id="buttonRestart"
                class="control-button center-button"
                aria-label="Перезапуск"
            >⟳</button>
            -->
            
            <button 
                id="buttonDown" 
                class="control-button"
                aria-label="Движение вниз"
            >↓</button>
            
            <button 
                id="buttonRight" 
                class="control-button"
                aria-label="Движение вправо"
            >→</button>
        </section>
        `;
    }

    if (DEBUG_OUTPUT) {
        const elDebug = document.createElement('pre');
        elDebug.setAttribute('id', 'debug');
        document.body.appendChild(elDebug);
    }
}

const debugPrintJson = function (elDebug: HTMLElement, o: Object) {
    if (DEBUG_OUTPUT) {
        elDebug.innerHTML = JSON.stringify(o, null, 2) + "<br/>";
    }
}

const renderState = function (context: any, state: State) {
    context.clearRect(0, 0, CELL_SIZE_PX * BOARD_SIZE_X, CELL_SIZE_PX * BOARD_SIZE_Y);

    Array.from(Array(BOARD_SIZE_Y)).forEach((_item, y) => {
        Array.from(Array(BOARD_SIZE_X)).forEach((_item, x) => {
            // console.log({x,y})
            // alert('353')
            context.fillStyle = '#E8E8E8';
            context.fillRect(x * CELL_SIZE_PX + BORDER_SIZE_PX, y * CELL_SIZE_PX + BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX);
        });
    });

    // let head = state.snakeSegements[0] as SnakeSegment;

    state.snakeSegements.forEach(function (head, i) {
        context.fillStyle = '#AFE1AF';
        context.fillRect(head.x * CELL_SIZE_PX + BORDER_SIZE_PX, head.y * CELL_SIZE_PX + BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX);
    });

    context.fillStyle = 'red';
    context.fillRect(state.food.x * CELL_SIZE_PX + BORDER_SIZE_PX, state.food.y * CELL_SIZE_PX + BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX);

    const head = state.snakeSegements[0]!;
    context.fillStyle = 'green';
    context.fillRect(head.x * CELL_SIZE_PX + BORDER_SIZE_PX, head.y * CELL_SIZE_PX + BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX, CELL_SIZE_PX - BORDER_SIZE_PX);

    if (state.isGameOver) {
        elGameStatus.innerText = 'game is over'
    } else {
        elGameStatus.innerText = '';
    }
    
}

const isSnakeOverlappingWithFood = function (state: State): boolean {
    let head = state.snakeSegements[0] as SnakeSegment;
    let food = state.food;
    return head.x == food.x && head.y == food.y;
}

const applyStateToMatrix = function (state: State) {
    const matrix = Array.from({ length: BOARD_SIZE_Y }, () => (
        Array.from({ length: BOARD_SIZE_X }, () => '')
    ));

    let head = state.snakeSegements[0] as SnakeSegment;
    let food = state.food;

    // matrix[head.y]![head.x] = 'h';

    matrix[food.y]![food.x] = 'f';

    state.snakeSegements.forEach(function (head, i) {
        matrix[head.y]![head.x] = 's';
    });

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

const canGenerateFood = function (state: State) {
    const emptyCells = findEmptyCells(state);
    return emptyCells.length > 0;
}

const generateNewFoodPosition = function (state: State) {
    const randomCell = findEmptyCells(state).random();
    return randomCell;
}

const deepCopy = function (obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

// --------------------------------------

addElements();

const elDebug = document.getElementById('debug') as HTMLElement;
const elGameStatus = document.getElementById('gameStatus') as HTMLElement;
const elCanvas = document.getElementsByTagName('canvas')[0] as HTMLCanvasElement;
const canvasContext = elCanvas.getContext('2d') as CanvasRenderingContext2D;

const elButtonLeft = document.getElementById('buttonLeft') as HTMLButtonElement;
const elButtonRight = document.getElementById('buttonRight') as HTMLButtonElement;
const elButtonUp = document.getElementById('buttonUp') as HTMLButtonElement;
const elButtonDown = document.getElementById('buttonDown') as HTMLButtonElement;
const elButtonRestart = document.getElementById('buttonRestart') as HTMLButtonElement;

let defaultState: State = {
    x: 0,
    y: 0,
    snakeSegements: [{ x: 0, y: 0 }],
    food: { x: 1, y: 1 },
    isGameOver: false
}

let state: State = deepCopy(defaultState);

/**
 * Загружает состояние из localStorage или возвращает fallback при отсутствии/ошибке.
 * @param {string} key - ключ в localStorage, например "state"
 * @param {any} fallback - альтернативные данные, возвращаемые при ошибке
 * @returns {any} - распарсенный объект или fallback
 */
function loadStateFromLocalStorage(key = 'state', fallback = {}) {
    const raw = localStorage.getItem(key);
    if (raw === null) {
        // Ключ отсутствует
        return fallback;
    }

    try {
        const parsed = JSON.parse(raw);
        return parsed;
    } catch (err) {
        // Ошибка парсинга — можно логировать и вернуть fallback
        console.warn(`Failed to parse localStorage["${key}"]`, err);
        return fallback;
    }
}

function putToLocalStorate(state: State, key = 'state') {
    localStorage.setItem(key,
        JSON.stringify(state)
    )
}

// Пример использования
const loaded = loadStateFromLocalStorage();

console.log('-----');

// console.log({state, loaded});
// state = {
//     ...state,
//     ...loaded
// }
// console.log({loaded});

Object.keys(loaded as Array<keyof State>).forEach(function(key) {
    // if (Object.keys(state).includes(key)) {
    //     state[key] = loaded[key] as State[key];
    // }
    if (key in state) {
        (state as any)[key] = loaded[key];
    }
});

console.log({state});

console.log('-----');

// generateNewFoodPosition(state);

debugPrintJson(elDebug, state);
renderState(canvasContext, state);

const handleEvent = function (direction: string) {
    if (['R', 'r', 'К','к'].includes(direction)) {
        state = deepCopy(defaultState);
        renderState(canvasContext, state);
        return;
    }

    if (state.isGameOver) return;

    let head = deepCopy(state.snakeSegements[0]) as SnakeSegment;

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

    state.snakeSegements.unshift(head);

    if (isSnakeOverlappingWithFood(state)) {
        if (!canGenerateFood(state)) {
            state.isGameOver = true;
            renderState(canvasContext, state);            
            putToLocalStorate(state);
            return;
        }

        state.food = generateNewFoodPosition(state);
    } else {
        state.snakeSegements.pop();
    }

    debugPrintJson(elDebug, state);

    putToLocalStorate(state);

    renderState(canvasContext, state);
}

document.addEventListener('keydown', function (event) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'R', 'r', 'К', 'к'].includes(event.key)) {
        return;
    }

    event.preventDefault();

    handleEvent(event.key);
});

// if (isMobileUserAgent()) {
    elButtonLeft.addEventListener("click", function () { handleEvent('ArrowLeft') });
    elButtonRight.addEventListener("click", function () { handleEvent('ArrowRight') });
    elButtonUp.addEventListener("click", function () { handleEvent('ArrowUp') });
    elButtonDown.addEventListener("click", function () { handleEvent('ArrowDown') });    
    elButtonRestart.addEventListener("click", function () { handleEvent('R') });    
// }
