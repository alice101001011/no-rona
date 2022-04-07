class Player {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = null;
    this.width = 50;
    this.height = 50;
    this.x = 0;
    this.y = this.canvas.height - this.height;
    this.playerSpeed = 15;
    this.health = 5;
    this.init();
  }

init() {
  this.image = new Image();
  this.image.src = "assets/player.png";
}

  draw() {
    if (this.image) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= this.playerSpeed;
    }
  }

  moveRight() {
    if (this.x < this.canvas.width - this.width) {
      this.x += this.playerSpeed;
    }
  }

  moveUp() {
    if (this.y > 0) {
      this.y -= this.playerSpeed;
    }
  }
  moveDown() {
    if (this.y < this.canvas.height - this.height) {
      this.y += this.playerSpeed;
    }
  }

  drawDamagePoint() {
    this.ctx.fillStyle = "red";
    this.ctx.font = "10px Courier New";
    this.ctx.fillText("-1 health", this.x, this.y - 10);
  }

  drawHealthPoint() {
    this.ctx.fillStyle = "red";
    this.ctx.font = "10px Courier New";
    this.ctx.fillText("+1 health", this.x, this.y - 10);
  }


  
}
