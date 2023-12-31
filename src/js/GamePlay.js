export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.goblinPositionId = 0;
    this.board = document.getElementById('game-board');
    this.board.style.display = 'grid';
    this.board.style.gridTemplateColumns = `repeat(${this.boardSize}, 105px)`;
    this.goblin = document.createElement('img');
    this.goblin.src = './src/goblin.png'
    this.goblin.classList.add('goblin')
  }

  renderBoard() {

    for (let i = 1; i <= this.boardSize ** 2; i++) {
      const cell = document.createElement("cell");
      cell.classList.add('cell');
      cell.id = i
      cell.textContent = i;
      this.board.appendChild(cell);

    }
  }

  cleanBoard() {
    this.board.innerHTML = '';
  }

  goblinPosition() {
    const oldGoblinPosition = this.goblinPositionId

    if (oldGoblinPosition !== 0) {
      const goblinPosition = document.getElementById(oldGoblinPosition)
      goblinPosition.removeChild(this.goblin);
    }
    do {
      this.goblinPositionId = Math.ceil(Math.random() * (this.boardSize ** 2))
    } while (this.goblinPositionId === oldGoblinPosition)

    this.cleanBoard()
    this.renderBoard()
    const newGoblinPosition = document.getElementById(this.goblinPositionId);
    newGoblinPosition.textContent = '';
    newGoblinPosition.appendChild(this.goblin)
  }
}
