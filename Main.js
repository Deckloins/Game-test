let player1 = new Player(20, 5);
let food = new Food(300, 300, 10);
let gamePanel = new GamePanel(player1, food);

let manager1 = new AchievementManager(gamePanel);
let highScore10 = new Achievement(0, "High Score 10", "Received for scoring 10 points", (gamePanel) => gamePanel.score >= 10);
let highScore100 = new Achievement(1, "High Score 2", "Received for scoring 2 points", (gamePanel) => gamePanel.score >= 2);
manager1.add(highScore10);
manager1.add(highScore100)

function setup() {
    createCanvas(400, 400);
}

function draw() {
	manager1.check()
    gamePanel.update();
    gamePanel.draw();
}
