document.addEventListener("DOMContentLoaded", async () => {
    const achievementsList = document.getElementById('achievements-list');

    try {
        const response = await fetch('/user-achievements/1');  // Replace with the actual user ID
        const userAchievements = await response.json();

        const response2 = await fetch('/achievements');
        const allAchievements = await response2.json();

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
