/*

* Variables

*/
let gameIsPlaying = false;
let playerSpeed = 4;
let time = 10
let timerPosition = 310;
let score = 0;
let scorePosition = 340

//Player variables
let playerX = 5;
let playerY = 5;
let playerSize = 20;

//Points variable
let pointX = 300;
let pointY = 300;
let pointSize = 10;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  //frameRate(10);
  didPlayerMove();
  IsPlayerTouching();
  alignTimerText(); //! TODO 
  gameOver();

  if (!gameIsPlaying) { //! TODO
    clear()
    score = 0;
    time = 10;
    playerX = 5;
    playerY = 5;
  } else {
    //Detect player movement and collisions
    playerMovement();
    background(100);

    //Draw point
    square(pointX, pointY, pointSize)

    //Draw player
    fill(255, 204, 0)
    square(playerX, playerY, playerSize)

    // * Timer 

    if (didPlayerMove()  && !gameOver()) {
      time -= 1 / 60;
    }

    //Print the score and the timer to the screen //! TODO
    fill(255)
    textSize(25)
    text("Score :", 300, 30)
    text("Timer :", 300, 120)
    textSize(50)
    text(score, scorePosition, 90)
    if (time < 10) {
      text(nf(time, 1, 1), timerPosition, 170)
    } else {
      text(nf(time, 2, 0), timerPosition, 170)
    }
  } 
}

// Detect player movement and collisionsp
function playerMovement() {
  switch (key) {
    case "ArrowUp":
      if (playerY > 0) {
        playerY -= playerSpeed;
        //playerY -= height / 20
      }
      break;
    case "ArrowDown":
      if (playerY + playerSize < 400) {
        playerY += playerSpeed;
        //playerY += height / 20
      }
      break;
    case "ArrowLeft":
      if (playerX > 0) {
        playerX -= playerSpeed;
        //playerX -= width / 20
      }
      break;
    case "ArrowRight":
      if (playerX + playerSize < 400) {
        playerX += playerSpeed;
        //playerX += width / 20
      }
      break;
  }
}


//Align the timer and score text
function alignTimerText() {
  if (score < 10) {
    scorePosition = 340;
  } else {
    scorePosition = 310;
  }
}


// Detect if the player is on the point and changes his place if true
function IsPlayerTouching() {
  if (playerX + playerSize + playerSpeed > pointX 
      && playerX + playerSpeed < pointX + 10 
      && playerY + 20 > pointY 
      && playerY < pointY + 10) {

    // If the points' X (RdX) is on the score text, make so RdY is not in it too
    let RdX = random(0, 330);
    pointX = RdX;
    if (RdX >= 300) {
      let RdY = random(190, 400); 
      pointY = RdY;
    } else {
      let RdY = random(0, 400);
      pointY = RdY;
    }
    score++;
    time = 10;
    return true;
  }
}
//Don't start the timer if the player hasn't moved yet
function didPlayerMove() {
  if (playerX === 5 && playerY === 5 && time === 10) {
    time = 10;
  } else {
    return true;
  }
}
//Reset the score if time = 0
function gameOver() {
  if (time <= 0) {
    score = 0;
    time = 0;
    return true;
  }
  return false;
}