'use strict';

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health_ = 100;
  }

  damage() {
    this.health_ -= 10;
  }

  getHealth() {
    return this.health_;
  }

  toString() {
    return `x: ${this.x} y: ${this.y} health: ${this.health_}`
  }
}

class Player extends Character {
  constructor(x, y, name) {
    super(x, y);
    this.name = name;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  toString() {
    return `name: ${this.name} ${super.toString()}`;
  }
}