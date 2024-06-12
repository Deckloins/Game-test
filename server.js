const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/libraries", express.static(path.join(__dirname, "libraries")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Import routes
const achievementsRoutes = require("./src/routes/achievementsRoutes");
const userAchievementsRoutes = require("./src/routes/userAchievementsRoutes");

// Use routes
app.use("/achievements", achievementsRoutes);
app.use("/user-achievements", userAchievementsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;