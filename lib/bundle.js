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
  const ctx = canvas.getContext('2d');
  let game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctx, canvas);
  game.play();
})

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__missile__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gunner__ = __webpack_require__(4);



class Game {
  constructor(ctx, canvas){
    this.ctx = ctx;
    this.canvas = canvas; 
    this.renderFrame = this.renderFrame.bind(this)
    this.createBase = this.createBase.bind(this)    
    this.createMissiles = this.createMissiles.bind(this)
    this.createMissiles();
    this.createBase();
    this.gameGunners = this.gameGunners.bind(this)
    this.allObjects = this.gameGunners().concat(this.createMissiles());
    this.checkCollision = this.checkCollision.bind(this)
    this.explodedMissiles = [];
  }
  
  gameGunners(){
    return [this.gunner1, this.gunner2, this.gunner3]
  }
  
  createBase() {
      let ground = this.ctx.fillRect(0,450,600,50)
      this.gunner1 = new __WEBPACK_IMPORTED_MODULE_1__gunner__["a" /* default */](20, 447, 3, this.ctx)
      this.gunner1.draw()

      this.gunner2 = new __WEBPACK_IMPORTED_MODULE_1__gunner__["a" /* default */](300, 447, 3, this.ctx)
      this.gunner2.draw()
      
      this.gunner3 = new __WEBPACK_IMPORTED_MODULE_1__gunner__["a" /* default */](580, 447, 3, this.ctx)
      this.gunner3.draw()
  }
  
  
  
  checkCollision(){
    const allObjects = this.allObjects
    // debugger
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];
        if(typeof obj1 === 'undefined') continue;
        if (obj1.hasCollidedWith(obj2) && !(obj2 instanceof __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */])) {
          // debugger
          if (obj2 instanceof __WEBPACK_IMPORTED_MODULE_1__gunner__["a" /* default */]) {
            console.log('COLLIDE')
            obj1.exploded = true;
            this.explodedMissiles.push(obj1)
            allObjects.splice(allObjects.indexOf(obj1),1)
          }
        }
      }
    }
    
  }
  
  
  createMissiles(){
    var missile = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */](this.ctx,this.canvas.width/2, 122);
    var missile2 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */](this.ctx, this.canvas.width/3, 88);
    var missile3 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */](this.ctx, this.canvas.width/2, 80);
    var missile4 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */](this.ctx, this.canvas.width/2, 58);
    var missile5 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */](this.ctx, this.canvas.width/4.2, 60);
    return this.missiles = [missile, missile2, missile3, missile4, missile5]
  }
  
  renderFrame() {
    this.ctx.clearRect(0,0, 600, 500)
    this.createBase()
    this.allObjects
      this.allObjects.forEach((object) => {
        if (!object.collided) {
            object.move();
        } 
        });
    if (this.explodedMissiles.length !== 0){
      debugger
      this.explodedMissiles.forEach((missile) => missile.move())
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
/* 2 */,
/* 3 */
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
  this.fall = this.fall.bind(this);
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
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(this.xPos,this.yPos,4, 0, 2*Math.PI)
      this.ctx.stroke();
    } else if (this.exploded) {
      debugger
      this.ctx.fillStyle = this.color
      this.ctx.fillRect(this.xPos,this.yPos, 4, 10)
    }
  }
  
  exploded(){
    this.exploded = true;
  }

  fall() {
    this.yPos += this.vy;
    this.xPos += this.vx;
  }
  
  hasCollidedWith(otherObject){
    // if (((this.xPos + this.radius) < (otherObject.xPos + otherObject.radius)) && 
      if (((this.yPos + this.radius) <= (otherObject.yPos + otherObject.radius))) {
        return false;
      }  else {
        return true;
      }
  }

  move() {
    if (!this.exploded) {
      this.draw();
      this.fall();
    } else {
      debugger
      this.draw();
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Missile);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


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

/* harmony default export */ __webpack_exports__["a"] = (Gunner);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map