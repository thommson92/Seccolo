// URL-Parameter lesen
const urlParams = new URLSearchParams(window.location.search);
const players = parseInt(urlParams.get('players'), 10);

// Spieleranzahl validieren
if (isNaN(players) || players < 2 || players > 12) {
    document.body.innerHTML = '<div class="alert alert-danger">Ungültige Spieleranzahl!</div>';
    throw new Error('Ungültige Spieleranzahl');
}

// Spielerfelder erstellen
const playerInputs = document.getElementById('playerInputs');
for (let i = 1; i <= players; i++) {
    const inputGroup = document.createElement('div');
    inputGroup.className = 'mb-3';
    inputGroup.innerHTML = `
        <label for="player${i}" class="form-label">Spieler ${i}:</label>
        <input type="text" class="form-control" id="player${i}" name="player${i}" required>
    `;
    playerInputs.appendChild(inputGroup);
}

// Formular validieren und abschicken
document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const names = [];
    let hasEmptyField = false;
    const errorAlert = document.getElementById('errorAlert');

    // Namen sammeln und überprüfen
    for (let i = 1; i <= players; i++) {
        const input = document.getElementById(`player${i}`);
        const name = input.value.trim();

        if (!name) {
            hasEmptyField = true;
        } else {
            names.push(name);
        }
    }

    // Fehler anzeigen, wenn ein Feld leer ist
    if (hasEmptyField) {
        errorAlert.textContent = 'Alle Namen müssen ausgefüllt sein!';
        errorAlert.classList.remove('d-none');
        return;
    }

    // Überprüfung auf doppelte Namen
    const uniqueNames = new Set(names);
    if (uniqueNames.size !== names.length) {
        errorAlert.textContent = 'Keine doppelten Namen erlaubt!';
        errorAlert.classList.remove('d-none');
        return;
    }

    // Weiter zum Spiel
    errorAlert.classList.add('d-none');
    // Beispielsweise zu "game.html" navigieren mit den Namen als Query-Parameter
    const queryParams = new URLSearchParams();
    names.forEach((name, index) => queryParams.append(`player${index + 1}`, name));
    window.location.href = `game.html?${queryParams.toString()}`;
});