/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Bullet {
  constructor(ctx, xPos, yPos, xEnd, yEnd){
    this.xPos = xPos;
    this.yPos= yPos;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.angle = Math.atan2(yEnd - yPos, xEnd - xPos)
    this.angle = this.angle + ((180 * Math.PI) / 180)
    this.speed = 3;
    this.radius = 3;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.draw = this.draw.bind(this);
    this.changePosition = this.changePosition.bind(this);
    this.move = this.move.bind(this);
    this.ctx = ctx;
    this.collided = false;
    this.exploded = false;
    this.timedOut = false;
    this.markedForClear = false;
    this.image = new Image();
    this.image.src = 'assets/images/bullet_sprite.png'
    this.count = 0;
    this.internalCLick = 0;
    this.x = this.xPos - 5;
    this.y = this.yPos - 3;
    this.height = 10;
    this.width = 10;
    this.generalExplosion = new Image()
    this.generalExplosion.src = 'assets/images/general_explosion_sprite.png'
    this.generalExplosionCountHoz = 0;
    this.generalExplosionCountVert = 0;
    this.generalExplosionClick = 0;
  }

  hasCollided() {
    this.collided = true;
  }

  explode() {
    this.exploded = true;
    if (!this.markedForClear){
      this.x -= 15;
      this.y -= 15;
      this.markedForClear = true;
      setTimeout(() => {
        this.timedOut = true
        this.radius = 0;}, 800)
    }
  }

  draw() {
    this.internalCLick += 2;
    if (!this.collided && !this.exploded){
      this.ctx.drawImage(this.image, 170, 47, 50, 49, this.xPos-5, this.yPos-6, 20, 20);
    } else if (this.exploded) {
      this.height = 35;
      this.width = 35;
      this.generalExplosionClick += 5
      if (this.generalExplosionClick % 25 === 0){
        if (this.generalExplosionCountHoz === 390){ // this is the max width of sprite sheet
          this.generalExplosionCountHoz = 0;
          this.generalExplosionCountVert += 130; // sprite sheet is in sqs of 130 by 130
        } else if (this.generalExplosionCountHoz === 130 && this.gunnerExplosionCountVert === 390){ // for when we reach the end of the sprite sheet
          this.generalExplosionCountHoz = 0;
          this.generalExplosionCountVert = 0;
          this.generalHit = false;
        } else {
          this.generalExplosionCountHoz += 130;
        }
      }
      this.ctx.drawImage(this.generalExplosion, this.generalExplosionCountHoz, this.generalExplosionCountVert, 100, 100, this.x-13, this.y-15, 50, 50)
    }
  }

  changePosition() {
    this.yPos -= this.vy;
    this.xPos -= this.vx;
    this.x -= this.vx;
    this.y -= this.vy;
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

  move() {
    if (!this.exploded) {
      this.draw();
      this.changePosition();
    } else {
      this.draw();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Bullet);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);




document.addEventListener('DOMContentLoaded', () => {
  $('.end-screen').hide()
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctx, canvas);
    document.addEventListener('keypress', (e) => {
      $('.start-screen').hide();
        game.play(ctx, canvas);
    })
})


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bullet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__missile__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gunner__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__city__ = __webpack_require__(5);






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
    this.gunner1 = new __WEBPACK_IMPORTED_MODULE_2__gunner__["a" /* default */](263, 420, this.ctx)
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
    // let speeds = [1, 1.2, 1.5, 2]
    // let angles = [ 65, 70, 80, 75, 73, 68, 85, 88, 90]
    // let xPositions = [50, 75, 100, 120, 150, 200, 210, 250, 300, 400, 300]
    // for (let i = 0; i < num; i++){
    //   let angle = angles[Math.floor(Math.random() * angles.length)];
    //   let xPos = xPositions[Math.floor(Math.random() * xPositions.length)];
    //   let speed = speeds[Math.floor(Math.random() * speeds.length)];
    //   let missile = new Missile(this.ctx, xPos, angle, speed);
    //   this.missiles.push(missile)
    // }
    return this.missiles = [new __WEBPACK_IMPORTED_MODULE_1__missile__["a" /* default */](this.ctx, 333, 90, 1 )]// new Missile(this.ctx, 295, 90, 1 ), new Missile(this.ctx, 290, 90, 1 )]
  }

  createCities(){
    let city1 = new __WEBPACK_IMPORTED_MODULE_3__city__["a" /* default */](0, 450, 100, 50, this.ctx)
    let city2 = new __WEBPACK_IMPORTED_MODULE_3__city__["a" /* default */](100, 450, 100, 50, this.ctx)
    let city3 = new __WEBPACK_IMPORTED_MODULE_3__city__["a" /* default */](200, 450, 100, 50, this.ctx)
    let city4 = new __WEBPACK_IMPORTED_MODULE_3__city__["a" /* default */](300, 450, 100, 50, this.ctx)
    let city5 = new __WEBPACK_IMPORTED_MODULE_3__city__["a" /* default */](400, 450, 100, 50, this.ctx)
    let city6 = new __WEBPACK_IMPORTED_MODULE_3__city__["a" /* default */](500, 450, 100, 50, this.ctx)
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
        // debugger
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
 // const MovingObject = require('./moving_object')

 class Missile {
  constructor(ctx, xPos, angle, speed) {
  this.color = 'green';
  this.xPos = xPos
  this.originalAngle = angle;
  this.yPos = 0
  this.angle = this.originalAngle * Math.PI / 180
  this.speed = speed;
  this.radius = 4;
  this.vx = Math.cos(this.angle) * this.speed;
  this.vy = Math.sin(this.angle) * this.speed;
  this.draw = this.draw.bind(this);
  this.changePosition = this.changePosition.bind(this);
  this.move = this.move.bind(this);
  this.ctx = ctx;
  this.collided = false;
  this.exploded = false;
  this.timedOut = false;
  this.markedForClear = false;
  this.regularMissile = new Image();
  this.regularMissile.src = 'assets/images/missile_sprite.png'
  this.cityHit = false;
  this.cityExplosion = new Image()
  this.cityExplosion.src = 'assets/images/explosion-sprite.png'
  this.cityExplosionCount = 0;
  this.cityExplosionClick = 0;
  this.generalHit = 0;
  this.generalExplosion = new Image()
  this.generalExplosion.src = 'assets/images/general_explosion_sprite.png'
  this.generalExplosionCountHoz = 0;
  this.generalExplosionCountVert = 0;
  this.generalExplosionClick = 0;
  this.x = this.xPos - 8;
  this.y = this.yPos - 50;
  this.width = 15;
  this.height = 50;
  this.createAngles = this.createAngles.bind(this);
  this.trueCollision = this.trueCollision.bind(this);
  }

  hasCollided() {
    this.collided = true;
  }

  explode() {
    this.exploded = true;
    if (!this.markedForClear){
      this.markedForClear = true;
      setTimeout(() => this.timedOut = true, 500)
    }
  }

  draw() {
    if (this.cityHit){
      this.cityExplosionClick += 2
      if (this.cityExplosionClick % 20 === 0) {
          this.cityExplosionCount += 95;
      }
      this.ctx.drawImage(this.cityExplosion, this.cityExplosionCount, 100, 90, 100, this.xPos-30, this.yPos-40, 60, 50);
    } else if (this.generalHit) { // (!this.collided && !this.exploded){
      this.generalExplosionClick += 5
      if (this.generalExplosionClick % 10 === 0){
        if (this.generalExplosionCountHoz === 390){ // this is the max width of sprite sheet
          this.generalExplosionCountHoz = 0;
          this.generalExplosionCountVert += 130; // sprite sheet is in sqs of 130 by 130
        } else if (this.generalExplosionCountHoz === 130 && this.gunnerExplosionCountVert === 390){ // for when we reach the end of the sprite sheet
          this.generalExplosionCountHoz = 0;
          this.generalExplosionCountVert = 0;
          this.generalHit = false;
        } else {
          this.generalExplosionCountHoz += 130;
        }
      }
      this.ctx.drawImage(this.generalExplosion, this.generalExplosionCountHoz, this.generalExplosionCountVert, 100, 100, this.xPos-30, this.yPos-35, 50, 50)

    } else if (!this.collided && !this.exploded){        // this.ctx.beginPath();
        // this.ctx.fillStyle = this.color;
        // this.ctx.arc(this.xPos,this.yPos,4, 0, 2 * Math.PI)
        // this.ctx.fill();
        // this.ctx.stroke();
        // this.ctx.closePath();
        // this.ctx.beginPath();
        // this.ctx.fillStyle = this.color
        // this.ctx.fillRect(this.xPos-8,this.yPos-50, 15, 50) //must adjust to make rectangle fall over image
        // this.ctx.closePath();
        this.ctx.drawImage(this.regularMissile, 0, 0, 90, 120, this.xPos-50, this.yPos-50, 60, 50 ) //adjusts image to have tip be at at xpos,ypos
    }
    else if (this.exploded && !this.timedOut) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color
      this.ctx.fillRect(this.xPos,this.yPos, 4, 10)
      this.ctx.closePath();
    }
  }

  exploded(){
    this.exploded = true;
  }

  changePosition() {
    this.yPos += this.vy;
    this.xPos += this.vx;
    this.x += this.vx;
    this.y += this.vy;
  }

  createAngles(xPos, yPos, height, width){
    let leftSideAngles = [[xPos, yPos + height],[xPos, yPos + height/3], [xPos, yPos + height/2]]
    let topAngles = [[xPos, yPos], [xPos + width/4, yPos], [xPos + width/3, yPos], [xPos + width/2, yPos]]
    let rightSideAngles = [[xPos + width, yPos], [xPos + width, yPos + height/4],[xPos + width, yPos + height /2]]
    let bottomAngles = [[xPos + width, yPos + height], [xPos + width/2, yPos + height], [xPos + width/4, yPos + height]]
    return leftSideAngles.concat(topAngles).concat(rightSideAngles).concat(bottomAngles)
  }

  xCheck(coord, otherObject){
    if (coord[0] > otherObject.x && coord[0] < otherObject.x + otherObject.width){
      return true
    } else {
      return false
    }
  }

  yCheck(coord, otherObject){
    if (coord[1] > otherObject.y && coord[1] < otherObject.y + otherObject.height){
      return true
    } else {
      return false
    }
  }

  trueCollision(coord, otherObject){
    if (this.xCheck(coord, otherObject) && this.yCheck(coord, otherObject)) {
      return true;
    } else {
      return false
    }
  }

  hasCollidedWith(otherObject){
    let angles = this.createAngles(this.x, this.y, 50, 15)
    for (let i = 0; i < angles.length; i++){
      if (this.trueCollision(angles[i], otherObject)){
        return true
      }
    }
    return false
  }

  move() {
    if (!this.exploded) {
      this.draw();
      this.changePosition();
    } else {
      this.draw();
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Missile);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bullet__ = __webpack_require__(0);
// import Bullet from './gunner'

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
  }

  shoot(endPosX, endPosY ){
      let bullet = new __WEBPACK_IMPORTED_MODULE_0__bullet__["a" /* default */] (this.ctx, this.x + 30, this.y + 15, endPosX, endPosY)
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

/* harmony default export */ __webpack_exports__["a"] = (Gunner);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class City {
  constructor(xStart, yStart, width, height, ctx){
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.exploded = false;
    this.image = new Image()
    this.image.src = './assets/images/city_pic.jpg'
  }


  draw(){
    if (!this.exploded){
      this.ctx.drawImage(this.image, this.xStart, this.yStart, this.width, this.height)
    } else {
      this.image.src = './assets/images/burning_city.jpg'
      this.ctx.drawImage(this.image, this.xStart, this.yStart, this.width, this.height)
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (City);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map