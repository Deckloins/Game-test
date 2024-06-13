const Achievement = require('../models/achievementsModel');

// Get all achievements
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};