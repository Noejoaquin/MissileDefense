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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);




document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas');
  // canvas.onclick = function(e) {
  //     console.log('clicked')
  //     debugger
  // }

  const ctx = canvas.getContext('2d');
  let game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctx, canvas);
  game.play();
})


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bullet__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__missile__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gunner__ = __webpack_require__(3);




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
    this.gameGunners = this.gameGunners.bind(this);
    // this.makeBullets = this.makeBullets.bind(this);
    this.allObjects = this.createMissiles().concat(this.gameGunners())//.concat(this.makeBullets())
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
      debugger
    }
  }

  triggerGun(xEnd, yEnd){
    // let endPos = this.click();
    this.bullet = this.gunner1.shoot(xEnd, yEnd)
    this.allObjects.push(this.bullet)
  }

  gameGunners(){
    return [this.gunner1] //this.gunner2, this.gunner3]
  }

  createMissiles(){
    var missile = new __WEBPACK_IMPORTED_MODULE_1__missile__["a" /* default */](this.ctx,this.canvas.width/2, 122);
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
    // this.gunner1 = new Gunner(20, 447, 10, this.ctx)
    // this.gunner1.draw()

      this.gunner1 = new __WEBPACK_IMPORTED_MODULE_2__gunner__["a" /* default */](300, 447, 10, this.ctx)
      this.gunner1.draw()
      //
      this.gunner3 = new __WEBPACK_IMPORTED_MODULE_2__gunner__["a" /* default */](580, 447, 10, this.ctx)
      this.gunner3.draw()
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
          if (obj1 instanceof __WEBPACK_IMPORTED_MODULE_1__missile__["a" /* default */] && obj2 instanceof __WEBPACK_IMPORTED_MODULE_0__bullet__["a" /* default */]) {
            console.log('COLLIDE')
            obj1.exploded = true;
            obj2.exploded = true;
            this.explodedObjects.push(obj1)
            this.explodedObjects.push(obj2)
            allObjects.splice(allObjects.indexOf(obj1),1)
            allObjects.splice(allObjects.indexOf(obj2),1)
          } else if (obj1 instanceof __WEBPACK_IMPORTED_MODULE_1__missile__["a" /* default */]) {
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
    if (this.bullets !== undefined){
      this.allObjects.concat(this.bullets)
    }
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
 // const MovingObject = require('./moving_object')

 class Missile {
  constructor(ctx, xPos, angle) {
  this.color = 'red';
  this.xPos = xPos
  this.originalAngle = angle;
  this.yPos = 0
  this.angle = this.originalAngle * Math.PI / 180
  this.speed = 1;
  this.radius = 4;
  this.vx = Math.cos(this.angle) * this.speed;
  this.vy = Math.sin(this.angle) * this.speed;
  this.draw = this.draw.bind(this);
  this.changePosition = this.changePosition.bind(this);
  this.move = this.move.bind(this);
  this.ctx = ctx;
  this.collided = false;
  this.exploded = false;
  }

  hasCollided() {
    this.collided = true;
  }

  draw() {
    if (!this.collided && !this.exploded){
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.arc(this.xPos,this.yPos,4, 0, 2 * Math.PI)
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (this.exploded) {
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
  }

  hasCollidedWith(otherObject){
    // if ((this.yPos + this.radius) <= (otherObject.yPos + otherObject.radius)) {
    //   return false;
    // }  else {
    //   return true;
    // }
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

/* harmony default export */ __webpack_exports__["a"] = (Missile);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bullet__ = __webpack_require__(4);
// import Bullet from './gunner'

class Gunner {
  constructor(xPos, yPos, radius, ctx){
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.ctx = ctx;
  }

  shoot(endPosX, endPosY ){
    let bullet = new __WEBPACK_IMPORTED_MODULE_0__bullet__["a" /* default */] (this.ctx, this.xPos, this.yPos, endPosX, endPosY)
    return bullet
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

/* harmony default export */ __webpack_exports__["a"] = (Gunner);


/***/ }),
/* 4 */
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
    // this.angle = Math.atan2(yEnd - yPos, xEnd - xPos) * 180 / Math.PI;
    console.log(this.angle)
    // this.angle = this.originalAngle * Math.PI / 180
    this.speed = 1;
    this.radius = 10;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.draw = this.draw.bind(this);
    this.changePosition = this.changePosition.bind(this);
    this.move = this.move.bind(this);
    this.ctx = ctx;
    this.collided = false;
    this.exploded = false;
  }

  hasCollided() {
    this.collided = true;
  }

  draw() {
    // ctx.clearRect(this.xPos, this.yPos, 4, 10)
    // this.ctx.fillStyle = this.color;
    if (!this.collided && !this.exploded){
      this.ctx.beginPath();
      this.ctx.fillStyle = 'green';
      this.ctx.arc(this.xPos,this.yPos, this.radius, 0, 2 * Math.PI)
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (this.exploded) {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'green'
      this.ctx.fillRect(this.xPos,this.yPos, 4, 10)
      this.ctx.closePath();
    }
  }

  exploded(){
    this.exploded = true;
  }

  changePosition() {
    this.yPos -= this.vy;
    this.xPos -= this.vx;
  }

  hasCollidedWith(otherObject){
      // if ((this.yPos + this.radius) <= (otherObject.yPos + otherObject.radius)) {
      //   return false;
      // }  else {
      //   return true;
      // }

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map