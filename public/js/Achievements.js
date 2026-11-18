class Achievement {
	constructor(obj) {
		this.id = obj.id;
		this.name = obj.name;
		this.description = obj.description;
		this.checkFunction = Achievement.createSafeCheck(obj.checkFunction);
		this.unlocked = false;
	}

	static createSafeCheck(checkFunction) {
		if (typeof checkFunction !== "string") {
			return () => false;
		}

		const match = checkFunction.match(
			/^\(\s*gamePanel\s*\)\s*=>\s*gamePanel\.score\s*(>=|>|<=|<|===|==)\s*(\d+(?:\.\d+)?)\s*$/
		);
		if (!match) {
			return () => false;
		}

		const [, operator, value] = match;
		const threshold = Number(value);
		const comparisons = {
			">=": (score) => score >= threshold,
			">": (score) => score > threshold,
			"<=": (score) => score <= threshold,
			"<": (score) => score < threshold,
			"===": (score) => score === threshold,
			"==": (score) => score == threshold,
		};
		return (gamePanel) => comparisons[operator](gamePanel.score);
	}

	check(gamePanel) {
		if (this.checkFunction(gamePanel)) {
			console.log(`Unlocked ${this.name}`);
			this.unlocked = true;
			return true;
		}
		return false;
	}

	static async loadAchievementsFromAPI() {
		const achievements = [];
		try {
			const response = await fetch("/api/v1/achievements");
			if (!response.ok) {
				throw new Error(`Achievements request failed: ${response.status}`);
			}
			const achievementData = await response.json();
			for (const achievementObj of achievementData) {
				achievements.push(new Achievement(achievementObj));
			}
		} catch (error) {
			console.error("Error fetching the achievements data:", error);
		}
		return achievements;
	}

	static async loadUserAchievementsFromAPI(userId) {
		let unlockedAchievements = [];
		try {
			const response = await fetch(`/api/v1/user-achievements/${userId}`);
			if (!response.ok) {
				throw new Error(`User achievements request failed: ${response.status}`);
			}
			const unlockedAchievementsData = await response.json();
			for (const achievementId of unlockedAchievementsData) {
				unlockedAchievements.push(achievementId);
			}
		} catch (error) {
			console.error("Error fetching the user achievements data:", error);
		}
		return unlockedAchievements;
	}

	static async saveUserAchievementsToAPI(userId, unlockedAchievements) {
		try {
			const response = await fetch("/api/v1/user-achievements", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId,
					achievementIds: unlockedAchievements,
				}),
			});
			if (response.ok) {
				console.log("User achievements data saved successfully");
			} else {
				console.error(
					"Couldn't save user achievement data:",
					response.status
				);
			}
		} catch (error) {
			console.error("Error saving user achievements data:", error);
		}
	}
}

class AchievementManager {
	constructor(gamePanel, userId) {
		this.achievements = [];
		this.unlockedAchievements = [];
		this.gamePanel = gamePanel;
		this.userId = userId;
	}

	async loadAchievements() {
		try {
			this.achievements = await Achievement.loadAchievementsFromAPI();
		} catch (error) {
			console.error("Error loading achievements:", error);
		}
	}

	async loadUserAchievements() {
		try {
			this.unlockedAchievements =
				await Achievement.loadUserAchievementsFromAPI(this.userId);
		} catch (error) {
			console.error("Error loading user achievements:", error);
		}
	}

	check() {
		for (const achievement of this.achievements) {
			if (
				!this.unlockedAchievements.includes(achievement.id) &&
				achievement.check(this.gamePanel)
			) {
				console.log(this.unlockedAchievements);
				this.unlockedAchievements.push(achievement.id);
			}
		}
	}

	async saveUserAchievements() {
		try {
			await Achievement.saveUserAchievementsToAPI(
				this.userId,
				this.unlockedAchievements
			);
		} catch (error) {
			console.error("Error saving user achievements:", error);
		}
	}
}
