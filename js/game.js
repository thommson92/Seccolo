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
let activities = JSON.parse(sessionStorage.getItem('activities'))

// Funktion, um Spieler zufällig auszuwählen
function getRandomPlayers(count) {
    const shuffled = players.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Helper function to enforce category constraints while shuffling
function shuffleWithCategoryConstraint(result) {

    // Aktivitäten filtern, wenn Spieleranzahl 2 ist
    const shuffled = [...result];

    // Mische Random
    for (let i = shuffled.length - 1; i > 0; i--) {
        // Zufälligen Index generieren
        const j = Math.floor(Math.random() * (i + 1));
    
        // Elemente tauschen
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Returniere
    return shuffled;   
}

function getRandomActivities(activities, category, count) {
    
    // Filtere die Aktivitäten nach der angegebenen Kategorie
    const filteredActivities = activities.filter(activity => activity.category === category);

    // Prüfe, ob genügend Aktivitäten vorhanden sind
    if (filteredActivities.length < count) {
        console.error('Nicht genügend Aktivitäten in dieser Kategorie.: ', category);
        return [];
    }

    // Mische das Array der gefilterten Aktivitäten zufällig
    for (let i = filteredActivities.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredActivities[i], filteredActivities[j]] = [filteredActivities[j], filteredActivities[i]];
    }

    // Gebe die angeforderte Anzahl an zufälligen Aktivitäten zurück
    return filteredActivities.slice(0, count);
}

function ensureCategoryDistribution(activitiesTemp, amount) {

    // Kategorien und deren Mindestanzahl definieren
    let categoryRequirements = {
        'allDrink' : Math.round(0.1*amount),
        'single' : Math.round(0.1*amount),
        'koffer': Math.round(0.05*amount),
        'vote' : Math.round(0.1*amount),
        'singlePlayerActivity' : Math.round(0.1*amount),
        'aufdieEins' : Math.round(0.05*amount),
        'sprichwort' : Math.round(0.1*amount),
        'singlePlayerSatzbildung' : Math.round(0.05*amount),
        'categories' : Math.round(0.1*amount),
        'allPlayerActivity' : Math.round(0.1*amount),
        'drinkRules' : Math.round(0.05*amount)
    };

    // Aktivitäten filtern, wenn Spieleranzahl 2 ist
    let activitiesRaw = [...activitiesTemp];

    //let activities = activitiesTemp;
    if (players.length === 2) {
        activities = activitiesRaw.filter(activity => activity.playersNeeded < 3);
        categoryRequirements.doublePlayerActivity = Math.round(0.1*amount);
    } else {
        categoryRequirements.doublePlayerActivity = Math.round(0.05*amount);
        categoryRequirements.tripplePlayerActivity = Math.round(0.05*amount);
    }
 
    // Initialisiere regulare Aktivitäten
    let resultsRegular    = [];
    let resultsDrinkRules = [];
    for (const [category, count] of Object.entries(categoryRequirements)) {
        let randomlySelectedActivities = getRandomActivities(activitiesRaw, category, count);
        if (category === "drinkRules") {
            resultsDrinkRules.push(...randomlySelectedActivities);
        } else {
            resultsRegular.push(...randomlySelectedActivities);
        }
    }
 
    // Sicherstellen, dass keine zwei Aktivitäten derselben Kategorie direkt aufeinander folgen
    let shuffledConstraintActivities = shuffleWithCategoryConstraint(resultsRegular);

    // Füge alle Trinkregeln hinzu und hebe diese nach 5 Schritten wieder auf
    let finalActivities = addDrinkRules(shuffledConstraintActivities, resultsDrinkRules);
    return finalActivities;
}

function generateUniqueRandomNumbers(n, min, max) {
    if (n > (max - min + 1)) {
      throw new Error(`Es können maximal ${max - min + 1} einzigartige Zahlen generiert werden.`);
    }
  
    let numbers = [];
    while (numbers.length < n) {
      let randomNum = Math.floor(Math.random() * (max - min + 1)) + min; // Zufallszahl im Bereich [min, max]
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    return numbers;
}

function addDrinkRules(shuffledConstraintActivities, resultsDrinkRules) {

    // Kopie
    let finalActivities = [...shuffledConstraintActivities];

    // Erstelle n random numbers
    let indizes = generateUniqueRandomNumbers(resultsDrinkRules.length, 1, finalActivities.length - 5);
    
    // Iteriere über indizes und füge ein
    for (let i = 0; i < indizes.length; i++) {
        finalActivities.splice(indizes[i], 0, resultsDrinkRules[i]);
    }

    // Iteriere über Aktivitäten und Füge die Enden der Trinkregeln ein
    for (let i = 0; i < finalActivities.length; i++) {
        if (finalActivities[i].category === "drinkRules") {
            let tempDrinkRule = JSON.parse(JSON.stringify(finalActivities[i]))
            tempDrinkRule.text[0] = tempDrinkRule.text[1]
            tempDrinkRule.category = "drinkRuleFinished" // To not being performed again in for loop
            finalActivities.splice(i+5, 0, tempDrinkRule);
        }
    }

    return finalActivities;
}

// Aktivitäten zufällig mischen und abarbeiten
let rounds = 20;
let shuffledActivities = ensureCategoryDistribution(activities, rounds);
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

// Nächste Aktivität anzeigen
function showNextActivity() {
    const activityContainer = document.getElementById('activityContainer');
    const nextButton = document.getElementById('nextButton');

    if (currentActivityIndex >= shuffledActivities.length) { // || currentActivityIndex == 20)
        activityContainer.innerHTML = '<h3>Das Spiel ist vorbei! Prost!</h3>';
        nextButton.textContent = "Neues Spiel starten";
        nextButton.addEventListener('click', () => {
            window.location.href = `game.html?${players.map((player, index) => `player${index}=${player}`).join('&')}`;
        });
        return;
    }

    const activity = shuffledActivities[currentActivityIndex];
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