declare const BOARD_SIZE_X = 7;
declare const BOARD_SIZE_Y = 7;
declare const CELL_SIZE_PX = 50;
declare const BORDER_SIZE_PX = 1;
declare const DEBUG_OUTPUT = false;
type State = {
    x: number;
    y: number;
    snakeSegements: SnakeSegment[];
    food: Food;
    isGameOver: boolean;
};
type Coordinate = {
    x: number;
    y: number;
};
type SnakeSegment = Coordinate;
type Food = Coordinate;
interface Array<T> {
    random(): T;
}
declare function isMobileUserAgent(): boolean;
declare const addElements: () => void;
declare const debugPrintJson: (elDebug: HTMLElement, o: Object) => void;
declare const renderState: (context: any, state: State) => void;
declare const isSnakeOverlappingWithFood: (state: State) => boolean;
declare const applyStateToMatrix: (state: State) => string[][];
declare const findEmptyCells: (state: any) => Coordinate[];
declare const canGenerateFood: (state: State) => boolean;
declare const generateNewFoodPosition: (state: State) => Coordinate;
declare const deepCopy: (obj: any) => any;
declare const elDebug: HTMLElement;
declare const elGameStatus: HTMLElement;
declare const elCanvas: HTMLCanvasElement;
declare const canvasContext: CanvasRenderingContext2D;
declare const elButtonLeft: HTMLButtonElement;
declare const elButtonRight: HTMLButtonElement;
declare const elButtonUp: HTMLButtonElement;
declare const elButtonDown: HTMLButtonElement;
declare const elButtonRestart: HTMLButtonElement;
declare let defaultState: State;
declare let state: State;
/**
 * Загружает состояние из localStorage или возвращает fallback при отсутствии/ошибке.
 * @param {string} key - ключ в localStorage, например "state"
 * @param {any} fallback - альтернативные данные, возвращаемые при ошибке
 * @returns {any} - распарсенный объект или fallback
 */
declare function loadStateFromLocalStorage(key?: string, fallback?: {}): any;
declare function putToLocalStorate(state: State, key?: string): void;
declare const loaded: any;
declare const handleEvent: (direction: string) => void;
//# sourceMappingURL=main.d.ts.map