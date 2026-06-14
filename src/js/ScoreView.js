export default class ScoreView {
  constructor(hitElementId, missElementId) {
    this.hitElement = document.getElementById(hitElementId);
    this.missElement = document.getElementById(missElementId);
  }

  updateHits(hits) {
    this.hitElement.textContent = hits;
  }

  updateMisses(misses) {
    this.missElement.textContent = misses;
  }

  showMessage(text, isError = true) {
    const msgDiv = document.getElementById('message');
    msgDiv.textContent = text;
    msgDiv.style.color = isError ? 'red' : 'green';
    setTimeout(() => {
      if (msgDiv.textContent === text) msgDiv.textContent = '';
    }, 3000);
  }
}