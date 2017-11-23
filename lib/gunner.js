// import Bullet from './gunner'
import Bullet from './bullet';
class Gunner {
  constructor(xPos, yPos, ctx){
    this.xPos = xPos;
    this.yPos = yPos;
    this.x= xPos;
    this.y =yPos;
    this.ctx = ctx;
    this.max = 20;
    this.shoot = this.shoot.bind(this)
    this.width = 70;
    this.height = 30;
    this.image = new Image();
    this.image.src = 'assets/images/gunner.png'
    this.shootSound = new Audio(['assets/sound/gunshot.com-1143231822.wav'])
  }

  mute(){
    this.shootSound.muted = true;
  }

  playSound() {
    this.shootSound.muted = false;
  }

  shoot(endPosX, endPosY ){
      let bullet = new Bullet (this.ctx, this.x + 30, this.y + 15, endPosX, endPosY)
      return bullet
  }

  draw(){
    // this.ctx.beginPath();
    // this.ctx.fillStyle = 'blue'
    // this.ctx.fillRect(this.xPos,this.yPos, 70, 30)
    // this.ctx.closePath();
    this.ctx.drawImage(this.image, this.xPos-10, this.yPos-8)
    // this.ctx.arc(this.xPos,this.yPos,this.radius, 0, 2 * Math.PI)
    // this.ctx.fill();
    // this.ctx.stroke();
    // this.ctx.closePath();
  }

  hasCollidedWith(otherObject){
  }
}

export default Gunner;
