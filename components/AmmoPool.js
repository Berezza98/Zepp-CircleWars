import Ammo, { AMMO_RADIUS } from './Ammo';

export default class AmmoPool {
  constructor(game) {
    this.game = game;
    this.enemies = game.enemyPool;
    this.player = game.player;
    this.pool = [];
    // this.maxLength = 10;
    this.delay = 500;
    this.canAdd = true;
  }

  addAmmo() {
    if (this.canAdd) {
      this.pool.push(new Ammo(this.game));

      this.canAdd = false;

      this.timer = timer.createTimer(this.delay, 10000, () => {
        this.canAdd = true;
        timer.stopTimer(this.timer);
      }, {});
    }
  }

  checkHit() {
    this.pool.forEach((ammo) => {
      this.enemies.pool.forEach(enemy => {
        if (ammo.position.sub(enemy.position).mag() <= AMMO_RADIUS + enemy.radius) {
          enemy.hit();

          ammo.remove();
        }
      });
    });
  }

  update() {
    this.checkHit();

    this.addAmmo();

    this.pool = this.pool.filter(ammo => ammo.isActive);

    this.pool.forEach(ammo => ammo.update());
  }
}