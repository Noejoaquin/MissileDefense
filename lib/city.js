
class City {
  constructor(xStart, yStart, width, height, color, ctx){
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
    this.color = color;
    this.ctx = ctx;
    this.exploded = false;
    // this.image = new Image()
    // this.image.src = './assets/images/city_sprite_sheet.png'
  }


  draw(){
    if (!this.exploded){
      this.ctx.beginPath()
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.xStart, this.yStart, this.width, this.height)
      this.ctx.closePath();
      // this.ctx.drawImage(this.image, this.xStart, this.yStart, this.width, this.height)
    } else {
      this.ctx.beginPath()
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(this.xStart, this.yStart, this.width, this.height)
      this.ctx.closePath();
    }
  }
}

export default City;
