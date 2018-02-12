class CollidableObject {
  constructor(ctx, xPos, yPos) {
    this.ctx = ctx;
    this.xPos = xPos;
    this.yPos = yPos;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.changePosition = this.changePosition.bind(this);
    this.move = this.move.bind(this);
    this.collided = false;
    this.exploded = false;
    this.timedOut = false;
    this.markedForClear = false;
    this.generalExplosion = new Image();
    this.generalExplosion.src = "assets/images/general_explosion_sprite.png";
    this.generalExplosionCountHoz = 0;
    this.generalExplosionCountVert = 0;
    this.generalExplosionClick = 0;
    this.explosion = new Audio([`assets/sound/explosion.wav`]);
    this.explosion.load();
    this.explosion.volume = 0.1;
  }
}
