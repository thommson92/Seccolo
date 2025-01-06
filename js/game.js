// URL-Parameter auslesen und Spielernamen speichern
const urlParams = new URLSearchParams(window.location.search);
const players = [];
urlParams.forEach((value, key) => {
    if (key.startsWith('player')) players.push(value);
});

if (players.length === 0) {
    document.body.innerHTML = '<div class="alert alert-danger">Keine Spieler übergeben!</div>';
    throw new Error('Keine Spieler übergeben');
}

// Set an Aktivitäten mit "X" als Platzhalter für Spielernamen
const activities = JSON.parse(sessionStorage.getItem('activities'))
console.log(activities)
console.log(activities.length)


// Kategorien und deren Mindestanzahl definieren
let amount = 20
const categoryRequirements = {
    'allDrink' : 0.1*amount,
    'single' : 0.05*amount,
    'koffer': 0.05*amount,
    'vote' : 0.1*amount,
    'singlePlayerActivity' : 0.05*amount,
    'aufdieEins' : 0.05*amount,
    'sprichwort' : 0.1*amount,
    'singlePlayerSatzbildung' : 0.05*amount,
    'doublePlayerActivity' : 0.05*amount,
    'tripplePlayerActivity' : 0.05*amount,
    'categories' : 0.1*amount,
    'allPlayerActivity' : 0.1*amount,
    'drinkRules' : 0.05*amount,
};

// Funktion, um Spieler zufällig auszuwählen
function getRandomPlayers(count) {
    const shuffled = players.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}


// Helper function to enforce category constraints while shuffling
function shuffleWithCategoryConstraint(activities) {
    let shuffled = [];
    let lastCategory = null;

    while (activities.length > 0) {
        const index = activities.findIndex(activity => activity.category !== lastCategory);
        if (index === -1) break; // This shouldn't happen with proper inputs.

        const [selected] = activities.splice(index, 1);
        shuffled.push(selected);
        lastCategory = selected.category;
    }

    // If there are remaining activities, append them at the end (edge cases)
    shuffled.push(...activities);

    return shuffled;
}

function ensureCategoryDistribution(activities, categoryRequirements) {
    const categorizedActivities = {};
    let result = [];

    // Aktivitäten nach Kategorien sortieren
    activities.forEach(activity => {
        if (!categorizedActivities[activity.category]) {
            categorizedActivities[activity.category] = [];
        }
        categorizedActivities[activity.category].push(activity);
    });

    // Aktivitäten gemäß Anforderungen hinzufügen
    for (const [category, count] of Object.entries(categoryRequirements)) {
        if (categorizedActivities[category]) {
            const selected = categorizedActivities[category].sort(() => 0.5 - Math.random()).slice(0, count);
            result.push(...selected);
        }
    }

    // Restliche Aktivitäten auffüllen
    const remainingActivities = activities.filter(activity => !result.includes(activity));
    const remainingCount = 30 - result.length;
    result.push(...remainingActivities.sort(() => 0.5 - Math.random()).slice(0, remainingCount));

    // Sicherstellen, dass keine zwei Aktivitäten derselben Kategorie direkt aufeinander folgen
    return shuffleWithCategoryConstraint(result);
}

// Aktivitäten filtern, wenn Spieleranzahl 2 ist
let filteredActivities = activities;
if (players.length === 2) {
    filteredActivities = activities.filter(activity => activity.playersNeeded < 3);
}

// Aktivitäten zufällig mischen und abarbeiten
let shuffledActivities = ensureCategoryDistribution(filteredActivities, categoryRequirements);
let currentActivityIndex = 0;
let currentStep = 0;

// Platzhalter "X" durch Spielernamen ersetzen
function replacePlaceholders(text, selectedPlayers) {
    let result = text;
    selectedPlayers.forEach(player => {
        result = result.replace('X', player);
    });
    return result;
}

// Variable to store players for multi-step activities
let multiStepPlayers = [];

// Nächste Aktivität anzeigen
function showNextActivity() {
    const activityContainer = document.getElementById('activityContainer');
    const nextButton = document.getElementById('nextButton');

    if (currentActivityIndex >= shuffledActivities.length || currentActivityIndex == 20) {
        activityContainer.innerHTML = '<h3>Das Spiel ist vorbei! Prost!</h3>';
        nextButton.textContent = "Neues Spiel starten";
        nextButton.addEventListener('click', () => {
            window.location.href = `game.html?${players.map((player, index) => `player${index}=${player}`).join('&')}`;
        });
        return;
    }

    const activity = shuffledActivities[currentActivityIndex];
    const selectedPlayers = getRandomPlayers(activity.playersNeeded);

    if (currentStep === 0) {
        multiStepPlayers = getRandomPlayers(activity.playersNeeded);
        const activityText = replacePlaceholders(activity.text[0], multiStepPlayers);
        activityContainer.innerHTML = `<h3>${activityText}</h3>`;

        if (activity.multiStep) {
            currentStep = 1;
        } else {
            currentActivityIndex++;
        }
    } else {
        const activityText = replacePlaceholders(activity.text[1], multiStepPlayers);
        activityContainer.innerHTML = `<h3>${activityText}</h3>`;
        currentActivityIndex++;
        currentStep = 0;
    }
}

// Initiale Aktivität anzeigen
document.getElementById('nextButton').addEventListener('click', showNextActivity);
showNextActivity();

// Bestätigung für "Zurück zum Start"
document.getElementById('backButton').addEventListener('click', function(event) {
    event.preventDefault();
    const confirmBack = confirm("Möchtest du wirklich zum Start zurückkehren? Das Spiel wird beendet.");
    if (confirmBack) {
        window.location.href = "index.html";
    }
});