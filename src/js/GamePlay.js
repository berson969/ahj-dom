import GoblinImage from "../img/goblin.png";

export default class GamePlay {
    constructor(element) {
        this.mainElement = element;
        this.boardSize = 4 ** 2;
        this.goblinPositionId = 0;
        this.intervalId = null;
    }

    renderBoard() {
        this.board = document.createElement("div");
        this.board.id = "game-board";
        this.board.style.display = "grid";
        this.board.style.gridTemplateColumns = `repeat(${Math.sqrt(
            this.boardSize
        )}, 105px)`;

        for (let i = 1; i <= this.boardSize; i++) {
            const cell = document.createElement("cell");
            cell.classList.add("cell");
            cell.id = i;
            cell.textContent = i;
            this.board.appendChild(cell);
        }
        this.mainElement.insertAdjacentElement("beforeend", this.board);
    }

    cleanBoard() {
        Array.from(this.mainElement.children).forEach(element => {
            element.remove();
        });
    }

    goblinPosition() {
        this.goblin = document.createElement("img");

        this.goblin.src = GoblinImage;
        this.goblin.classList.add("goblin");

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

    showGamePlay() {
        this.stopGamePlay();
        this.goblinPosition();
        this.intervalId = setInterval(() => {
            this.goblinPosition();
        }, 1000);
        return this.intervalId;
    }

    stopGamePlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
