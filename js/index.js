function updatePlayerCount(value) {
    // Spieleranzahl aktualisieren
    document.getElementById('playerCount').textContent = value + (value === '1' ? ' Spieler' : ' Spieler');
    document.getElementById('hiddenPlayerInput').value = value;
}

function prepareArray(tempAkt, dateiname) {
  if (dateiname.includes("categorie")) {
    tempAkt.forEach(activity => {
      activity.playersNeeded = 1;
      activity.multiStep = false;
      activity.category = "categories";
      activity.endAfterRows = 0;
    });
  }
  return tempAkt
}

async function ladeJSONDateien() {
  const dateien = ['activitiesAll.json','activitiesDouble.json','activitiesTripple.json',
    'activitySingle.json','allDrink.json','aufDieEins.json','categories.json','drinkRules.json',
    'koffer.json','satzbildung.json','single.json','sprichwort.json','vote.json'
  ]; 
  let activities = [];

  for (const datei of dateien) {
    try {
      const response = await fetch(`./activities/${datei}`);
      const daten = await response.json();

      if (Array.isArray(daten)) {
        let preparedDaten = prepareArray(daten, datei)
        activities = activities.concat(preparedDaten);
      } else {
        activities.push(daten);
      }
    } catch (err) {
      console.error(`Fehler beim Laden der Datei ${datei}:`, err.message);
    }
  }

  sessionStorage.setItem('activities', JSON.stringify(activities));
}

ladeJSONDateien();
