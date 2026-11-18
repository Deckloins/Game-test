const mongoose = require('mongoose');

const achievementRuleSchema = new mongoose.Schema({
  type: { type: String, enum: ['score'], required: true },
  operator: { type: String, enum: ['>='], required: true },
  value: { type: Number, required: true, min: 0 },
}, { _id: false });

const achievementSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  description: String,
  rule: { type: achievementRuleSchema, required: true },
});

module.exports = mongoose.model('AchievementModel', achievementSchema);
