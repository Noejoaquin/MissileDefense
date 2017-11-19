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
  this.regularMissile = new Image();
  this.regularMissile.src = 'assets/images/missile_sprite.png'
  this.cityHit = false;
  this.cityExplosion = new Image()
  this.cityExplosion.src = 'assets/images/explosion-sprite.png'
  this.cityExplosionCount = 0;
  this.cityExplosionClick = 0;
  this.generalHit = 0;
  this.generalExplosion = new Image()
  this.generalExplosion.src = 'assets/images/general_explosion_sprite.png'
  this.generalExplosionCountHoz = 0;
  this.generalExplosionCountVert = 0;
  this.generalExplosionClick = 0;
  this.x = this.xPos - 8;
  this.y = this.yPos - 50;
  this.width = 15;
  this.height = 50;
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
    } else if (this.generalHit) { // (!this.collided && !this.exploded){
      this.generalExplosionClick += 5
      if (this.generalExplosionClick % 10 === 0){
        if (this.generalExplosionCountHoz === 390){ // this is the max width of sprite sheet
          this.generalExplosionCountHoz = 0;
          this.generalExplosionCountVert += 130; // sprite sheet is in sqs of 130 by 130
        } else if (this.generalExplosionCountHoz === 130 && this.gunnerExplosionCountVert === 390){ // for when we reach the end of the sprite sheet
          this.generalExplosionCountHoz = 0;
          this.generalExplosionCountVert = 0;
          this.generalHit = false;
        } else {
          this.generalExplosionCountHoz += 130;
        }
      }
      this.ctx.drawImage(this.generalExplosion, this.generalExplosionCountHoz, this.generalExplosionCountVert, 100, 100, this.xPos-30, this.yPos-35, 50, 50)

    } else if (!this.collided && !this.exploded){        // this.ctx.beginPath();
        // this.ctx.fillStyle = this.color;
        // this.ctx.arc(this.xPos,this.yPos,4, 0, 2 * Math.PI)
        // this.ctx.fill();
        // this.ctx.stroke();
        // this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.xPos-8,this.yPos-50, 15, 50)
        this.ctx.closePath();
        this.ctx.drawImage(this.regularMissile, 0, 0, 90, 120, this.xPos-50, this.yPos-50, 60, 50 )
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
    this.x += this.vx;
    this.y += this.vy;
  }

  hasCollidedWith(otherObject){
    if (this.x < otherObject.x + otherObject.width &&
         this.x + this.width > otherObject.x &&
         this.y < otherObject.y + otherObject.height &&
         this.height + this.y > otherObject.y) {
           debugger
      return true
    } else {
      return false
    }

      // let dx = this.xPos - otherObject.xPos;
      // let dy = this.yPos - otherObject.yPos;
      // let distance = Math.sqrt(dx * dx + dy * dy)
      //
      // if (distance < this.radius + otherObject.radius){
      //   return true
      // } else {
      //   return false
      // }

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
