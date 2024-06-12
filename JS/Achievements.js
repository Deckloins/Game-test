class Achievement {
	constructor(obj) {
		this.id = obj.id;
		this.name = obj.name;
		this.description = obj.description;
		this.checkFunction = eval(`(${obj.checkFunction})`);
		this.unlocked = false;
	}

	check(gamePanel) {
		if (this.checkFunction(gamePanel)) {
			console.log(`Unlocked ${this.name}`);
			this.unlocked = true;
			return true;
		}
		return false;
	}

	static async loadAchievementsFromJSON() {
		const achievements = [];
		try {
			const response = await fetch("/achievements");
			const achievementData = await response.json();
			for (const achievementObj of achievementData) {
				achievements.push(new Achievement(achievementObj));
			}
		} catch (error) {
			console.error("Error fetching the achievements data:", error);
		}
		return achievements;
	}

	static async loadUserAchievementsFromJSON() {
		let unlockedAchievements = [];
		try {
			const response = await fetch("/user-achievements");
			const unlockedAchievementsData = await response.json();
			for (const achievementId of unlockedAchievementsData) {
				unlockedAchievements.push(achievementId);
			}
		} catch (error) {
			console.error("Error fetching the user achievements data:", error);
		}
		return unlockedAchievements;
	}

	static saveUserAchievementsToJSON(unlockedAchievements) {
		fetch("/user-achievements", {
			method: "POST",
			headers: {
				"Content-Type": "text/html",
			},
			body: unlockedAchievements,
		})
			.then((response) => {
				if (response.ok) {
					// TODO implement saving to the DB
					console.log(unlockedAchievements);
					console.log("User achievements data saved successfully");
				} else {
					console.error(
						"Couldn't save user achievement data:",
						response.status
					);
				}
			})
			.catch((error) => {
				console.error("Error saving user achievements data:", error);
			});
	}
}

class AchievementManager {
	constructor(gamePanel) {
		this.achievements = [];
		this.unlockedAchievements = [];
		this.gamePanel = gamePanel;
	}

	async loadAchievements() {
		this.achievements = await Achievement.loadAchievementsFromJSON();
	}

	async loadUserAchievements() {
		this.unlockedAchievements =
			await Achievement.loadUserAchievementsFromJSON();
	}

	check() {
		for (const achievement of this.achievements) {
			if (
				!this.unlockedAchievements.includes(achievement.id) &&
				achievement.check(this.gamePanel)
			) {
				this.unlockedAchievements.push(achievement.id);
			}
		}
	}

	saveUserAchievements() {
		Achievement.saveUserAchievementsToJSON(this.unlockedAchievements);
	}
}

