import Enemy from './Enemy';

export default class AmmoPool {
  constructor(game) {
    this.game = game;
    this.player = game.player;
    this.pool = [];
    this.maxLength = 4;
    this.delay = 500;
    this.canAdd = true;

    this.addInitialEnemies();
  }

  addInitialEnemies() {
    for (let i = 0; i < this.maxLength; i++) {
      this.addEnemy();
    }
  }

  addEnemy() {
    this.pool.push(new Enemy(this.game));
  }

  checkCollision() {
    const { position: playerPosition, radius: playerSize } = this.player;
    const collisioned = this.pool.filter(enemy => {
      const needToDelete = playerPosition.sub(enemy.position).mag() <= enemy.radius + playerSize;
      if (needToDelete) {
        enemy.kill();
        return true;
      }

      return false;
    });

    this.pool = this.pool.filter(enemy => {
      return !enemy.isDead && (playerPosition.sub(enemy.position).mag() > enemy.radius + playerSize);
    });

    if (collisioned.length > 0) {
      this.player.hit(collisioned.length);
    }

    for (let i = 0; i < this.maxLength - this.pool.length; i++) {
      this.addEnemy();
    }
  }

  update() {
    this.checkCollision();
    this.pool.forEach(enemy => enemy.update());
  }
}