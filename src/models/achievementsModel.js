const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(process.env.SQLITE_URI, {
  dialect: 'sqlite',
});

const AchievementModel = sequelize.define('achievementsModel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completion_condition: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = AchievementModel;
