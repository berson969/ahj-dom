import GoblinImage from "../img/goblin.png";

export default class GamePlay {
    constructor(element) {
        this.mainElement = element;
        this.boardSize = 4 ** 2;
        this.goblinPositionId = 0;
        this.intervalId = null;
        this.score = 0;
        this.missedGoblins = 5;

        this.deleteCursor = this.deleteCursor.bind(this);
        this.hammerCursor = this.hammerCursor.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    addScoreElement() {
        this.scoreElement = document.createElement("div");
        this.scoreElement.classList.add('score')
        this.scoreElement.textContent = `score ${this.score} ${this.missedGoblins}`
        this.mainElement.insertAdjacentElement("beforeend", this.scoreElement);
    }

    renderBoard() {
        this.addScoreElement()

        this.board = document.createElement("div");
        this.board.id = "game-board";
        this.board.style.display = "grid";
        this.board.style.gridTemplateColumns = `repeat(${Math.sqrt(
            this.boardSize
        )}, 105px)`;

        this.mainElement.insertAdjacentElement("beforeend", this.scoreElement);
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

        newGoblinPosition.appendChild(this.goblin);

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('mouseenter', this.hammerCursor);
        });
        this.board.addEventListener("click", this.handleClick);

    }

    deleteCursor() {
        const oldCursor = document.body.querySelector('.hammer-cursor')
        if (oldCursor) {
            oldCursor.remove();
        }
    }

    hammerCursor(event) {
        this.deleteCursor()
        const cursor = document.createElement("div");
        cursor.classList.add('hammer-cursor');
        event.target.appendChild(cursor);
    }

    handleClick(event) {
        const targetId = event.target.closest('.cell').id
        if (targetId === this.goblinPositionId.toString()) {
            this.score++;
            this.showGamePlay();
        }
    }

    showGamePlay() {
            this.stopGamePlay();
            this.goblinPosition();

            this.intervalId = setInterval(() => {

                this.goblinPosition();
                this.missedGoblins--;
                if(this.missedGoblins <= 0) {
                    this.endGame()
                }
            }, 2000);
            return this.intervalId;
    }

    stopGamePlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    endGame() {
        this.stopGamePlay();
        // console.log("Game Over! Score:", this.score);
        alert("Game Over! Your Score: " + this.score);
    }
}
