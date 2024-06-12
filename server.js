const express = require("express");
const path = require("path");

const app = express();

app.use(express.json()); // Add this line to parse JSON request bodies

app.use(express.static(path.join(__dirname, "/")));
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const achievementsData = [
	{
		id: 0,
		name: "Reach 10 points",
		description: "Earn 10 points in a single game",
		checkFunction: "(gamePanel) => gamePanel.score >= 10",
	},
	{
		id: 1,
		name: "Reach 2 points",
		description: "Earn 2 points in a single game",
		checkFunction: "(gamePanel) => gamePanel.score >= 2",
	},
];

// TODO Load the data from the DB instead
app.get("/achievements", (req, res) => {
	res.json(achievementsData);
});

app.get("/user-achievements", (req, res) => {
	res.json([]);
});

app.post("/user-achievements", (req, res) => {
	const userAchievementsData = req.body;
	console.log("Received user achievements data:", userAchievementsData);
	res.status(200).send("User achievements data saved successfully");
});

module.exports = app;

