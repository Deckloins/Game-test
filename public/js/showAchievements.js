document.addEventListener("DOMContentLoaded", async () => {
    const achievementsList = document.getElementById('achievements-list');
    const queryUserId = new URLSearchParams(window.location.search).get('userId');
    const storedUserId = window.localStorage
        ? window.localStorage.getItem('gameTest.userId')
        : null;
    const userId = Number(queryUserId || storedUserId);

    if (!Number.isInteger(userId) || userId < 1) {
        achievementsList.innerHTML = `<p>A valid user ID is required.</p>`;
        return;
    }
    try {
        const { achievements: allAchievements, unlockedIds: userAchievements } =
            await window.AchievementApi.loadPage(userId);

        const mergedArray = userAchievements.map(id => {
            const obj = allAchievements.find(item => item.id === id);
            return obj ? { id, ...obj } : { id };
        });
        
        if (userAchievements.length === 0) {
            achievementsList.innerHTML = `<p>No achievements yet :(</p>`;
            return;
        }

        mergedArray.forEach(achievement => {
            const achievementDiv = document.createElement('div');
            achievementDiv.classList.add('achievement');

            achievementDiv.innerHTML = `
                <h2>${achievement.name}</h2>
                <p>${achievement.description}</p>
            `;

            achievementsList.appendChild(achievementDiv);
        });
    } catch (error) {
        console.error("Error fetching achievements:", error);
        achievementsList.innerHTML = `<p>Failed to load achievements. Please try again later.</p>`;
    }
});
