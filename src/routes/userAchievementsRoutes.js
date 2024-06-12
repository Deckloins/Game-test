const express = require("express");
const router = express.Router();
const userAchievementsController = require("../controllers/userAchievementsController");

router.get("/", userAchievementsController.getUserAchievements);
router.post("/", userAchievementsController.postUserAchievements);

module.exports = router;

