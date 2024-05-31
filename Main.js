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
