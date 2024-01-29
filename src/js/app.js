import { sortTable, stopSortTable } from "./sortTable";
import GamePlay from "./GamePlay";

const mainElement = document.getElementById("app");
const gamePlayLinkElement = document.getElementById("gamePlayLink");
const sortTableLinkElement = document.getElementById("sortTableLink");

let intervalId;
const gamePlay = new GamePlay(mainElement);

function handleNavigation(event) {
    event.preventDefault();
    const targetId = event.target.id;
    switch (targetId) {
        case "gamePlayLink":
            stopSortTable(intervalId);
            gamePlay.showGamePlay();
            break;
        case "sortTableLink":
            gamePlay.stopGamePlay();
            intervalId = sortTable();
            break;
    }
}

window.addEventListener("hashchange", handleNavigation);

gamePlayLinkElement.addEventListener("click", handleNavigation);
sortTableLinkElement.addEventListener("click", handleNavigation);
