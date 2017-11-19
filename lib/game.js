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
    this.updateStats.bind(this);
    this.checkCanvas = this.checkCanvas.bind(this)
    this.missiles = this.createMissiles(5);
    this.createMissiles(5)
    this.createCities();
    this.gunner1 = new Gunner(300, 447, 20, this.ctx)
    this.bullets = [];
    this.checkCollision = this.checkCollision.bind(this)
    this.explodedObjects = [];
    this.click = this.click.bind(this);
    this.triggerGun = this.triggerGun.bind(this);
    this.click();
    this.destroyedCityCount = [];
    this.gunnerLives = 3
    this.missileCount = this.missiles.length
    this.requestId;
    this.gameFinished = false;
    this.points = 0;
  }

  updateStats(){
    document.getElementById('gunner-lives').innerHTML = `Gunner Lives Remaining: ${this.gunnerLives}`
    document.getElementById('points').innerHTML = `Points:${this.points}`
    document.getElementById('cities').innerHTML = `Cities Remaining: ${6 - this.destroyedCityCount.length}`
  }


  click(){
    let that = this
    var pos = [];
    that.canvas.onclick = function(e) {
      let yEnd = e.offsetY
      let xEnd = e.offsetX
      that.triggerGun(xEnd, yEnd)
    }
  }

  triggerGun(xEnd, yEnd){
    let bullet = this.gunner1.shoot(xEnd, yEnd)
    this.bullets.push(bullet);
  }

  createMissiles(num){
    // this.missiles = [];
    // let speeds = [3]//[.5, .7, 1, 1.2, 1.5, 2]
    // let angles = [ 65, 70, 80, 75, 73, 68, 85, 88, 90]
    // let xPositions = [100, 150, 200, 210, 250, 300, 400, 300, 300 ]
    // for (let i = 0; i < num; i++){
    //   let angle = angles[Math.floor(Math.random() * angles.length)];
    //   let xPos = xPositions[Math.floor(Math.random() * xPositions.length)];
    //   let speed = speeds[Math.floor(Math.random() * speeds.length)];
    //   let missile = new Missile(this.ctx, xPos, angle, speed);
    //   this.missiles.push(missile)
    // }
    return this.missiles = [new Missile(this.ctx, 300, 90, 4 )]
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
    let explodedBullets = this.explodedObjects.filter((object) => object.constructor.name === 'Bullet')
    let bullets = this.bullets.concat(explodedBullets)
    for (let i = 0; i < missiles.length; i++) {
      for (let j = 0; j < bullets.length; j++) {
        const missile = missiles[i];
        const bullet = bullets[j];
        if (missile.hasCollidedWith(bullet)){
          missile.explode();
          missile.generalHit = true;
          bullet.explode();
          this.explodedObjects.push(missile)
          this.explodedObjects.push(bullet)
          this.missileCount--;
          this.points = this.points + 10
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
          missile.explode();
          missile.generalHit = true;
          this.gunnerLives--;
          this.missileCount--;
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
          // missile.explode();
          missile.cityHit = true;
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
        this.missileCount --;
        this.missiles.splice(this.missiles.indexOf(obj),1)
      }
    })
  }

  renderFrame() {
    this.updateStats()
    if(this.gameFinished) return window.cancelAnimationFrame(this.requestId);
    this.ctx.clearRect(0,0, 600, 500)
    this.gunner1.draw()
    this.checkCanvas();
    this.bullets.forEach(bullet => {
      if (bullet.yPos <= bullet.yEnd || bullet.exploded){
        bullet.explode();
        if (!this.explodedObjects.includes(bullet)) {
          this.explodedObjects.push(bullet);
          this.bullets.splice(this.bullets.indexOf(bullet),1)
        }
      }
    })
    this.cities.forEach(city => {
      city.draw();
    })

    let allObjects = this.bullets.concat(this.missiles)
    allObjects.forEach((object) => {
            object.move();
        });
    if (this.explodedObjects.length !== 0){
      for (let i=0; i < this.explodedObjects.length; i++){
        if (this.explodedObjects[i].timedOut){
          this.explodedObjects.splice(i,1)
          continue;
        }
        this.explodedObjects[i].draw();
      }
    }
    this.checkCollision();
    this.gameOver();
    // this.newLevel();
    this.requestId = requestAnimationFrame(this.renderFrame);
  }

  gameOver(){
    if (this.gunnerLives === 0 || this.destroyedCityCount.length === 6){
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
