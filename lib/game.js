import Bullet from './bullet'
import Missile from './missile';
import Gunner from './gunner';

class Game {
  constructor(ctx, canvas){
    this.ctx = ctx;
    this.canvas = canvas;
    this.renderFrame = this.renderFrame.bind(this)
    this.createMissiles = this.createMissiles.bind(this)
    this.createGround = this.createGround.bind(this)
    this.createMissiles();
    this.createGround();
    // this.gameGunners = this.gameGunners.bind(this);
    this.gunner1 = new Gunner(300, 447, 10, this.ctx)
    // this.gunner1.draw()
    // this.makeBullets = this.makeBullets.bind(this);
    // this.allObjects = this.createMissiles().concat([this.gunner1])//.concat(this.makeBullets())
    this.missiles = this.createMissiles();
    this.bullets = [];
    this.checkCollision = this.checkCollision.bind(this)
    this.explodedObjects = [];
    this.click = this.click.bind(this);
    this.triggerGun = this.triggerGun.bind(this);
    this.click();
  }


  click(){
    let that = this
    var pos = [];
    that.canvas.onclick = function(e) {
      console.log('clicked')
      let yEnd = e.offsetY
      let xEnd = e.offsetX
      that.triggerGun(xEnd, yEnd)
    }
  }

  triggerGun(xEnd, yEnd){
    // let endPos = this.click();
    let bullet = this.gunner1.shoot(xEnd, yEnd)
    // this.allObjects.push(this.bullet)
    this.bullets.push(bullet);
  }

  // gameGunners(){
  //   return [this.gunner1] //this.gunner2, this.gunner3]
  // }

  createMissiles(){
    var missile = new Missile(this.ctx,this.canvas.width/2, 90);
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



  checkCollision(){
    const allObjects = this.allObjects
    // debugger
    // for (let i = 0; i < allObjects.length; i++) {
    //   for (let j = 0; j < allObjects.length; j++) {
    //     if (i === j) continue;
    //     const obj1 = allObjects[i];
    //     const obj2 = allObjects[j];
    //     // console.log(obj2)
    //     // if(typeof obj1 === 'undefined') continue;
    //     // if (obj1 instanceof Bullet && obj2 instanceof Gunner) continue;
    //     // if (obj1 instanceof Gunner && obj2 instanceof Gunner) continue;
    //     if (obj1.hasCollidedWith(obj2)) { //&& !(obj2 instanceof Missile)) {
    //       if (obj1 instanceof Missile && obj2 instanceof Bullet) {
    //         console.log('COLLIDE')
    //         obj1.exploded = true;
    //         obj2.exploded = true;
    //         this.explodedObjects.push(obj1)
    //         this.explodedObjects.push(obj2)
    //         allObjects.splice(allObjects.indexOf(obj1),1)
    //         allObjects.splice(allObjects.indexOf(obj2),1)
    //       } else if (obj1 instanceof Missile) {
    //         obj1.exploded = true;
    //         this.explodedObjects.push(obj1)
    //         allObjects.splice(allObjects.indexOf(obj1),1)
    //       }
    //     }
    //   }
    // }
    let missiles = this.missiles
    debugger
    let bullets = this.bullets
    for (let i = 0; i < missiles.length; i++) {
      for (let j = 0; j < bullets.length; j++) {
        // if (i === j) continue;
        const missile = missiles[i];
        const bullet = bullets[j];
        debugger
        if (missile.hasCollidedWith(bullet)){
          console.log('COLLIDE')
          debugger
          missile.exploded = true;
          bullet.exploded = true;
          this.explodedObjects.push(missile)
          this.explodedObjects.push(bullet)
          missiles.splice(missiles.indexOf(missile),1)
          bullets.splice(bullets.indexOf(bullet),1)
          return
        }
      }
    }
    if (this.missiles.length === 0) return;
    let missiles2 = this.missiles
    let gunners = [this.gunner1]
    for (let i = 0; i < missiles.length; i++) {
      for (let j = 0; j < gunners.length; j++) {
        // if (i === j) continue;
        const missile = missiles2[i];
        const gunner = gunners[j];
        if (missile.hasCollidedWith(gunner)){
          console.log('COLLIDE')
          missile.exploded = true;
          gunner.exploded = true;
          this.explodedObjects.push(missile)
          this.explodedObjects.push(gunner)
          missiles.splice(missiles2.indexOf(missile),1)
          // gunners.splice(defenders.indexOf(obj2),1)
        }
      }
    }
        // console.log(obj2)
        // if(typeof obj1 === 'undefined') continue;
        // if (obj1 instanceof Bullet && obj2 instanceof Gunner) continue;
        // if (obj1 instanceof Gunner && obj2 instanceof Gunner) continue;
      //   if (obj1.hasCollidedWith(obj2)) { //&& !(obj2 instanceof Missile)) {
      //     if (obj1 instanceof Missile && obj2 instanceof Bullet) {
      //       console.log('COLLIDE')
      //       obj1.exploded = true;
      //       obj2.exploded = true;
      //       this.explodedObjects.push(obj1)
      //       this.explodedObjects.push(obj2)
      //       allObjects.splice(allObjects.indexOf(obj1),1)
      //       allObjects.splice(allObjects.indexOf(obj2),1)
      //     } else if (obj1 instanceof Missile) {
      //       obj1.exploded = true;
      //       this.explodedObjects.push(obj1)
      //       allObjects.splice(allObjects.indexOf(obj1),1)
      //     }
      //   }
      // }
    }



  renderFrame() {
    this.ctx.clearRect(0,0, 600, 500)
    this.createGround()
    this.gunner1.draw()
    this.bullets.forEach(bullet => {
      if (bullet.xPos < 0 || bullet.xPos > 600 || bullet.yPos > 500 || bullet.yPos < 0  ){
        this.bullets.splice(this.bullets.indexOf(bullet),1)
      }
    })
    // if (this.bullets !== undefined){
    //   this.allObjects.concat(this.bullets)
    // }
    let allObjects = this.bullets.concat(this.missiles)
    // this.allObjects
    allObjects.forEach((object) => {
        // if (!object.collided) {
            object.move();
        // }
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
