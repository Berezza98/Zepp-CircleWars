export default class Score {
  constructor(game) {
    this.game = game;
    this.counter = 0;
  }

  increase() {
    this.counter += 1;
  }

  save() {
    if (this.counter > getApp()._options.globalData.maxScore) {
      getApp()._options.globalData.maxScore = this.counter;
      getApp()._options.globalData.localStorage.set({
        maxScore: this.counter
      });
    }
  }
}