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
    this.gameOver.bind(this);
    this.checkCanvas = this.checkCanvas.bind(this)
    this.missiles = this.createMissiles(5);
    this.createMissiles(5)
    this.createCities();
    this.gunner1 = new Gunner(300, 447, 20, this.ctx)
    this.bullets = [];
    this.checkCollision = this.checkCollision.bind(this)
    this.explodedObjects = [];
    setInterval(() =>{
      this.explodedObjects = [];
      console.log('clear explodedObjects')
    }, 2000 )
    this.click = this.click.bind(this);
    this.triggerGun = this.triggerGun.bind(this);
    this.click();
    this.destroyedCityCount = [];
    this.gunnerLives = 3
    this.missileCount = this.missiles.length
    this.requestId;
    this.gameFinished = false;
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
    let bullet = this.gunner1.shoot(xEnd, yEnd)
    this.bullets.push(bullet);
  }

  // gameGunners(){
  //   return [this.gunner1] //this.gunner2, this.gunner3]
  // }

  createMissiles(num){
    this.missiles = [];
    let speeds = [.5, .7, 1, 1.2, 1.5]
    let angles = [ 65, 70, 80, 75, 73, 68, 85, 88, 90] //110, 105, 116, 111, 120]
    let xPositions = [100, 150, 200, 250, 300, 400]// this.canvas.width/3, this.canvas.width/4.2]
    for (let i = 0; i < num; i++){
      let angle = angles[Math.floor(Math.random() * angles.length)];
      let xPos = xPositions[Math.floor(Math.random() * xPositions.length)];
      let speed = speeds[Math.floor(Math.random() * speeds.length)];
      let missile = new Missile(this.ctx, xPos, angle, speed);
      this.missiles.push(missile)
    }
    return this.missiles
    // var missile = new Missile(this.ctx, 10, 90, 2)
    // var missile1 = new Missile(this.ctx, 110, 90, 1.5)
    // var missile2 = new Missile(this.ctx, 210, 90, 1.7)
    // var missile3 = new Missile(this.ctx, 350, 90, 1.7)
    // var missile4 = new Missile(this.ctx, 410, 40, 1.7)
    // var missile5 = new Missile(this.ctx, 510, 90, 1.7)
    // return this.missiles = [missile4]// missile1, missile2, missile3, missile4, missile5]
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

  // clearObject(object){
  //   let that = this
  //   setTimeout(() => {
  //     debugger
  //     that.explodedObjects.splice(that.explodedObjects.indexOf(object))
  //     console.log('oh yea')
  //     debugger
  //   }, 1000);
  // }

  // checkExplosion(){
  //   this.explodedObjects.forEach((object) => {
  //     this.clearObject(object)
  //   })
  // }

  checkCollision(){
    let missiles = this.missiles
    let explodedBullets = this.explodedObjects.filter((object) => object.constructor.name === 'Bullet')
    let bullets = this.bullets.concat(explodedBullets)
    for (let i = 0; i < missiles.length; i++) {
      for (let j = 0; j < bullets.length; j++) {
        const missile = missiles[i];
        const bullet = bullets[j];
        if (missile.hasCollidedWith(bullet)){
          console.log('COLLIDE')
          // debugger
          missile.exploded = true;
          bullet.exploded = true;
          this.explodedObjects.push(missile)
          this.explodedObjects.push(bullet)
          this.missileCount--;
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
        const missile = missiles2[i];
        const gunner = gunners[j];
        if (missile.hasCollidedWith(gunner)){
          console.log('COLLIDE')
          missile.exploded = true;
          gunner.exploded = true;
          this.gunnerLives--;
          this.missileCount--;
          // debugger
          this.explodedObjects.push(missile)
          this.explodedObjects.push(gunner)
          missiles.splice(missiles2.indexOf(missile),1)
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
        if ( (missile.yPos > 450) && ( (missile.xPos >= city.xStart) &&
           (missile.xPos <= city.xStart + 100) ) ){
          missile.exploded = true;
          city.exploded = true;
          this.missileCount--;
          if (!this.destroyedCityCount.includes(city)) this.destroyedCityCount.push(city);
          this.explodedObjects.push(missile);
          this.missiles.splice(this.missiles.indexOf(missile),1)
          return
        }
      }
     }
    }

  checkCanvas(){
    this.missiles.forEach( obj => {
      if (obj.xPos < 0 || obj.xPos > 600 || obj.yPos > 500 || obj.yPos < 0  ){
        debugger
        this.missileCount --;
      }
    })
  }

  renderFrame() {
    if(this.gameFinished) return window.cancelAnimationFrame(this.requestId);
    this.ctx.clearRect(0,0, 600, 500)
    this.gunner1.draw()
    this.checkCanvas();
    this.bullets.forEach(bullet => {
      debugger
      if (bullet.yPos <= bullet.yEnd || bullet.exploded){
        debugger
        bullet.exploded = true;
        if (!this.explodedObjects.includes(bullet)) {
          debugger
          this.explodedObjects.push(bullet);
          this.bullets.splice(this.bullets.indexOf(bullet),1)
        }
        this.bullets.splice(this.bullets.indexOf(bullet),1)
      }
    })
    this.cities.forEach(city => {
      city.draw();
    })

    let allObjects = this.bullets.concat(this.missiles)
    debugger
    allObjects.forEach((object) => {
            object.move();
        });
    if (this.explodedObjects.length !== 0){
      this.explodedObjects.forEach((object) => object.draw())
    }
    this.checkCollision();
    this.gameOver();
    this.newLevel();
    this.requestId = requestAnimationFrame(this.renderFrame);
  }

  gameOver(){
    if (this.gunnerLives === 0 || this.destroyedCityCount.length === 6){
      console.log('gameOver')
      $('.end-screen').show()
      this.gameFinished = true
      var that = this
      key('space', () => {
        document.location.reload()
      })
    }
  }

  newLevel(){
    if (this.missileCount === 0 && !this.gameFinished ){
      this.missileCount = 5
      return this.createMissiles(5)
    }
  }

  play(){
    this.renderFrame();
  }
}

export default Game;
