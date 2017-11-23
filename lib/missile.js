 // const MovingObject = require('./moving_object')

 class Missile {
  constructor(ctx, xPos, angle, speed) {
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
  this.createAngles = this.createAngles.bind(this);
  this.trueCollision = this.trueCollision.bind(this);
  this.explosion = new Audio([`assets/sound/explosion.wav`]);
  this.explosion.load();
  this.fallingSound = new Audio(['assets/sound/104551__chimerical__bomb-whistle-long.wav'])
  this.falling = false;
  }

  hasCollided() {
    this.collided = true;
  }

  explode() {
    this.exploded = true;
    if (!this.markedForClear){
      this.markedForClear = true;
      this.fallingSound.pause();
      this.explosion.play()
      setTimeout(() => this.timedOut = true, 500)
    }
  }

  draw() {
    if (!this.falling) {
      this.falling = true
      // this.fallingSound.play();
    }
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

    } else if (!this.collided && !this.exploded){
        this.ctx.drawImage(this.regularMissile, 0, 0, 90, 120, this.xPos-50, this.yPos-50, 60, 50 ) //adjusts image to have tip be at at xpos,ypos
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
    this.x += this.vx;
    this.y += this.vy;
  }

  createAngles(xPos, yPos, height, width){
    let leftSideAngles = [[xPos, yPos + height],[xPos, yPos + height/3], [xPos, yPos + height/2]]
    let topAngles = [[xPos, yPos], [xPos + width/4, yPos], [xPos + width/3, yPos], [xPos + width/2, yPos]]
    let rightSideAngles = [[xPos + width, yPos], [xPos + width, yPos + height/4],[xPos + width, yPos + height /2]]
    let bottomAngles = [[xPos + width, yPos + height], [xPos + width/2, yPos + height], [xPos + width/4, yPos + height]]
    return leftSideAngles.concat(topAngles).concat(rightSideAngles).concat(bottomAngles)
  }

  xCheck(coord, otherObject){
    if (coord[0] > otherObject.x && coord[0] < otherObject.x + otherObject.width){
      return true
    } else {
      return false
    }
  }

  yCheck(coord, otherObject){
    if (coord[1] > otherObject.y && coord[1] < otherObject.y + otherObject.height){
      return true
    } else {
      return false
    }
  }

  trueCollision(coord, otherObject){
    if (this.xCheck(coord, otherObject) && this.yCheck(coord, otherObject)) {
      return true;
    } else {
      return false
    }
  }

  hasCollidedWith(otherObject){
    let angles = this.createAngles(this.x, this.y, 50, 15)
    for (let i = 0; i < angles.length; i++){
      if (this.trueCollision(angles[i], otherObject)){
        return true
      }
    }
    return false
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
