import AmmoPool from './AmmoPool';
import EnemyPool from './EnemyPool';
import Player from './Player';
import Score from './Score';

export default class Game {
  constructor() {
    this.fps = 30;

    this.init();
  }

  init() {
    this.score = new Score(this);
    this.player = new Player(this);
    this.enemyPool = new EnemyPool(this);
    this.ammoPool = new AmmoPool(this);

    this.gameObjects = [
      this.player,
      this.enemyPool,
      this.ammoPool,
    ];
  }

  render() {
    this.timer = timer.createTimer(0, 1000 / this.fps, () => {
      this.gameObjects.forEach(obj => obj.update());
    });
  }

  end() {
    this.stop();
    this.score.save();
    hmApp.gotoPage({
      url: 'page/gtr3-pro/loose/index',
      param: JSON.stringify({
        currentScore: this.score.counter
      })
    });
  }

  stop() {
    if (!this.timer) return;

    timer.stopTimer(this.timer);
  }
}

new Game(5);
