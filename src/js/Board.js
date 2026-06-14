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
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      cell.addEventListener('click', () => this.onCellClick(i));
      board.appendChild(cell);
      this.cells.push(cell);
    }
    this.container.appendChild(board);
  }

  getCell(index) {
    return this.cells[index];
  }

  clearGoblin() {
    this.cells.forEach(cell => {
      if (cell.contains(cell.querySelector('img'))) {
        const img = cell.querySelector('img');
        if (img) img.remove();
      }
    });
  }

  placeGoblin(index, goblinImg) {
    this.clearGoblin();
    const cell = this.getCell(index);
    if (cell) cell.appendChild(goblinImg);
  }
}