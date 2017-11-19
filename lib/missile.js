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
  this.gunnerHit = 0;
  this.gunnerExplosion = new Image()
  this.gunnerExplosion.src = 'assets/images/general_explosion_sprite.png'
  this.gunnerExplosionCountHoz = 0;
  this.gunnerExplosionCountVert = 0;
  this.gunnerExplosionClick = 0;
  }

  hasCollided() {
    this.collided = true;
  }

  explode() {
    this.exploded = true;
    if (!this.markedForClear){
      this.markedForClear = true;
      setTimeout(() => this.timedOut = true, 500)
    }
  }

  draw() {
    if (this.cityHit){
      this.cityExplosionClick += 2
      if (this.cityExplosionClick % 20 === 0) {
          this.cityExplosionCount += 95;
      }
      this.ctx.drawImage(this.cityExplosion, this.cityExplosionCount, 100, 90, 100, this.xPos-30, this.yPos-40, 60, 50);
    }else if (this.gunnerHit) { // (!this.collided && !this.exploded){
      this.gunnerExplosionClick += 5
      if (this.gunnerExplosionClick % 10 === 0){
        if (this.gunnerExplosionCountHoz === 390){ // this is the max width of sprite sheet
          this.gunnerExplosionCountHoz = 0;
          this.gunnerExplosionCountVert += 130; // sprite sheet is in sqs of 130 by 130
        } else if (this.gunnerExplosionCountHoz === 130 && this.gunnerExplosionCountVert === 390){ // for when we reach the end of the sprite sheet
          this.gunnerExplosionCountHoz = 0;
          this.gunnerExplosionCountVert = 0;
          this.gunnerHit = false;
        } else {
          this.gunnerExplosionCountHoz += 130;
        }
      }
      this.ctx.drawImage(this.gunnerExplosion, this.gunnerExplosionCountHoz, this.gunnerExplosionCountVert, 100, 100, this.xPos-30, this.yPos-35, 50, 50)

    } else if (!this.collided && !this.exploded){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.xPos,this.yPos,4, 0, 2 * Math.PI)
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
    else if (this.exploded && !this.timedOut) {
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
