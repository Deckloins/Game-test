// GamePanel.js
class GamePanel {
	constructor(player, food) {
		this.player = player;
		this.food = food;
		this.score = 0;
		this.timeLeft = 10;
		this.scorePosition = 340;
	}

	update() {
		this.player.move();
		if (this.food.isEat(this.player)) {
			this.score++;
			this.timeLeft = 10;
		}

		if (this.player.didMove(this) && !this.gameOver()) {
			this.timeLeft -= 1 / 60;
		}
	}

	gameOver() {
		if (this.timeLeft <= 0) {
			this.score = 0;
			this.timeLeft = 0;
			return true;
		}
		return false;
	}

	draw() {
		background(100);
		this.player.show();
		this.food.show();

		fill(255);
		textSize(25);
		text("Score :", 300, 30);
		text("Timer :", 300, 120);
		textSize(50);

		if (this.score < 10) {
			this.scorePosition = 340;
		} else {
			this.scorePosition = 310;
		}
		text(this.score, this.scorePosition, 90);

		if (this.timeLeft < 10) {
			text(nf(this.timeLeft, 1, 1), 310, 170);
		} else {
			text(nf(this.timeLeft, 2, 0), 310, 170);
		}
	}
}
