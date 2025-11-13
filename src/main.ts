console.log('Hello, world!');

const BOARD_SIZE_X = 10;
const BOARD_SIZE_Y = 10;
const CELL_SIZE_PX = 20;
const DEBUG_OUTPUT = true;

const addElements = function() {
    // console.log('addElements');
    const elCanvas = document.createElement('canvas');
    elCanvas.setAttribute('width', String(BOARD_SIZE_X * CELL_SIZE_PX));
    elCanvas.setAttribute('height', String(BOARD_SIZE_Y * CELL_SIZE_PX));
    elCanvas.style.border = '1px solid #ccc';
    document.body.appendChild(elCanvas);

    const elGameStatus = document.createElement('p');
    elGameStatus.setAttribute('id', 'gameStatus');
    document.body.appendChild(elGameStatus);
    // updateStatField(elGameStatus, state.statToShow);

    const elDebug = document.createElement('pre');
    elDebug.setAttribute('id', 'debug');
    document.body.appendChild(elDebug);
}

const debugPrintJson = function (elDebug: HTMLElement, o: object) {
    if (DEBUG_OUTPUT) {
        elDebug.innerHTML = JSON.stringify(o, null, 2) + "<br/>";
    }
}

addElements();

const elDebug = document.getElementById('debug');

document.addEventListener('keydown', function (event) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
        return;
    }

    event.preventDefault();

    // console.log(event.key);

    debugPrintJson(elDebug, event.key);
});
