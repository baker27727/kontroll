interface SortStrategy {
    (array: number[]): void;
}

const sortStrategy: SortStrategy = array => array.sort((a, b) => a - b);

function doLogic(array: number[], strategy: SortStrategy) {
    strategy(array);
}

Array.prototype.doLogic = function (strategy: SortStrategy) {
    strategy(this);
};