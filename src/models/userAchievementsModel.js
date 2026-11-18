const mongoose = require('mongoose');

const userAchievementSchema = new mongoose.Schema({
  userId: { type: Number, required: true, min: 1 },
  achievementId: { type: Number, required: true, min: 0 }
});

userAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

module.exports = mongoose.model('UserAchievementModel', userAchievementSchema);
