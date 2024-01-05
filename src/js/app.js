import GamePlay from "../../src/js//GamePlay";
import { sortTable, stopSortTable } from "./sortTable";

const mainElement = document.getElementById("app");
const gamePlayLinkElement = document.getElementById("gamePlayLink");
const sortTableLinkElement = document.getElementById("sortTableLink");

let intervalId;
const gamePlay = new GamePlay();

function handleNavigation(event) {
    event.preventDefault();
    const targetId = event.target.id;
    mainElement.innerHTML = "";
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
