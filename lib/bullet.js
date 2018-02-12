class Bullet {
  constructor(ctx, xPos, yPos, xEnd, yEnd) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.angle = Math.atan2(yEnd - yPos, xEnd - xPos);
    this.angle = this.angle + 180 * Math.PI / 180;
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
    this.image.src = "assets/images/bullet_sprite.png";
    this.count = 0;
    this.internalCLick = 0;
    this.x = this.xPos - 5;
    this.y = this.yPos - 3;
    this.height = 10;
    this.width = 10;
    this.generalExplosion = new Image();
    this.generalExplosion.src = "assets/images/general_explosion_sprite.png";
    this.generalExplosionCountHoz = 0;
    this.generalExplosionCountVert = 0;
    this.generalExplosionClick = 0;
    this.explosionSound = new Audio([`assets/sound/explosion.wav`]);
    this.explosionSound.load();
    this.explosionSound.volume = 0.1;
  }

  mute() {
    this.explosionSound.muted = true;
  }

  playSound() {
    this.explosionSound.muted = false;
  }

  hasCollided() {
    this.collided = true;
  }

  explode() {
    this.exploded = true;
    if (!this.markedForClear) {
      this.x -= 15;
      this.y -= 15;
      this.explosionSound.play();
      this.markedForClear = true;
      setTimeout(() => {
        this.timedOut = true;
        this.radius = 0;
      }, 800);
    }
  }

  draw() {
    this.internalCLick += 2;
    if (!this.collided && !this.exploded) {
      this.ctx.drawImage(
        this.image,
        170,
        47,
        50,
        49,
        this.xPos - 5,
        this.yPos - 6,
        20,
        20
      );
    } else if (this.exploded) {
      this.height = 35;
      this.width = 35;
      this.generalExplosionClick += 5;
      if (this.generalExplosionClick % 25 === 0) {
        if (this.generalExplosionCountHoz === 390) {
          // this is the max width of sprite sheet
          this.generalExplosionCountHoz = 0;
          this.generalExplosionCountVert += 130; // sprite sheet is in sqs of 130 by 130
        } else if (
          this.generalExplosionCountHoz === 130 &&
          this.gunnerExplosionCountVert === 390
        ) {
          // for when we reach the end of the sprite sheet
          this.generalExplosionCountHoz = 0;
          this.generalExplosionCountVert = 0;
          this.generalHit = false;
        } else {
          this.generalExplosionCountHoz += 130;
        }
      }
      this.ctx.drawImage(
        this.generalExplosion,
        this.generalExplosionCountHoz,
        this.generalExplosionCountVert,
        100,
        100,
        this.x - 13,
        this.y - 15,
        50,
        50
      );
    }
  }

  changePosition() {
    this.yPos -= this.vy;
    this.xPos -= this.vx;
    this.x -= this.vx;
    this.y -= this.vy;
  }

  hasCollidedWith(otherObject) {
    let dx = this.xPos - otherObject.xPos;
    let dy = this.yPos - otherObject.yPos;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + otherObject.radius) {
      return true;
    } else {
      return false;
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

export default Bullet;
