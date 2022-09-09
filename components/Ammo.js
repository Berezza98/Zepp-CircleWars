import { SCREEN_CENTER, DEVICE_WIDTH } from '../consts';
import Vector from '../utils/Vector';

export const AMMO_RADIUS = 8;

export default class Ammo {
  constructor(game) {
    this.game = game;
    this.radius = AMMO_RADIUS;
    this.acceleration = new Vector(0, 0);
    this.velocity = this.game.player.sightPosition.sub(SCREEN_CENTER).setMag(3);
    this.position = this.game.player.sightPosition;
    this.color = 0xF7B916;
    this.active = true;
  }

  get isActive() {
    return this.active && SCREEN_CENTER.sub(this.position).mag() < DEVICE_WIDTH - this.radius;
  }

  remove() {
    this.active = false;
    this.clear();
  }

  clear() {
    if (!this.widget) return;

    this.widget.setProperty(hmUI.prop.VISIBLE, false);
    hmUI.deleteWidget(this.widget);
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