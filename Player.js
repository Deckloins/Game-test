// Player.js
class Player {
	constructor(size, speed) {
    this.x = 5;
		this.y = 5;
		this.size = size;
		this.speed = speed;
	}

	move() {
		if (keyIsDown(UP_ARROW) && this.y > 0) {
			this.y -= this.speed;
		} else if (keyIsDown(DOWN_ARROW) && this.y + this.size < height) {
			this.y += this.speed;
		} else if (keyIsDown(LEFT_ARROW) && this.x > 0) {
			this.x -= this.speed;
		} else if (keyIsDown(RIGHT_ARROW) && this.x + this.size < width) {
			this.x += this.speed;
		}
	}

	didMove(gamePanel) {
		return !(this.x === 5 && this.y === 5 && gamePanel.timeLeft === 10);
	}

	show() {
		noStroke();
		fill(72, 125, 178);
		square(this.x, this.y, this.size);
	}
}
