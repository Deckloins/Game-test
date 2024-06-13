const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  checkFunction: String,
});

module.exports = mongoose.model('AchievementModel', achievementSchema);
