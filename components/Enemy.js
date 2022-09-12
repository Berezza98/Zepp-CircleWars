import Vector from '../utils/Vector';
import { DEVICE_WIDTH, SCREEN_CENTER } from '../consts';
import { getRandom, getRandomFromArray, invertHex } from '../helpers';
import Text from '../general/Text';

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

const possibleText = ['V', 'O', 'Z'];

export default class Enemy {
  constructor(game) {
    this.game = game;
    this.player = this.game.player;
    this.score = this.game.score;
    this.speed = 1 + this.score.counter * 0.05;
    this.health = 1;
    this.radius = getRandom(20, 40);
    this.acceleration = new Vector(0, 0);
    this.position = Vector.random().setMag(DEVICE_WIDTH / 2 + this.radius).add(SCREEN_CENTER);
    this.color = getRandomFromArray(possibleColors);
    this.text = new Text({
      x: this.position.x,
      y: this.position.y,
      w: this.radius * 2,
      h: this.radius * 2,
      text_size: this.radius,
      text: getRandomFromArray(possibleText),
      color: invertHex(this.color),
    });
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

    if (this.isDead) {
      this.score.increase();
      this.clear();
    }
  }

  kill() {
    this.health = 0;

    this.score.increase();
    this.clear();
  }

  clear() {
    if (!this.widget) return;

    this.text.clear();
    this.widget.setProperty(hmUI.prop.VISIBLE, false);
    this.widget = null;
  }

  update() {
    this.position = this.position.add(this.velocity);

    if (!this.widget) return this.draw();

    this.widget.setProperty(hmUI.prop.MORE, {
      center_x: this.position.x,
      center_y: this.position.y,
      radius: this.radius,
      color: this.color
    });

    this.text.set({
      x: this.position.x,
      y: this.position.y,
    });
    this.text.update();    
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