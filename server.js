const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const achievementsRoutes = require("./src/routes/v1/achievementsRoutes");
const userAchievementsRoutes = require("./src/routes/v1/userAchievementsRoutes");

dotenv.config();

const { Sequelize } = require("sequelize");
const db = new Sequelize({
  dialect: "sqlite",
  storage: "./mainDB.db",
});

const test_con = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
test_con();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Use routes
app.use("/api/v1/achievements", achievementsRoutes);
app.use("/api/v1/user-achievements", userAchievementsRoutes);

// Serve main HTML file
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;
