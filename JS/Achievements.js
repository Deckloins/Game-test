class Achievement {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.checkFunction = eval(`(${obj.checkFunction})`);
        this.unlocked = false;
    }

    check(gamePanel) {
        if (this.checkFunction(gamePanel)) {
            console.log(`Unlocked ${this.name}`);
            this.unlocked = true;
            return true;
        }
        return false;
    }

    static async loadAchievementsFromJSON(filePath) {
        const achievements = [];
        try {
            const response = await fetch(filePath);
            const achievementData = await response.json();
            for (const achievementObj of achievementData) {
                achievements.push(new Achievement(achievementObj));
            }
        } catch (error) {
            console.error('Error fetching the JSON data:', error);
        }
        return achievements;
    }

    static async loadUserAchievementsFromJSON(filePath) {
        const data = await fetch(filePath);
        const unlockedAchievements = await data.json();
        return Array.isArray(unlockedAchievements) ? unlockedAchievements : [];
    }

    static saveUserAchievementsToJSON(filePath, unlockedAchievements) {
        saveJSON(unlockedAchievements, filePath);
    }
}

class AchievementManager {
    constructor(gamePanel) {
        this.achievements = [];
        this.unlockedAchievements = [];
        this.gamePanel = gamePanel;
    }

    async loadAchievements(filePath) {
        this.achievements = await Achievement.loadAchievementsFromJSON(filePath)
    }


    async loadUserAchievements(filePath) {
        this.unlockedAchievements = await Achievement.loadUserAchievementsFromJSON(filePath);
    }

    check() {
        for (const achievement of this.achievements) {
            if (!this.unlockedAchievements.includes(achievement.id) && achievement.check(this.gamePanel)) {
                this.unlockedAchievements.push(achievement.id);
            }
        }
    }

    saveUserAchievements(filePath) {
        Achievement.saveUserAchievementsToJSON(filePath, this.unlockedAchievements);
    }
}
