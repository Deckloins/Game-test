class Achievement {
    static allAchievements = [];

    constructor(id, name, description, checkFunction) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.checkFunction = checkFunction;
        this.unlocked = false;
        Achievement.allAchievements.push(this);
    }

    check(gamePanel) {
        if (this.checkFunction(gamePanel)) {
            console.log("Unlocked " + this.name);
            this.unlocked = true;
            return true;
        }
        return false;
    }
}


class AchievementListener {
    constructor(id, gamePanel){ // ID of the achievement to listen to
        this.id = id;
        this.gamePanel = gamePanel;
    };

    check(id){
        const achievement = Achievement.allAchievements.find(a => a.id === id);
        return achievement.check(this.gamePanel);
    }
}

class AchievementManager {
    constructor(gamePanel) {
        this.achievements = [];
        this.unlocked = []; // TODO Get this from the server to remove them from achievement[]
        this.listeners = [];
        this.gamePanel = gamePanel;
    }

    add(achievement) {
        this.achievements.push(achievement);
        this.listeners.push(new AchievementListener(achievement.id, this.gamePanel));
    }

    check() {
        for (let listener of this.listeners) {
            if (listener.check(listener.id)) {
                this.listeners = this.listeners.filter(l => l !== listener);
                this.unlocked.push(listener.id);
            }
        } 
    }
}
