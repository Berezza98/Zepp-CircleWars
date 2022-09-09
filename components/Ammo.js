import { SCREEN_CENTER } from '../consts';
import Vector from '../utils/Vector';

export default class Ammo {
  constructor(game) {
    this.game = game;

    this.radius = 8;
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.position = this.game.player.sightPosition;
    this.color = 0xF7B916;
  }

  update() {
    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);

    this.acceleration.set(0, 0);

    if (this.widget) {
      this.widget.setProperty(hmUI.prop.MORE, {
        center_x: this.game.player.sightPosition.x,
        center_y: this.game.player.sightPosition.y,
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