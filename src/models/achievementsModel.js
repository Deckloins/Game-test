const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  description: String,
  checkFunction: String,
});

module.exports = mongoose.model('AchievementModel', achievementSchema);
