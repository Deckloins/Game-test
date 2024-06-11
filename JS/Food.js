// Food.js
class Food {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
	}

	isEat(player) {
		if (
			player.x + player.size > this.x &&
			player.x < this.x + this.size &&
			player.y + player.size > this.y &&
			player.y < this.y + this.size
		) {
			// Generate a new random position for the food
			// The food should not be generated inside the GamePanel or outside the canvas
			this.x = random(0, width - this.size);
			// 170 is the left X coordinate of the GamePanel
			this.y =
				this.x >= 300
					? random(170 + this.size, height - this.size)
					: random(0, height - this.size);
			return true;
		}
	}

	show() {
		fill(178, 125, 72);
		square(this.x, this.y, this.size);
	}
}
