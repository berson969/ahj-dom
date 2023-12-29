export default class GamePlay {
  constructor() {
    this.boardSize = 4;

    this.boardEl = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }


}
