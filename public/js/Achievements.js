class AchievementApi {
	static async getAll() {
		const response = await fetch("/api/v1/achievements");
		if (!response.ok) throw new Error(`Achievement fetch failed: ${response.status}`);
		return response.json();
	}

	static async getUnlocked(userId) {
		const response = await fetch(`/api/v1/user-achievements/${encodeURIComponent(userId)}`);
		if (!response.ok) throw new Error(`User achievement fetch failed: ${response.status}`);
		return response.json();
	}

	static async saveUnlocked(userId, achievementIds) {
		const response = await fetch("/api/v1/user-achievements", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId, achievementIds }),
		});
		if (!response.ok) throw new Error(`Achievement save failed: ${response.status}`);
		return response.json();
	}

	static async loadPage(userId) {
		const [achievements, unlockedIds] = await Promise.all([
			AchievementApi.getAll(),
			AchievementApi.getUnlocked(userId),
		]);
		return { achievements, unlockedIds };
	}
}

window.AchievementApi = AchievementApi;

class AchievementRuleEvaluator {
	static validate(rule) {
		return Boolean(rule && rule.type === "score" &&
			rule.operator === ">=" &&
			Number.isInteger(rule.value) && rule.value >= 0);
	}

	static evaluate(rule, gameState) {
		return AchievementRuleEvaluator.validate(rule) &&
			gameState != null && typeof gameState.score === "number" &&
			gameState.score >= rule.value;
	}
}

class Achievement {
	constructor(obj) {
		this.id = obj.id;
		this.name = obj.name;
		this.description = obj.description;
		this.rule = obj.rule;
		this.unlocked = false;
	}

	check(gamePanel) {
		if (AchievementRuleEvaluator.evaluate(this.rule, gamePanel)) {
			this.unlocked = true;
			return true;
		}
		return false;
	}
}

class AchievementManager {
	constructor(gamePanel, userId) {
		this.achievements = [];
		this.unlockedAchievements = [];
		this.gamePanel = gamePanel;
		this.userId = userId;
		this.initialized = false;
		this.initialization = null;
	}

	async initialize() {
		if (this.initialization) return this.initialization;
		this.initialization = (async () => {
			if (!Number.isInteger(this.userId) || this.userId < 1) {
				throw new Error("A valid achievement userId is required");
			}
			const achievementData = await AchievementApi.getAll();
			this.achievements = achievementData.map((item) => new Achievement(item));
			this.unlockedAchievements = await AchievementApi.getUnlocked(this.userId);
			this.initialized = true;
		})();
		return this.initialization;
	}

	check() {
		if (!this.initialized) return;
		for (const achievement of this.achievements) {
			if (!this.unlockedAchievements.includes(achievement.id) &&
				achievement.check(this.gamePanel)) {
				this.unlockedAchievements.push(achievement.id);
			}
		}
	}

	async saveUserAchievements() {
		if (!this.initialized) await this.initialize();
		await AchievementApi.saveUnlocked(this.userId, this.unlockedAchievements);
	}
}
