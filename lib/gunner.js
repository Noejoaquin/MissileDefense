// import Bullet from './gunner'
import Bullet from './bullet';
class Gunner {
  constructor(xPos, yPos, radius, ctx){
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.ctx = ctx;
    this.max = 20;
    this.shoot = this.shoot.bind(this)
  }

  shoot(endPosX, endPosY ){
    debugger
    if (this.max > 0){
      let bullet = new Bullet (this.ctx, this.xPos, this.yPos, endPosX, endPosY)
      this.max = this.max - 1;
      debugger
      return bullet
    } else {
      return new Bullet(this.ctx, 0,0,0,0);
    }
  }

  hasCollided(){
    //dummy function
  }

  collided(){

  }

  move() {

  }

  draw(){
    this.ctx.beginPath();
    this.ctx.fillStyle = 'blue';
    this.ctx.arc(this.xPos,this.yPos,this.radius, 0, 2 * Math.PI)
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
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
}

export default Gunner;
