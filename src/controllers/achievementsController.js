const Achievement = require('../models/achievementsModel');
const { validateRule } = require('../services/achievementRules');

// Get all achievements
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    const validated = achievements.filter((achievement) =>
      validateRule(achievement.rule)
    );
    res.json(validated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};