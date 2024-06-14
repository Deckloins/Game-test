document.addEventListener("DOMContentLoaded", async () => {
    const achievementsList = document.getElementById('achievements-list');

    try {
        const response = await fetch('/user-achievements/1');  // Replace with the actual user ID
        const achievements = await response.json();

        if (achievements.length === 0) {
            achievementsList.innerHTML = `<p>No achievements yet :(</p>`;
            return;
        }

        achievements.forEach(achievement => {
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
