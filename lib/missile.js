 // const MovingObject = require('./moving_object')

 class Missile {
  constructor(ctx, xPos, angle, speed) {
  this.color = 'green';
  this.xPos = xPos
  this.originalAngle = angle;
  this.yPos = 0
  this.angle = this.originalAngle * Math.PI / 180
  this.speed = speed;
  this.radius = 4;
  this.vx = Math.cos(this.angle) * this.speed;
  this.vy = Math.sin(this.angle) * this.speed;
  this.draw = this.draw.bind(this);
  this.changePosition = this.changePosition.bind(this);
  this.move = this.move.bind(this);
  this.ctx = ctx;
  this.collided = false;
  this.exploded = false;
  this.timedOut = false;
  this.markedForClear = false;
  this.cityHit = false;
  this.cityExplosion = new Image()
  this.cityExplosion.src = 'assets/images/explosion-sprite.png'
  this.cityExplosionCount = 0;
  this.cityExplosionClick = 0;
  }

  hasCollided() {
    this.collided = true;
  }

  explode() {
    this.exploded = true;
    if (!this.markedForClear){
      this.markedForClear = true;
      setTimeout(() => this.timedOut = true, 2000)
    }
  }

  draw() {
    if (this.cityHit){
      this.cityExplosionClick += 2
      if (this.cityExplosionClick % 20 === 0) {
        if (this.count === 380) {
          this.cityExplosionCount = 0;
          this.cityHit = false
        } else {
          this.cityExplosionCount += 95;
        }
      }
      this.ctx.drawImage(this.cityExplosion, this.cityExplosionCount, 100, 90, 100, this.xPos-30, this.yPos-40, 60, 50);
    }else if (!this.collided && !this.exploded){
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.arc(this.xPos,this.yPos,4, 0, 2 * Math.PI)
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (this.exploded && !this.timedOut) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color
      this.ctx.fillRect(this.xPos,this.yPos, 4, 10)
      this.ctx.closePath();
    }
  }

  exploded(){
    this.exploded = true;
  }

  changePosition() {
    this.yPos += this.vy;
    this.xPos += this.vx;
  }

  hasCollidedWith(otherObject){
      let dx = this.xPos - otherObject.xPos;
      let dy = this.yPos - otherObject.yPos;
      let distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < this.radius + otherObject.radius){
        return true
      } else {
        return false
      }
  }

  move() {
    if (!this.exploded) {
      this.draw();
      this.changePosition();
    } else {
      this.draw();
    }
  }

}

export default Missile;
