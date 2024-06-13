const UserAchievement = require("../models/userAchievementsModel");

// Get all user achievements
exports.getUserAchievements = async (req, res) => {
	const { userId } = req.params;
	try {
		const userAchievements = await UserAchievement.find({ userId });
		res.json(userAchievements.map((ua) => ua.achievementId));
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Post user achievement
exports.postUserAchievements = async (req, res) => {
	const { userId, achievementIds } = req.body;

	try {
		const existingAchievements = await UserAchievement.find({ userId });
		const existingAchievementIds = existingAchievements.map(
			(ua) => ua.achievementId
		);

		const newAchievements = achievementIds.filter(
			(id) => !existingAchievementIds.includes(id)
		);

		const newAchievementDocs = newAchievements.map((achievementId) => ({
			userId,
			achievementId,
		}));

		if (newAchievementDocs.length > 0) {
			await UserAchievement.insertMany(newAchievementDocs);
		}

		res.status(200).send("User achievements saved successfully");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

