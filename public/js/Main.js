	let player1 = new Player(20, 5);
	let food = new Food(300, 300, 10);
	let gamePanel = new GamePanel(player1, food);
	let achievementManager = new AchievementManager(gamePanel, 2);
	
	achievementManager.loadAchievements();
	achievementManager.loadUserAchievements();

function setup() {
	createCanvas(400, 400);
}

function draw() {
	gamePanel.update();
	achievementManager.check();
	gamePanel.draw();
}

function gameOver() {
	achievementManager.saveUserAchievements("./player1-achievements.json");
}

