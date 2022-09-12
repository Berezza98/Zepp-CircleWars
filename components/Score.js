export default class Score {
  constructor(game) {
    this.game = game;
    this.counter = 0;
  }

  increase() {
    this.counter += 1;
  }
}