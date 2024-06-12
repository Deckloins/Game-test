let achievementManager;

function preload() {
	achievementManager = new AchievementManager(gamePanel);
	achievementManager.loadAchievements("./achievement_data.json");
	achievementManager.loadUserAchievements("./player1-achievements.json");
}

let player1 = new Player(20, 5);
let food = new Food(300, 300, 10);
let gamePanel = new GamePanel(player1, food);

function setup() {
	createCanvas(400, 400);
}

function draw() {
	achievementManager.check();
	gamePanel.update();
	gamePanel.draw();
}

function gameOver() {
	achievementManager.saveUserAchievements("./player1-achievements.json");
}

