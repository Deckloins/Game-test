const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(process.env.SQLITE_URI, {
  dialect: 'sqlite',
});

const userAchievementSchema = sequelize.define('userAchievementsModel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  achievementId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = userAchievementSchema;
