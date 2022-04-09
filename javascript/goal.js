class Goal {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = 20;
    this.height = 100;
    this.level = level;
    this.x = this.canvas.width - this.width;
    this.y = 0;
    this.levelWon = true;
  }

  draw() {
    this.ctx.fillStyle = "#32e49f";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
