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

    didMove() {
        return !(this.x === 5 && this.y === 5 && timeLeft === 10);
    }

    show() {
        fill(255, 204, 0);
        square(this.x, this.y, this.size); 
    }

}

class Food {
    constructor(x, y, size) { 
        this.x = x;
        this.y = y;
        this.size = size;
    }
    
    isEat() {
        if (player1.x + player1.size + player1.speed > this.x
             && player1.x + player1.speed < this.x + this.size 
             && player1.y + player1.size > this.y 
             && player1.y < this.y + this.size) {

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
            //panel.score++;
            //panel.timeLeft = 10;
            return true;
        }
    }
    show() {
        square(this.x, this.y, this.size)
    }
}

let player1 = new Player(20, 5);
let food = new Food(300, 300, 10);
let score = 0;
let timeLeft = 10;

let gameIsPlaying = false;
let timerPosition = 310;
let scorePosition = 340

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(100)

    player1.show();
    food.show();

    player1.move();
    gameOver();

    if (food.isEat()) {
        score++;
        timeLeft = 10;
    }

    // * Panneau 
    fill(255)
    textSize(25)
    text("Score :", 300, 30)
    text("Timer :", 300, 120)
    textSize(50)
    text(score, scorePosition, 90)
    if (timeLeft < 10) {
      text(nf(timeLeft, 1, 1), timerPosition, 170)
    } else {
      text(nf(timeLeft, 2, 0), timerPosition, 170)
    }

    if (player1.didMove() && !gameOver()){
        timeLeft -= 1/60;
    }
}

function gameOver() {
    if (timeLeft <= 0) {
        score = 0;
        timeLeft = 0;
        return true;
      }
}