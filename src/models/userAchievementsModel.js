const mongoose = require('mongoose');

const userAchievementSchema = new mongoose.Schema({
  userId: {type: Number, required: true},
  achievementId: {type: Number, required: true}
});

module.exports = mongoose.model('UserAchievementModel', userAchievementSchema);
