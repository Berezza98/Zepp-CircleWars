import Vector from '../utils/Vector';
import { SCREEN_CENTER } from '../consts';

const healthColors = [
  0xfc6950,
  0xFFDD33,
  0x9FFF33,
  0x33FFCE,
  0x33E9FF,
  0x33B2FF,
];

export default class Player {
  constructor() {
    this.radius = 40;
    this.health = 5;

    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.shootAngle = 0;
    this.strength = 1;
    this.position = SCREEN_CENTER;
    this.color = healthColors[this.health];

    this.addSpinEvent();
  }

  get sightPosition() {
    return this.position.add(Vector.fromAngle(this.shootAngle).setMag(this.radius));
  }

  addSpinEvent() {
    hmApp.registerSpinEvent((key, degree) => {
      this.shootAngle += Math.PI / 180 * degree;
      return true;
    });
  }

  hit(damageValue) {
    this.health -= damageValue;
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