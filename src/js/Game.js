import Board from './Board';
import Goblin from './Goblin';
import ScoreView from './ScoreView';

export default class Game {
  constructor() {
    this.maxMisses = 5;
    this.hits = 0;
    this.misses = 0;
    this.currentIndex = -1;
    this.timer = null;
    this.isActive = true;

    this.board = new Board('board-container', (index) => this.onCellClick(index));
    this.goblin = new Goblin();
    this.scoreView = new ScoreView('hitCount', 'missCount');

    this.startGame();
  }

  getRandomIndex() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * 16);
    } while (newIndex === this.currentIndex);
    return newIndex;
  }

  spawnGoblin() {
    if (!this.isActive) return;
    const newIndex = this.getRandomIndex();
    this.currentIndex = newIndex;
    this.board.placeGoblin(this.currentIndex, this.goblin.getImage());
    this.startTimer();
  }

  startTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.onMiss(), 1000);
  }

  onMiss() {
    if (!this.isActive) return;
    this.misses++;
    this.scoreView.updateMisses(this.misses);
    
    if (this.misses >= this.maxMisses) {
      this.endGame();
    } else {
      this.spawnGoblin();
    }
  }

  onCellClick(index) {
    if (!this.isActive) return;
    if (index === this.currentIndex) {
      this.hits++;
      this.scoreView.updateHits(this.hits);
      
      if (this.timer) clearTimeout(this.timer);
      this.board.clearGoblin();
      this.spawnGoblin();
    }
  }

  endGame() {
    this.isActive = false;
    if (this.timer) clearTimeout(this.timer);
    this.board.clearGoblin();
    this.scoreView.showMessage('Игра окончена.', true);
  }

  startGame() {
    this.isActive = true;
    this.hits = 0;
    this.misses = 0;
    this.scoreView.updateHits(0);
    this.scoreView.updateMisses(0);
    this.scoreView.showMessage('Игра началась!', false);
    this.spawnGoblin();
  }
}