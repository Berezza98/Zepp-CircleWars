import Vector from '../utils/Vector';
import { DEVICE_WIDTH, SCREEN_CENTER } from '../consts';
import { getRandom, getRandomFromArray } from '../helpers';

const possibleColors = [
  0xfc6950,
  0xFFDD33,
  0x9FFF33,
  0x33FFCE,
  0x33E9FF,
  0x33B2FF,
  0x3393FF,
  0x3371FF,
  0xAF33FF,
  0xFF33F6,
  0xFF3383,
];

export default class Enemy {
  constructor(game) {
    this.game = game;
    this.player = this.game.player
    this.speed = 0.5;
    this.health = 1;
    this.radius = getRandom(20, 40);
    this.acceleration = new Vector(0, 0);
    this.position = Vector.random().setMag(DEVICE_WIDTH / 2 + this.radius).add(SCREEN_CENTER);
    this.color = getRandomFromArray(possibleColors);
  }

  get velocity() {
    return this.player.position.sub(this.position).setMag(this.speed);
  }

  get isDead() {
    return this.health <= 0;
  }

  hit() {
    if (this.isDead) return;

    this.health -= this.player.strength;

    if (this.isDead) this.clear();
  }

  kill() {
    this.health = 0;
  }

  clear() {
    if (!this.widget) return;

    this.widget.setProperty(hmUI.prop.VISIBLE, false);
    // hmUI.deleteWidget(this.widget);
  }

  update() {
    // this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);

    // this.acceleration.set(0, 0);

    if (this.widget) {
      this.widget.setProperty(hmUI.prop.MORE, {
        center_x: this.position.x,
        center_y: this.position.y,
        radius: this.radius,
        color: this.color
      });

      return;
    }

    this.draw();
  }

  draw() {
    this.widget = hmUI.createWidget(hmUI.widget.CIRCLE, {
      center_x: this.position.x,
      center_y: this.position.y,
      radius: this.radius,
      color: this.color
    });
  }
}