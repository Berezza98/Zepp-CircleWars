import AmmoPool from './AmmoPool';
import EnemyPool from './EnemyPool';
import Player from './Player';

export default class Game {
  constructor() {
    this.fps = 30;

    this.init();
  }

  init() {
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

  stop() {
    if (!this.timer) return;

    timer.stopTimer(this.timer);
  }
}

new Game(5);
