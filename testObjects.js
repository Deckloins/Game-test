class Player {
    constructor() {
        this.x = 5;
        this.y = 5;
        this.size = 20;
        this.speed = 4;
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

    didMove() {
        return !(this.x === 5 && this.y === 5 && panel.timeLeft === 10);
    }

}

class Food {
    constructor(playerX, playerY, playerSize, playerSpeed) {
        this.playerX = playerX;
        this.playerY = playerY;
        this.playerSize = playerSize;
        this.x = 300;
        this.y = 300;
        this.size = 10;
    }

    isEat() {
        if (this.playerX + this.playerSize + this.playerSpeed > this.x && this.playerX + this.playerSpeed < this.x + 10 && this.playerY + 20 > this.y && this.playerY < this.y + 10) {

            // If the points' X (RdX) is on the score text, make so RdY is not in it too
            let RdX = random(0, 330);
            this.x = RdX;
            if (RdX >= 300) {
                let RdY = random(190, 400)
                this.y = RdY;
            } else {
                let RdY = random(0, 400);
                this.y = RdY;
            }
            panel.score++;
            panel.timeLeft = 10;
            return true;
        }
    }
}

class Panel extends Food {
    constructor() {
        super(Food)
        this.timeLeft = 10;
        this.score = 0;
    }

    isEat() {
        super.isEat()
        this.score++;
        this.timeLeft = 10;
    }
}
let player = new Player();
let food = new Food(player.x, player.y, player.size, playerSpeed);
let panel = new Panel();

function setup() {
    createCanvas(400, 400);
}