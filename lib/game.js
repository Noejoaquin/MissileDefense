const Missile = require('./missile.js')


export class Game {
  constructor(ctx, canvas){
    this.ctx = ctx;
    this.canvas = canvas; 
  }
  
  createBase() {
    return (
      this.ctx.fillStyle = 'yellow';
      this.ctx.fillRect(0,450,600,50)
      
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(0,425,70,25)
      
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(275, 425, 70, 25)
      
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(530, 425, 70, 25)
    )
  }
  
  createMissiles(){
    var missile = new Missile(this.ctx,this.canvas.width/2, 110);
    var missile2 = new Missile(this.ctx, this.canvas.width/3, 88);
    var missile3 = new Missile(this.ctx, this.canvas.width/2, 80);
    var missile4 = new Missile(this.ctx, this.canvas.width/2, 58);
    var missile5 = new Missile(this.ctx, this.canvas.width/4.2, 60);
  }
  
  renderFrame() {
    requestAnimationFrame(renderFrame);
    this.ctx.clearRect(0,0, 600, 500)
    missile.move();
    missile2.move();
    missile3.move();
    missile4.move();
    missile5.move();
  }
  
  play(){
    this.renderFrame();
  }
}

module.exports = Game;