const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const achievementsRoutes = require("./src/routes/achievementsRoutes");
const userAchievementsRoutes = require("./src/routes/userAchievementsRoutes");


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

mongoose.connect(process.env.MONGODB_URI, {
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use("/achievements", achievementsRoutes);
app.use("/user-achievements", userAchievementsRoutes);

// Serve main HTML file
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;