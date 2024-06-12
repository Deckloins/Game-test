const achievementsData = require("../../data/achievement_data.json");

// TODO: Replace with DB logic
exports.getAchievements = (req, res) => {
	res.json(achievementsData);
};

