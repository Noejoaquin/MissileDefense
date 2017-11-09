 const MovingObject = require('./moving_object.js')
 
 class Missile {
  constructor(ctx, xPos, angle) {
  this.color = 'red';
  this.xPos = xPos
  this.originalAngle = angle;
  this.yPos = 0
  this.angle = this.originalAngle * Math.PI / 180
  this.speed = .5;
  this.vx = Math.cos(this.angle) * this.speed;
  this.vy = Math.sin(this.angle) * this.speed;
  this.draw = this.draw.bind(this);
  this.fall = this.fall.bind(this);
  this.move = this.move.bind(this);
  this.ctx = ctx;
  }

  draw() {
    // ctx.clearRect(this.xPos, this.yPos, 4, 10)
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.xPos,this.yPos, 4, 10);
  }

  fall() {
    this.yPos += this.vy;
    this.xPos += this.vx;
  }

  move() {
    this.draw();
    this.fall();
  }

}

module.exports = Missile;