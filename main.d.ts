declare const BOARD_SIZE_X = 10;
declare const BOARD_SIZE_Y = 10;
declare const CELL_SIZE_PX = 20;
declare const BORDER_SIZE_PX = 1;
declare const DEBUG_OUTPUT = true;
type State = {
    x: number;
    y: number;
    snakeSegement: SnakeSegment[];
    food: Food;
};
type Coordinate = {
    x: number;
    y: number;
};
type SnakeSegment = Coordinate;
type Food = Coordinate;
declare const addElements: () => void;
declare const debugPrintJson: (elDebug: HTMLElement, o: Object) => void;
declare const renderState: (context: any, state: State) => void;
declare const isSnakeOverlappingWithFood: (state: State) => boolean;
declare const generateNewFoodPosition: (state: State) => any;
declare const elDebug: HTMLElement;
declare const elCanvas: HTMLCanvasElement;
declare const canvasContext: CanvasRenderingContext2D;
declare let state: State;
//# sourceMappingURL=main.d.ts.map