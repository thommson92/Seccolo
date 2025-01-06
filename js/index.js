function updatePlayerCount(value) {
    // Spieleranzahl aktualisieren
    document.getElementById('playerCount').textContent = value + (value === '1' ? ' Spieler' : ' Spieler');
    document.getElementById('hiddenPlayerInput').value = value;
}