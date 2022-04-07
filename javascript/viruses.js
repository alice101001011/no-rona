class Virus {
  constructor(canvas, ctx, level) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.level = level;
    this.image = new Image();
    this.image.src = "assets/virus-small.png";
    this.width = 50;
    this.height = 50;
    this.x = this.randomXposition();
    this.y = this.randomYposition();
    this.xSpeed = level.virusXspeed;
    this.ySpeed = -this.xSpeed;
    this.damage = 1;
  }

  randomStartingPoint() {}

  draw() {
    if (this.image) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  randomXposition() {
    let randomX = Math.floor(Math.random() * (this.canvas.width - this.width));
    return randomX;
  }

  randomYposition() {
    let randomY = Math.floor(
      Math.random() * (this.canvas.height - this.height)
    );
    return randomY;
  }
}
