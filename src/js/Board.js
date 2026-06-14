const FIELD_SIZE = 4;
const CELLS_COUNT = FIELD_SIZE * FIELD_SIZE;

export default class Board {
  constructor(containerId, onCellClick) {
    this.container = document.getElementById(containerId);
    this.cells = [];
    this.onCellClick = onCellClick;
    this.createBoard();
  }

  createBoard() {
    const board = document.createElement('div');
    board.className = 'game-board';
    for (let i = 0; i < CELLS_COUNT; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      cell.addEventListener('click', () => this.onCellClick(i));
      board.append(cell);
      this.cells.push(cell);
    }
    this.container.append(board);
  }

  getCell(index) {
    return this.cells[index];
  }

  clearGoblin() {
    this.cells.forEach(cell => {
      const img = cell.querySelector('img');
      if (img) img.remove();
    });
  }

  placeGoblin(index, goblinImg) {
    this.clearGoblin();
    const cell = this.getCell(index);
    if (cell) cell.append(goblinImg);
  }
}