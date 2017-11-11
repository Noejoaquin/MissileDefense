import Bullet from './bullet'
import Missile from './missile';
import Gunner from './gunner';
import City from './city';


class Game {
  constructor(ctx, canvas){
    this.ctx = ctx;
    this.canvas = canvas;
    this.renderFrame = this.renderFrame.bind(this)
    this.createMissiles = this.createMissiles.bind(this)
    this.createCities = this.createCities.bind(this)
    this.createMissiles();
    this.createCities();
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
    var missile = new Missile(this.ctx,this.canvas.width/2, 122);
    var missile2 = new Missile(this.ctx, this.canvas.width/3, 88);
    var missile3 = new Missile(this.ctx, this.canvas.width/2, 80);
    var missile4 = new Missile(this.ctx, this.canvas.width/2, 58);
    var missile5 = new Missile(this.ctx, this.canvas.width/4.2, 60);
    return this.missiles = [missile,  missile2, missile3, missile4, missile5]
  }

  createCities(){
    let city1 = new City(0,450,100,50,'yellow',this.ctx)
    let city2 = new City(100,450,100,50,'blue',this.ctx)
    let city3 = new City(200,450,100,50,'yellow',this.ctx)
    let city4 = new City(300,450,100,50,'blue',this.ctx)
    let city5 = new City(400,450,100,50,'yellow',this.ctx)
    let city6 = new City(500,450,100,50,'blue',this.ctx)
    return this.cities = [city1,city2, city3, city4, city5, city6]
  }



  checkCollision(){
    let missiles = this.missiles
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
    if (this.missiles.length === 0) return;
    let missiles3 = this.missiles
    let cities = this.cities
    for (let i = 0; i < missiles3.length; i++) {
      for (let j = 0; j < cities.length; j++) {
        const missile = missiles3[i];
        const city = cities[j];
        if ( (missile.yPos > 450) && ( (missile.xPos >= city.xStart) && (missile.xPos <= city.xStart + 100) ) ){
          debugger
          missile.exploded = true;
          city.exploded = true;
          this.explodedObjects.push(missile);
          this.missiles.splice(this.missiles.indexOf(missile),1)
          return
        }
      }
     }
    }




  renderFrame() {
    this.ctx.clearRect(0,0, 600, 500)
    this.gunner1.draw()
    this.bullets.forEach(bullet => {
      if (bullet.xPos < 0 || bullet.xPos > 600 || bullet.yPos > 500 || bullet.yPos < 0  ){
        this.bullets.splice(this.bullets.indexOf(bullet),1)
      }
    })
    this.cities.forEach(city => {
      city.draw();
    })

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
