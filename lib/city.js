
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
    this.flame = new Image();
    this.flame.src = './assets/images/flame_sprite.png'
    this.generalExplosionCountHoz = 10;
    this.generalExplosionCountVert = 55;
    this.generalExplosionClick = 0;
    this.burningSound = new Audio(['assets/sound/firesound.wav'])
    this.burningSound.load();
    this.startSound = this.startSound.bind(this);
    this.markedForClear = false;
    this.stopSound = this.stopSound.bind(this)
  }

  stopSound(){
    this.burningSound.volume = 0.0;
  }

  explode() {
    this.exploded = true;
    this.startSound()
  }

  startSound(){
    this.burningSound.loop = true;
    this.burningSound.play();
  }


  draw(){
    if (!this.exploded){
      this.ctx.drawImage(this.image, this.xStart, this.yStart, this.width, this.height)
    } else {
      this.generalExplosionClick += 5
      if (this.generalExplosionClick % 65 === 0){
        if (this.generalExplosionCountHoz === 465){ // this is the max width of sprite sheet
          this.generalExplosionCountHoz = 10;
          this.generalExplosionCountVert += 130; // sprite sheet is in sqs of 130 by 130
        } else if (this.generalExplosionCountHoz === 660 && this.gunnerExplosionCountVert === 465){ // for when we reach the end of the sprite sheet
          this.generalExplosionCountHoz = 10;
          this.generalExplosionCountVert = 55;
        } else {
          this.generalExplosionCountHoz += 65;
        }
      }
      this.ctx.drawImage(this.image, this.xStart, this.yStart, this.width, this.height)
      this.ctx.drawImage(this.flame, this.generalExplosionCountHoz, 55, 60, 100, this.xStart, this.yStart, 50, 100)
      this.ctx.drawImage(this.flame, this.generalExplosionCountHoz, 55, 60, 100, this.xStart+50, this.yStart, 50, 100)
    }
  }

}

export default City;
