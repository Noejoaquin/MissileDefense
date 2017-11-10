

class Gunner {
  constructor(xPos, yPos, radius, ctx){
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.ctx = ctx;
  }
  
  hasCollided(){
    //dummy function
  }
  
  collided(){
    
  }
  
  move() {
    
  }
  
  draw(){
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(this.xPos,this.yPos,this.radius, 0, 2*Math.PI)
    this.ctx.stroke();
  }
  
  hasCollidedWith(otherObject){
    if (((this.xPos + this.radius) < (otherObject.xPos + otherObject.radius)) && 
      ((this.yPos + this.radius) < (otherObject.yPos + otherObject.radius))) {
        return true;
      }  else {
        return false;
      }
  }
}

export default Gunner;