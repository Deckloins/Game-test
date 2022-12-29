let timeLeft = 10;

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
        if (this.x === 5 && this.y === 5 && timeLeft === 10) {
            timeLeft = 10;
            return false;
        } else {
            return true;
        }
    }
}

class Food {
    constructor()
}

function setup() {
    createCanvas(400, 400);
}