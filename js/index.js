function updatePlayerCount(value) {
    // Spieleranzahl aktualisieren
    document.getElementById('playerCount').textContent = value + (value === '1' ? ' Spieler' : ' Spieler');
    document.getElementById('hiddenPlayerInput').value = value;
}

async function loadActivities() {
    try {
        const response = await fetch('./js/activities.json');
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const activities = await response.json();
        return activities; // Returns the loaded activities
    } catch (error) {
        console.error('Error fetching activities:', error);
        return null; // Return null in case of an error
    }
}

loadActivities().then(activities => {
    if (activities) {
        // Proceed with initializing the game
        sessionStorage.setItem('activities', JSON.stringify(activities));
    } else {
        console.error('Failed to load activities.');
    }
});
