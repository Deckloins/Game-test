	let player1 = new Player(20, 5);
	let food = new Food(300, 300, 10);
	let gamePanel = new GamePanel(player1, food);
	const storedUserId = window.localStorage
		? window.localStorage.getItem("gameTest.userId")
		: null;
	const queryUserId = new URLSearchParams(window.location.search).get("userId");
	const achievementUserId = Number(queryUserId || storedUserId);
	let achievementManager = new AchievementManager(gamePanel, achievementUserId);
	achievementManager.initialize().catch((error) => {
		console.error("Error initializing achievements:", error);
	});

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
