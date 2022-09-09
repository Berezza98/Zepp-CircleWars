import Vector from '../utils/Vector';
import { SCREEN_CENTER } from '../consts';
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
  constructor() {
    this.radius = getRandom(5, 30);

    this.acceleration = new Vector(0, 0);
    this.velocity = Vector.random().setMag(3);
    this.position = SCREEN_CENTER;
    this.color = getRandomFromArray(possibleColors);
  }

  update() {
    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);

    this.acceleration.set(0, 0);

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