import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../consts";
import Vector from "../utils/Vector";
const logger = DeviceRuntimeCore.HmLogger.getLogger('Space Breaker');

export function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isOnTheField({ x, y }) {
  return x > 0 && x < DEVICE_WIDTH && y > 0 && y < DEVICE_HEIGHT;
}

export function getRandomFromArray(array) {
  return array[getRandom(0, array.length - 1)];
}

export function getMinMax(min, max, origMin, origMax, value) { // -1 1 -100 100, -1
  const origDist = Math.abs(origMax - origMin); // 100 - (-100) = 200
  const dist = Math.abs(max - min); // 1 - (-1) = 2
  const coef = origDist / dist; // 200 / 2 = 100

  return origMin + (coef + value * coef); // -100 + (100 + (-100))
}

export function log(...args) {
  logger.debug(...args);
}

export function getCoorditatesAfterRotation({ position, angle, origin }) {
  return new Vector(
    (position.x - origin.x) * Math.cos(angle) - (position.y - origin.y) * Math.sin(angle) + origin.x,
    (position.x - origin.x) * Math.sin(angle) + (position.y - origin.y) * Math.cos(angle) + origin.y
  );
}

export function lineCircleCollision(line, circle) {
  // LINE IS AN OBJECT WITH TWO PROPS: "start" - Vector and "end" - Vector
  const startLineToEndLineVector = line.end.sub(line.start);
  const centerBallToStartLineVector = line.start.sub(circle.position);
  const centerBallToEndLineVector = line.end.sub(circle.position);

  // CHECK IF CLOSEST POINT IS START POINT OF LINE
  if (Vector.dot(startLineToEndLineVector, centerBallToStartLineVector.normalize()) > 0) {
    return {
      result: line.start.sub(circle.position).mag() < circle.radius,
      projectionPoint: line.start
    }
  }

  // CHECK IF CLOSEST POINT IS END POINT OF LINE
  if (Vector.dot(startLineToEndLineVector, centerBallToEndLineVector.normalize()) < 0) {
    return {
      result: line.end.sub(circle.position).mag() < circle.radius,
      projectionPoint: line.end
    }
  }

  const startLineToCenterBallVector = circle.position.sub(line.start);

  const projectionLength = Vector.dot(startLineToEndLineVector.normalize(), startLineToCenterBallVector);
  const projectionPoint = line.start.add(startLineToEndLineVector.setMag(projectionLength));

  return {
    result: projectionPoint.sub(circle.position).mag() < circle.radius,
    projectionPoint
  }
}

export function radiansToDegrees(radiansValue) {
  return radiansValue * (180 / Math.PI);
}

export function invertHex(hexColor) {
  const hex = hexColor.toString(16);

  function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }

  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);

  return +`0x${padZero(r)}${padZero(g)}${padZero(b)}`;
}