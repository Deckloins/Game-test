/*

Variables

*/
let gameIsPlaying = false;
let playerSpeed = 4;
var time = 10
let timerPosition = 310;
let score = 0;
let scorePosition = 340

function setup() {
  createCanvas(400, 400);

  //Player variables
  playerX = 5;
  playerY = 5;
  playerSize = 20;

  //Points variable
  pointX = 300;
  pointY = 300;
  pointSize = 10;

}

function draw() {

  didPlayerMove();
  IsPlayerTouching();
  alignTimerText();
  gameOver();
  
  if (gameIsPlaying === true) {

    background(100);
    //Create the points
    square(pointX, pointY, 10)
    //Create the Player (Square)
    fill(255, 204, 0)
    square(playerX, playerY, playerSize)


    //Detect player movement and collisions
    if (keyIsDown(UP_ARROW) && !(playerY <= 0)) {
      playerY -= playerSpeed
    } else if (keyIsDown(DOWN_ARROW) && !(playerY + playerSize >= 400)) {
      playerY += playerSpeed
    } else if (keyIsDown(LEFT_ARROW) && !(playerX <= 0)) {
      playerX -= playerSpeed;
    } else if (keyIsDown(RIGHT_ARROW) && !(playerX + playerSize >= 400)) {
      playerX += playerSpeed;
    }


    /*Timer */

    if (didPlayerMove() === true && gameOver() === false) {
      time -= 1 / 60
    }



    //Print the score and the timer to the screen 
    fill(255)
    textSize(25)
    text("Score :", 300, 30)
    text("Timer :", 300, 120)
    textSize(50)
    text(score, scorePosition, 90)
    text(nf(time, 1, 1), timerPosition, 170)



  } else if (gameIsPlaying === false) {
    clear()
    score = 0;
    time = 10;
    playerX = 5;
    playerY = 5;
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
  if (playerX + playerSize + playerSpeed > pointX && playerX + playerSpeed < pointX + 10 && playerY + 20 > pointY && playerY < pointY + 10) {

    // If the points' X (RdX) is on the score text, make so RdY is not in it too
    let RdX = random(0, 330);
    pointX = RdX;
    if (RdX >= 300) {
      let RdY = random(190, 400)
      pointY = RdY
    } else {
      let RdY = random(0, 400);
      pointY = RdY
    }
    score++;
    time = 10
    return true;
  }
}
//Don't start the timer if the player hasn't moved yet
function didPlayerMove() {
  if (playerX == 5 && playerY == 5 && time == 10) {
    time = 10
  } else {
    return true;
  }
}
//Reset the score if time = 0
function gameOver() {
  if (time <= 0) {
    score = 0;
    timer = 0;
    return true;
  }
  return false;
}