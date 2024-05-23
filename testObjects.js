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
    } else if (keyIsDown(DOWN_ARROW) && this.y + this.size < 400) {
      this.y += this.speed;
    } else if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speed;
    } else if (keyIsDown(RIGHT_ARROW) && this.x + this.size < 400) {
      this.x += this.speed;
    }
  }

  didMove(gamePanel) {
    return !(this.x === 5 && this.y === 5 && gamePanel.timeLeft === 10);
  }

  show() {
    fill(255, 204, 0);
    square(this.x, this.y, this.size);
  }
}

// Food.js
class Food {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  isEat(player) {
    if (
      player.x + player.size + player.speed > this.x &&
      player.x + player.speed < this.x + this.size &&
      player.y + player.size > this.y &&
      player.y < this.y + this.size
    ) {
      // Generate a new random position for the food
      let RdX = random(0, 330);
      this.x = RdX;
      if (RdX >= 300) {
        let RdY = random(190, 400);
        this.y = RdY;
      } else {
        let RdY = random(0, 400);
        this.y = RdY;
      }
      return true;
    }
    return false;
  }

  show() {
    square(this.x, this.y, this.size);
  }
}

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
        text(nf(this.timeLeft, 1, 1), 310, 170)
      } else {
        text(nf(this.timeLeft, 2, 0), 310, 170)
      }
  }
}

// main.js
let player1 = new Player(20, 5);
let food = new Food(300, 300, 10);
let gamePanel = new GamePanel(player1, food);

function setup() {
  createCanvas(400, 400);
}

function draw() {
  gamePanel.update();
  gamePanel.draw();
}
