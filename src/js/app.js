document.addEventListener('DOMContentLoaded', function () {
  const gameBoard = document.getElementById('game-board');
  const player = document.createElement('img');
  player.src = '../src/img/goblin.png';
  player.id = 'player';
  gameBoard.appendChild(player);

  function getRandomPosition() {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    return { row, col };
  }

  function movePlayer() {
    const newPosition = getRandomPosition();
    player.style.gridRow = newPosition.row;
    player.style.gridColumn = newPosition.col;
  }

  // Инициализация начальной позиции
  movePlayer();

  // Запуск функции перемещения с интервалом 1000 миллисекунд
  setInterval(movePlayer, 1000);
});
