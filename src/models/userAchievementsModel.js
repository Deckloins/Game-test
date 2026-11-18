const mongoose = require('mongoose');

const userAchievementSchema = new mongoose.Schema({
  userId: {type: Number, required: true},
  achievementId: {type: Number, required: true}
});

userAchievementSchema.index(
  { userId: 1, achievementId: 1 },
  { unique: true }
);

module.exports = mongoose.model('UserAchievementModel', userAchievementSchema);
