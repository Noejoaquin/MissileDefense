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
    this.createMissiles(5)
    this.createCities();
    this.gunner1 = new Gunner(263, 420, this.ctx)
    this.bullets = [];
    this.checkCollision = this.checkCollision.bind(this)
    this.explodedObjects = [];
    this.click = this.click.bind(this);
    this.triggerGun = this.triggerGun.bind(this);
    this.click();
    this.destroyedCityCount = [];
    this.gunnerLives = 3
    this.missileCount = 5
    this.requestId;
    this.gameFinished = false;
    this.points = 0;
    this.gameFinishedMusic = new Audio(['assets/sound/Chopin - Nocturne op.9 No.2.mp3'])
    this.mute = this.mute.bind(this)
    this.unmute = this.unmute.bind(this)
    this.muted;
    this.createRightMissiles = this.createRightMissiles.bind(this)
    this.createLeftMissiles = this.createLeftMissiles.bind(this)
    this.reset = this.reset.bind(this)
  }

  reset(){
   this.createMissiles(5)
   this.createCities();
   this.bullets = [];
   this.explodedObjects = [];
   this.destroyedCityCount = [];
   this.gunnerLives = 3
   this.missileCount = 5
   this.gameFinished = false;
   this.points = 0;
  }

  mute(){
    let allObjects = this.missiles.concat(this.cities).concat(this.bullets).concat(this.gunner1)
    allObjects.forEach(obj => obj.mute())
    this.muted = true;
  }

  unmute(){
    let allObjects = this.missiles.concat(this.cities).concat(this.bullets).concat(this.gunner1)
    allObjects.forEach(obj => obj.playSound())
    this.muted = false;
  }

  updateStats(){
    document.getElementById('gunner-lives').innerHTML = `Gunner Lives Remaining: ${this.gunnerLives}`
    document.getElementById('points').innerHTML = `Points: ${this.points}`
    document.getElementById('cities').innerHTML = `Cities Remaining: ${6 - this.destroyedCityCount.length}`
  }


  click(){
    let that = this
    var pos = [];
    that.canvas.onclick = function(e) {
      let yEnd = e.offsetY
      let xEnd = e.offsetX
      that.triggerGun(xEnd, yEnd)

      that.gunner1.shootSound.load()
      that.gunner1.shootSound.play()
    }
  }

  triggerGun(xEnd, yEnd){
    let bullet = this.gunner1.shoot(xEnd, yEnd)
    this.bullets.push(bullet);
  }

  createLeftMissiles(num){
    let leftMissiles = [];
    let speeds = [1.2, 1.3, 1.4, 1.5, 1.7, 2, 2.2, 2.5, 2.7]
    let angles = [ 70, 80, 75, 73, 68, 85, 88, 90]
    let xPositions = [50, 75, 100, 120, 150, 200, 210, 250, 300, 400, 300]
    for (let i = 0; i < num; i++){
      let angle = angles[Math.floor(Math.random() * angles.length)];
      let xPos = xPositions[Math.floor(Math.random() * xPositions.length)];
      let speed = speeds[Math.floor(Math.random() * speeds.length)];
      let missile = new Missile(this.ctx, xPos, 0, angle, speed);
      leftMissiles.push(missile)
    }
    return leftMissiles
  }

  createRightMissiles(num){
    let rightMissiles = [];
    let speeds = [1.2, 1.3, 1.4, 1.5, 1.7, 1.8, 2, 2.2, 2.5, 2.7]
    let angles = [ 120, 115, 110, 105, 100, 95, 90]
    let xPositions = [550, 525, 575, 425, 450, 400, 350, 300, 425, 325]
    for (let i = 0; i < num; i++){
      let angle = angles[Math.floor(Math.random() * angles.length)];
      let xPos = xPositions[Math.floor(Math.random() * xPositions.length)];
      let speed = speeds[Math.floor(Math.random() * speeds.length)];
      let missile = new Missile(this.ctx, xPos, 0, angle, speed);
      rightMissiles.push(missile)
    }
    return rightMissiles
  }

  createMissiles(num){
    let leftNumber = num - 3
    let rightNumber = 3

    let rightMissiles = this.createRightMissiles(rightNumber)
    let leftMissiles = this.createLeftMissiles(leftNumber)
    return this.missiles = leftMissiles.concat(rightMissiles)
  }

  createCities(){
    let city1 = new City(0, 450, 100, 50, this.ctx)
    let city2 = new City(100, 450, 100, 50, this.ctx)
    let city3 = new City(200, 450, 100, 50, this.ctx)
    let city4 = new City(300, 450, 100, 50, this.ctx)
    let city5 = new City(400, 450, 100, 50, this.ctx)
    let city6 = new City(500, 450, 100, 50, this.ctx)
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
        //
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
          missile.explode();
          city.explode();
          missile.cityHit = true;
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
    this.updateStats();
    if (this.muted){

      this.mute();
    } else {

      this.unmute();
    }
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
    this.newLevel();
    this.requestId = requestAnimationFrame(this.renderFrame);
  }

  gameOver(){
    if (this.gunnerLives === 0 || this.destroyedCityCount.length === 6){
      $('.end-screen').show()
      $('.points').html(this.points)
      this.gameFinished = true;
      this.cities.forEach(city => city.stopSound())

      key('space', () => {
        $('.end-screen').hide()
        this.reset();
        this.play(this.ctx, this.canvas);
        key.unbind('space')
      })
    }
  }

  newLevel(){
    if (this.missileCount === 0 && !this.gameFinished ){
      let numOfMissilesArr = [4,5,6,7,8]
      let numOfMissiles = numOfMissilesArr[Math.floor(Math.random() * 4)]
      this.missileCount = numOfMissiles
      return this.createMissiles(numOfMissiles)
    }
  }

  play(){
    this.renderFrame();
  }
}

export default Game;
