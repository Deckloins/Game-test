/*

Variables

*/
let gameIsPlaying = false;
const canvas = document.getElementById('Game')
let x = 0;
let speed = 4;
let Score = 0;
let timer = 10 // I'll try to make the code more clear for the time/timer variable 
let time = 10
let posTimer = 340;
let posScore = 340

function setup() {
  createCanvas(400, 400);

  //Square variables
  sQx = 5;
  sQy = 5;
  sQs = 20;

  //Points variable
  Px = 300;
  Py = 300;
  Ps = 10;

}
//if (gameIsPlaying===true) {
function draw() {
  if (gameIsPlaying === true) {
    background(100);
    //Create the points
    square(Px, Py, 10)
    //Create the Player (Square)
    fill(255, 204, 0)
    square(sQx, sQy, sQs)





    //Makes the Square move && Stop him from getting out the edges
    if (keyIsDown(UP_ARROW) && !(sQy <= 0)) {
      sQy -= speed
    } else if (keyIsDown(DOWN_ARROW) && !(sQy + sQs >= 400)) {
      sQy += speed
    } else if (keyIsDown(LEFT_ARROW) && !(sQx <= 0)) {
      sQx -= speed;
    } else if (keyIsDown(RIGHT_ARROW) && !(sQx + sQs >= 400)) {
      sQx += speed;
    }

    //
    //I will make a function for the player detection since it takes too much place and the if statement is used mote too much things
    //

    // Detect if the player is on the point and changes his place if true
    function IsPlayerTouching() {
      if (sQx + sQs + speed > Px && sQx + speed < Px + 10 && sQy + 20 > Py && sQy < Py + 10) {
        // If the points' X (RdX) is on the Score text, make so RdY is not in it too
        let RdX = random(0, 330);
        Px = RdX;
        if (RdX >= 300) {
          let RdY = random(190, 400)
          Py = RdY
        } else {
          let RdY = random(0, 400);
          Py = RdY
        }
        Score++;
        return Score;
      }
    }
    IsPlayerTouching();
    //Changes the difficulty //I'll had more stuff to it later 
    if (Score > 40) {
      time = 4
      speed = 10
    } else if (Score % 10 == 0) {
      time = 10 - (x * 2)
      x++;
    } else if (Score < 10) {
      time = 10
    }
    timer = time






    /*
    
    Timer // I'll try to make this part clearer

    */
    // Dont start the timer if the player hasn't move
    if (sQx == 5 && sQy == 5) {
      timer = 10
    } else if (frameCount % 60 == 0 && timer > 0) {
      timer--;
    }


    //Reset the score if time = 0
    if (timer == 0) {
      Score = 0
    }

    //Align the timer text
    if (timer == 10) {
      posTimer = 310;
    } else {
      posTimer = 340
    }
    //Align Score
    if (Score < 10) {
      posScore = 340
    } else {
      posScore = 310
    }

    /*
    
    Change the difficulty 

    */





    //Print the score and the timer to the screen
    fill(255)
    textSize(25)
    text("Score :", 300, 30)
    text("Timer :", 300, 120)
    textSize(50)
    text(Score, posScore, 90)
    text(timer, posTimer, 170)
  }else if (gameIsPlaying === false) {
    clear()
    Score = 0
    time = 10
  }
}