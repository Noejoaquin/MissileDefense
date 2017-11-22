
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

export default City;
