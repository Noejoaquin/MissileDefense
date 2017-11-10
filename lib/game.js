import Bullet from './bullet'
import Missile from './missile';
import Gunner from './gunner';

class Game {
  constructor(ctx, canvas){
    this.ctx = ctx;
    this.canvas = canvas;
    this.renderFrame = this.renderFrame.bind(this)
    this.createBase = this.createBase.bind(this)
    this.createMissiles = this.createMissiles.bind(this)
    this.createGround = this.createGround.bind(this)
    this.createMissiles();
    this.createBase();
    this.gameGunners = this.gameGunners.bind(this)
    this.makeBullets = this.makeBullets.bind(this);
    this.allObjects = this.createMissiles().concat(this.gameGunners()).concat(this.makeBullets())
    this.checkCollision = this.checkCollision.bind(this)
    this.explodedObjects = [];
  }

  makeBullets(){
    var bullet = new Bullet(this.ctx, 20, 430, 122)
    return this.bullets = [bullet]
  }

  gameGunners(){
    return [this.gunner1] //this.gunner2, this.gunner3]
  }

  createMissiles(){
    var missile = new Missile(this.ctx,this.canvas.width/2, 122);
    // var missile2 = new Missile(this.ctx, this.canvas.width/3, 88);
    // var missile3 = new Missile(this.ctx, this.canvas.width/2, 80);
    // var missile4 = new Missile(this.ctx, this.canvas.width/2, 58);
    // var missile5 = new Missile(this.ctx, this.canvas.width/4.2, 60);
    return this.missiles = [missile]//  missile2, missile3, missile4, missile5]
  }

  createGround(){
    this.ctx.beginPath()
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(0,450,600,50)
    this.ctx.closePath();
  }

  createBase() {
    this.createGround()
    this.gunner1 = new Gunner(20, 447, 10, this.ctx)
    this.gunner1.draw()

      // this.gunner2 = new Gunner(300, 447, 3, this.ctx)
      // this.gunner2.draw()
      // //
      // this.gunner3 = new Gunner(580, 447, 3, this.ctx)
      // this.gunner3.draw()
  }



  checkCollision(){
    const allObjects = this.allObjects
    // debugger
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        if (i === j) continue;
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];
        // console.log(obj2)
        // if(typeof obj1 === 'undefined') continue;
        // if (obj1 instanceof Bullet && obj2 instanceof Gunner) continue;
        // if (obj1 instanceof Gunner && obj2 instanceof Gunner) continue;
        if (obj1.hasCollidedWith(obj2)) { //&& !(obj2 instanceof Missile)) {
          debugger
          if (obj1 instanceof Missile && obj2 instanceof Bullet) {
            console.log('COLLIDE')
            obj1.exploded = true;
            obj2.exploded = true;
            this.explodedObjects.push(obj1)
            this.explodedObjects.push(obj2)
            allObjects.splice(allObjects.indexOf(obj1),1)
            allObjects.splice(allObjects.indexOf(obj2),1)
          } else if (obj1 instanceof Missile) {
            debugger
            obj1.exploded = true;
            this.explodedObjects.push(obj1)
            allObjects.splice(allObjects.indexOf(obj1),1)
          }
        }
      }
    }

  }


  renderFrame() {
    this.ctx.clearRect(0,0, 600, 500)
    this.createBase()
    this.allObjects
    // debugger
      this.allObjects.forEach((object) => {
        if (!object.collided) {
            object.move();
        }
        });
    if (this.explodedObjects.length !== 0){
      this.explodedObjects.forEach((object) => object.move())
    }
    this.checkCollision();
    requestAnimationFrame(this.renderFrame);
  }

  play(){
    this.renderFrame();
  }
}

export default Game;
