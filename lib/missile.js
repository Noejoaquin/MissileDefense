 // const MovingObject = require('./moving_object')
 
 class Missile {
  constructor(ctx, xPos, angle) {
  this.color = 'red';
  this.xPos = xPos
  this.originalAngle = angle;
  this.yPos = 0
  this.angle = this.originalAngle * Math.PI / 180
  this.speed = 1;
  this.radius = 4;
  this.vx = Math.cos(this.angle) * this.speed;
  this.vy = Math.sin(this.angle) * this.speed;
  this.draw = this.draw.bind(this);
  this.fall = this.fall.bind(this);
  this.move = this.move.bind(this);
  this.ctx = ctx;
  this.collided = false;
  this.exploded = false;
  }
  
  hasCollided() {
    this.collided = true;
  }

  draw() {
    // ctx.clearRect(this.xPos, this.yPos, 4, 10)
    // this.ctx.fillStyle = this.color;
    if (!this.collided && !this.exploded){
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(this.xPos,this.yPos,4, 0, 2*Math.PI)
      this.ctx.stroke();
    } else if (this.exploded) {
      debugger
      this.ctx.fillStyle = this.color
      this.ctx.fillRect(this.xPos,this.yPos, 4, 10)
    }
  }
  
  exploded(){
    this.exploded = true;
  }

  fall() {
    this.yPos += this.vy;
    this.xPos += this.vx;
  }
  
  hasCollidedWith(otherObject){
    // if (((this.xPos + this.radius) < (otherObject.xPos + otherObject.radius)) && 
      if (((this.yPos + this.radius) <= (otherObject.yPos + otherObject.radius))) {
        return false;
      }  else {
        return true;
      }
  }

  move() {
    if (!this.exploded) {
      this.draw();
      this.fall();
    } else {
      debugger
      this.draw();
    }
  }

}

export default Missile;