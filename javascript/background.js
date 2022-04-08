class Background {
	constructor(canvas, ctx, level) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.image = new Image();
		this.image.src = level.bgImg;
		this.y = 0;
		this.x = 0;
	}


	draw() {
			this.ctx.drawImage(
				this.image,
				this.x,
				this.y,
				this.canvas.width,
				this.canvas.height
			);
		}


	
	}
