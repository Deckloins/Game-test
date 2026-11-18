const express = require("express");
const router = express.Router();
const userAchievementsController = require("../../controllers/userAchievementsController");
const rateLimit = require("express-rate-limit");

router.use(rateLimit({
	windowMs: 60 * 1000,
	limit: 100,
	standardHeaders: "draft-7",
	legacyHeaders: false,
}));
router.get("/:userId", userAchievementsController.getUserAchievements);
router.post("/", userAchievementsController.postUserAchievements);

module.exports = router;
