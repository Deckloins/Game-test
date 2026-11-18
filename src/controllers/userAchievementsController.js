const UserAchievement = require("../models/userAchievementsModel");
const Achievement = require('../models/achievementsModel');


// Get user achievements
exports.getUserAchievements = async (req, res) => {
	const userId = Number(req.params.userId);
	if (!Number.isInteger(userId) || userId < 1) {
		return res.status(400).json({ error: "A valid userId is required" });
	}
	try {
		const userAchievements = await UserAchievement.find({ userId });
		res.json([...new Set(userAchievements.map((ua) => ua.achievementId))]);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Post user achievements
exports.postUserAchievements = async (req, res) => {
	const { userId, achievementIds } = req.body;
	const numericUserId = Number(userId);
	if (!Number.isInteger(numericUserId) || numericUserId < 1 ||
		!Array.isArray(achievementIds) ||
		!achievementIds.every((id) => Number.isInteger(id) && id >= 0)) {
		return res.status(400).json({ error: "userId and achievementIds must be valid" });
	}
	try {
		const knownIds = new Set(
			(await Achievement.find({ id: { $in: [...new Set(achievementIds)] } }, { id: 1 })).map((item) => item.id)
		);
		for (const achievementId of new Set(achievementIds)) {
			if (!knownIds.has(achievementId)) {
				return res.status(400).json({ error: `Unknown achievementId: ${achievementId}` });
			}
			await UserAchievement.updateOne(
				{ userId: numericUserId, achievementId },
				{ $setOnInsert: { userId: numericUserId, achievementId } },
				{ upsert: true }
			);
		}
		res.status(200).json({ saved: [...new Set(achievementIds)] });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
