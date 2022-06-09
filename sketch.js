/*

Variables

*/
let gameIsPlaying = false;
const canvas = document.getElementById('main')
let x = 0;
let playerSpeed = 4;
let score = 0;
let timer = 10 // I'll try to make the code more clear for the time/timer variable 
let time = 10
let timerPosition = 340;
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
  if (gameIsPlaying === true) {
    background(100);
    //Create the points
    square(pointX, pointY, 10)
    //Create the Player (Square)
    fill(255, 204, 0)
    square(playerX, playerY, playerSize)





    //Makes the Square move && Stop him from getting out the edges
    if (keyIsDown(UP_ARROW) && !(playerY <= 0)) {
      playerY -= playerSpeed
    } else if (keyIsDown(DOWN_ARROW) && !(playerY + playerSize >= 400)) {
      playerY += playerSpeed
    } else if (keyIsDown(LEFT_ARROW) && !(playerX <= 0)) {
      playerX -= playerSpeed;
    } else if (keyIsDown(RIGHT_ARROW) && !(playerX + playerSize >= 400)) {
      playerX += playerSpeed;
    }

    //
    //I will make a function for the player detection since it takes too much place and the if statement is used mote too much things
    //

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
        return true;
      }
    }
    IsPlayerTouching();
    //Changes the difficulty //I'll had more stuff to it later 
    /*if (score > 40) {
      time = 4
      playerSpeed = 10
    } else if (score % 10 == 0 && score != 0) {
      time = 10 - (x * 2)
      x++;
    } else if (score < 10) {
      time = 10
    }*/
    timer = time 






    /*
    
    Timer // I'll try to make this part clearer

    */
    // Dont start the timer if the player hasn't move
    if (playerX == 5 && playerY == 5) {
      timer = 10
    } else if (frameCount % 60 == 0 && timer > 0) {
      timer--;
    }


    //Reset the score if time = 0
    if (timer == 0) {
      score = 0
    }

    //Align the timer text
    if (timer == 10) {
      timerPosition = 310;
    } else {
      timerPosition = 340
    }
    //Align score
    if (score < 10) {
      scorePosition = 340
    } else {
      scorePosition = 310
    }

    /*
    
    Change the difficulty 

    */





    //Print the score and the timer to the screen
    fill(255)
    textSize(25)
    text("score :", 300, 30)
    text("Timer :", 300, 120)
    textSize(50)
    text(score, scorePosition, 90)
    text(timer, timerPosition, 170)
  } else if (gameIsPlaying === false) {
    clear()
    score = 0
    time = 10
  }
}