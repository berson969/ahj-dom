export default class GamePlay {
    constructor() {
        this.boardSize = 5 ** 2;
        this.goblinPositionId = 0;
        this.board = document.getElementById("game-board");
        this.board.style.display = "grid";
        this.board.style.gridTemplateColumns = `repeat(${Math.sqrt(
            this.boardSize
        )}, 105px)`;
        this.goblin = document.createElement("img");
        this.goblin.alt = "G"
        this.goblin.src = "goblin.png";
        this.goblin.classList.add("goblin");
    }

    renderBoard() {
        for (let i = 1; i <= this.boardSize; i++) {
            const cell = document.createElement("cell");
            cell.classList.add("cell");
            cell.id = i;
            cell.textContent = i;
            this.board.appendChild(cell);
        }
    }

    cleanBoard() {
        this.board.innerHTML = "";
    }

    goblinPosition() {
        const oldGoblinPosition = this.goblinPositionId;

        do {
            this.goblinPositionId = Math.ceil(Math.random() * this.boardSize);
        } while (this.goblinPositionId === oldGoblinPosition);

        this.cleanBoard();
        this.renderBoard();
        const newGoblinPosition = document.getElementById(
            this.goblinPositionId
        );
        newGoblinPosition.textContent = "";
        newGoblinPosition.appendChild(this.goblin);
    }
}
