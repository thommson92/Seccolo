function updatePlayerCount(value) {
    // Spieleranzahl aktualisieren
    document.getElementById('playerCount').textContent = value + (value === '1' ? ' Spieler' : ' Spieler');
    document.getElementById('hiddenPlayerInput').value = value;
}

const ordnerPfad = './activities'; // Pfad zu deinem Ordner mit JSON-Dateien
let activities = [];

// Alle Dateien im Verzeichnis auflisten
fs.readdirSync(ordnerPfad).forEach(datei => {
  if (path.extname(datei) === '.json') {
    const dateipfad = path.join(ordnerPfad, datei);
    const dateiInhalt = fs.readFileSync(dateipfad, 'utf8');
    try {
      const daten = JSON.parse(dateiInhalt);
      if (Array.isArray(daten)) {
        activities = activities.concat(daten);
      } else {
        activities.push(daten);
      }
      // Proceed with initializing the game
      sessionStorage.setItem('activities', JSON.stringify(activities));
    } catch (err) {
      console.error(`Fehler beim Parsen der Datei ${datei}:`, err.message);
    }
  }
});


// async function loadActivities() {
//     try {
//         const response = await fetch('./activities/activities.json');
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const activities = await response.json();
//         return activities; // Returns the loaded activities
//     } catch (error) {
//         console.error('Error fetching activities:', error);
//         return null; // Return null in case of an error
//     }
// }

// loadActivities().then(activities => {
//     if (activities) {
//         // Proceed with initializing the game
//         sessionStorage.setItem('activities', JSON.stringify(activities));
//     } else {
//         console.error('Failed to load activities.');
//     }
// });
