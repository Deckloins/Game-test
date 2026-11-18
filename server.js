const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const achievementsRoutes = require("./src/routes/v1/achievementsRoutes");
const userAchievementsRoutes = require("./src/routes/v1/userAchievementsRoutes");

dotenv.config();

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
async function initializeDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
}

async function start() {
  await initializeDatabase();
  const PORT = process.env.PORT || 3000;
  return app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

if (require.main === module) {
  start().catch((error) => {
    console.error("Server initialization failed:", error);
    process.exit(1);
  });
}

module.exports = app;
module.exports.initializeDatabase = initializeDatabase;
module.exports.start = start;