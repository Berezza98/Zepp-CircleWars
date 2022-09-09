import Ammo from './Ammo';
import Enemy from './Enemy';
import Player from './Player';

export default class Game {
  constructor() {
    this.fps = 30;

    this.init();
  }

  init() {
    // const enemies = new Array(15).fill(null).map(el => new Enemy());
    this.player = new Player(this);
    this.ammo = new Ammo(this);

    this.gameObjects = [
      this.player,
      this.ammo,
      // ...enemies,
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
