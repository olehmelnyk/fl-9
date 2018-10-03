// https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
function assign(target) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  let to = Object(target);

  for (let index = 1; index < arguments.length; index++) {
    let nextSource = arguments[index];

    if (nextSource !== null || nextSource !== undefined) {
      for (let nextKey in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }

  return to;
}

function Bot(args) {
  this.name = args.name;
  this._speed = this._defaultSpeed = args.speed;
  this._x = args.x;
  this._y = args.y;
}

Bot.prototype.getSpeed = function() {
  return this._speed;
};

Bot.prototype.setSpeed = function(newSpeed) {
  this._speed = newSpeed;
};

Bot.prototype.getDefaultSpeed = function() {
  return this._defaultSpeed;
};

Bot.prototype.getCoordinates = function() {
  return {x: this._x, y: this._y};
};

Bot.prototype.setCoordinates = function(coords) {
  this._x = coords.x;
  this._y = coords.y;
};

Bot.prototype.move = function(move) {
  switch (move) {
    case 'up':
      this._y += this.getSpeed();
      break;
    case 'down':
      this._y -= this.getSpeed();
      break;
    case 'left':
      this._x -= this.getSpeed();
      break;
    case 'right':
      this._x += this.getSpeed();
      break;
    default:
      console.log('Wrong move');
  }
};

Bot.prototype.getLocation = function() {
  return `${this.getCoordinates().x}:${this.getCoordinates().y}}`;
};

Bot.prototype.showPosition = function() {
  console.log(`I am ${this.constructor.name} '${this.name}'. I am located at ${this.getLocation()}`);
};

function Racebot(args) {
  Bot.call(this, args);
  this._previousMove = null;
}

Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Racebot;

Racebot.prototype.calculateSpeed = function(currentMove, previousMove) {
  this.setSpeed(currentMove === previousMove ? this.getSpeed() + 1 : this.getDefaultSpeed());
};

Racebot.prototype.move = function(move) {
  switch (move) {
    case 'up':
      this.calculateSpeed(move, this._previousMove);
      this._previousMove = move;
      this._y += this.getSpeed();
      break;
    case 'down':
      this.calculateSpeed(move, this._previousMove);
      this._previousMove = move;
      this._y -= this.getSpeed();
      break;
    case 'left':
      this.calculateSpeed(move, this._previousMove);
      this._previousMove = move;
      this._x -= this.getSpeed();
      break;
    case 'right':
      this.calculateSpeed(move, this._previousMove);
      this._previousMove = move;
      this._x += this.getSpeed();
      break;
    default:
      console.log('Wrong move');
  }
};

function Speedbot(args) {
  Bot.call(this, args);
  this._prepEngineStep = 0;
}

Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Speedbot;

Speedbot.prototype.prepareEngine = function() {
  this.setSpeed(this.getSpeed() + 2);
  this._prepEngineStep = 1;
};

Speedbot.prototype.move = function(move) {
  if (this._prepEngineStep++ > 1) {
    if (this.getSpeed() > this.getDefaultSpeed()) {
      this.setSpeed(this.getSpeed() - 1);
    } else {
      this._prepEngineStep = 0;
    }
  }

  Bot.prototype.move.call(this, move);
};
