class Booster {
  constructor(canvas, ctx, level) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = null;
    this.width = 40;
    this.height = 40;
    this.level = level;
    this.x = this.randomXposition();
    this.y = this.randomYposition();
    this.healthPlus = 1;
    this.init();
  }

  //randomStartingPoint() {}

  init() {
    this.image = new Image();
    this.image.src = "assets/booster.svg";
  }

  draw() {
    if (this.image) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  randomXposition() {
    let randomX = Math.floor(Math.random() * (this.canvas.width - this.width)) ;
    return randomX;
  }

  randomYposition() {
    let randomY = Math.floor(Math.random() * (this.canvas.height - this.height)) ;
    return randomY;
  }
}