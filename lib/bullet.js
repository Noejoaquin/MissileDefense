

class Bullet {
  constructor(ctx, xPos, yPos, xEnd, yEnd){
    this.xPos = xPos;
    this.yPos= yPos;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.angle = Math.atan2(yEnd - yPos, xEnd - xPos)
    this.angle = this.angle + ((180 * Math.PI) / 180)
    this.speed = 3;
    this.radius = 3;
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
    this.image = new Image();
    this.image.src = 'assets/images/bullet_sprite.png'
    this.count = 0;
    this.internalCLick = 0;
  }

  hasCollided() {
    this.collided = true;
  }

  explode() {
    this.exploded = true;
    if (!this.markedForClear){
      this.markedForClear = true;
      setTimeout(() => {
        this.timedOut = true
        this.radius = 0;}, 2000)
    }
  }

  draw() {
    this.internalCLick += 2;

    if (!this.collided && !this.exploded){
      this.ctx.beginPath();
      this.ctx.fillStyle = 'yellow';
      this.ctx.arc(this.xPos,this.yPos, this.radius, 0, 2 * Math.PI)
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
      // if (this.internalClick % 20 === 0) {
      // if (this.count === 96) {
      //   this.count = 0;
      // } else {
      //   this.count += 32;
      //   }
      // }
      this.ctx.drawImage(this.image, 170, 47, 50, 49, this.xPos-5, this.yPos-6, 20, 20);

    } else if (this.exploded) {
      this.radius = 20;
      this.image = new Image();
      this.image.src = './assets/images/shell_explosion_sprite.png'
      this.ctx.drawImage(this.image, this.xPos-20, this.yPos-20, 40, 40)
    }
  }

  exploded(){
    this.exploded = true;
  }

  changePosition() {
    this.yPos -= this.vy;
    this.xPos -= this.vx;
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

export default Bullet;
