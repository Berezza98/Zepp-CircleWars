import Vector from '../utils/Vector';
import { SCREEN_CENTER } from '../consts';
import { invertHex } from '../helpers';
import { AMMO_RADIUS } from './Ammo';

const healthColors = [
  0xfc6950,
  0xFFDD33,
  0x9FFF33,
  0x33FFCE,
  0x33E9FF,
  0x33B2FF,
];

export default class Player {
  constructor(game) {
    this.game = game;
    this.radius = 40;
    this.health = 1;
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.shootAngle = 0;
    this.strength = 1;
    this.position = SCREEN_CENTER;
    this.color = healthColors[this.health];
    this.sightColor = invertHex(this.color);

    this.addSpinEvent();
  }

  get sightPosition() {
    return this.position.add(Vector.fromAngle(this.shootAngle).setMag(this.radius));
  }

  get isDead() {
    return this.health <= 0;
  }

  addSpinEvent() {
    hmApp.registerSpinEvent((key, degree) => {
      this.shootAngle += Math.PI / 180 * degree;
      return true;
    });
  }

  hit(damageValue) {
    this.health -= damageValue;
    
    if (this.isDead) return this.game.end();

    console.log('PLAYER HIT: ', this.health);
    this.color = healthColors[this.health];
    this.sightColor = invertHex(this.color);
  }

  getSightOptions() {
    return {
      center_x: this.sightPosition.x,
      center_y: this.sightPosition.y,
      radius: AMMO_RADIUS,
      color: this.sightColor,
    };
  }

  update() {
    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);

    this.acceleration.set(0, 0);

    if (!this.widget) return this.draw();

    this.widget.setProperty(hmUI.prop.MORE, {
      center_x: this.position.x,
      center_y: this.position.y,
      radius: this.radius,
      color: this.color
    });

    this.sight.setProperty(hmUI.prop.MORE, this.getSightOptions());
  }

  draw() {
    this.widget = hmUI.createWidget(hmUI.widget.CIRCLE, {
      center_x: this.position.x,
      center_y: this.position.y,
      radius: this.radius,
      color: this.color
    });

    this.sight = hmUI.createWidget(hmUI.widget.CIRCLE, this.getSightOptions());
  }
}