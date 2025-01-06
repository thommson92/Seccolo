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
const activities = [
    // Alle trinken
    { text: ['Alle trinken 2 Schlücke zur Auflockerung.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle Frauen trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle Männer trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle, deren Vor- oder Nachname mit F beginnt, trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle Singles trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle Fussballer trinken 2 Schlücke. (Egal ob aktiv oder nicht)'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle Handballer trinken 2 Schlücke. (Egal ob aktiv oder nicht)'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle Singles trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle in einer Beziehung trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle mit Neujahrsvorsätzen trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle ohne Neujahrsvorsätze trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle mit roter Unterwäsche trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle mit schwarzen Socken trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle die eine Brille brauchen, trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle die eine Spielekonsole besitzen, trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle die ein Haustier haben, trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle die schon mal mit einem/r Minderjährigen geschlafen haben, als sie schon Volljährig waren, trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Trinke 2 Schlücke wenn du meistens nackt schläfst.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Jeder trinkt so viele Schlücke wie er in der Schule Verweise gesammelt hat.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle, die in diesem Monat schon den öffentlichen Nahverkehr genutzt haben, verteilen 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle, die heute nicht geduscht haben, trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle, die es schaffen an ihrem großen Zeh zu lutschen, verteilen 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Trinkt so viel Schlücke, wie ihr Flüge dieses Jahr hattet.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle die schon mal in Kryptowährungen investiert haben, trinken 3 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Wir denken einmal kurz an den morgigen Tag. Trinkt alle ein Glas Wasser oder auch nicht wenn ihr krass seid.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle die ein Kleidungsstück oder Accessouire einer anderen Person tragen, trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Trinkt so viele Schlücke, wie eure Schuhgröße über 40 ist. Verteilt für Schuhgrößen darunter.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle die gerade Wein trinken verteilen 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle die gerade Bier trinken verteilen 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle die gerade einen Longdrink trinken verteilen 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle die eine Brille tragen verteilen 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle mit weißer Unterwäsche verteilen 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle die eine Fliege oder Krawatte tragen verteilen 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Alle die ein Kleid tragen verteilen 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Der Gastgeber verteilt 5 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Der/die Älteste verteilt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },
    { text: ['Der/die Jüngste verteilt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allDrink' },

    // Einzelperson trinkt
    { text: ['X! Trinke ein ganzes Glas Wasser oder 2 Schlücke deines alkoholischen Getränks.'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['X! Exe das Glas eines beliebigen Mitspielers.'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['X! Verteile 3 Schlücke an eine Person die brauner ist als du, wenn möglich. Ansonsten trinke sie selbst.'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['X! Verteile 3 Schlücke an eine Person die älter ist als du, wenn möglich. Ansonsten trinke sie selbst.'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['X! Verteile 3 Schlücke an eine Person die jünger ist als du, wenn möglich. Ansonsten trinke sie selbst.'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['X! Verteile 3 Schlücke an eine Person die größer ist als du, wenn möglich. Ansonsten trinke sie selbst.'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['X! Verteile 3 Schlücke an eine Person die kleiner ist als du, wenn möglich. Ansonsten trinke sie selbst.'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['X! Verteile 3 Schlücke an eine Person die schöner ist als du, wenn möglich. Ansonsten trinke sie selbst.'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['X! Verteile 3 Schlücke an eine Person die schicker angezogen ist als du, wenn möglich. Ansonsten trinke sie selbst.'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['X! Verteile so viele Schlücke, wie du Geschwister hast. Falls du ein Einzelkind bist, exe dein Glas.'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['Die Frau und der Mann mit den meisten festen Partnern trinken 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'single' },
    { text: ['X trinke 2 Schlücke, wenn du dich schon einmal in einer Schlange vorgedrängelt hast, ansonsten verteile sie.'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['Hey X, sexy Outfit! Verteile 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['X! entscheide welcher Spieler sein Glas exen muss!'], playersNeeded: 1, multiStep: false, category: 'single' },
    { text: ['X wer denkst du ist aktuell am betrunkensten? ...', 'Dichti verteilt 2 Schlücke.'], playersNeeded: 1, multiStep: true, category: 'single' },
    { text: ['X wer denkst du ist aktuell am nüchternsten? ...', 'Die Spaßbremse trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: true, category: 'single' },

    // Koffer packen
    { text: ['Ich packe meinen Koffer und nehme mit ... X beginnt. Verlierer trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'koffer' },
    { text: ['Ich packe meine Arbeitstasche und nehme mit ... X beginnt. Verlierer trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'koffer' },
    { text: ['Ich packe meinen Einkaufskorb und nehme mit ... X beginnt. Verlierer trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'koffer' },
    { text: ['Ich packe meine Sporttasche und nehme mit ... X beginnt. Verlierer trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'koffer' },
    { text: ['X beginnt mit einer Geste. Reihum muss diese Geste wiederholt werden und eine weitere ergänzt werden. Wer den ersten Fehler macht, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'koffer' },

    // Abstimmungen
    { text: ['Abstimmung! Pizza oder Pasta? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Urlaub in den Bergen oder am Strand. Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Lieber blind oder taub sein? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Überlebenskampf gegen einen Wolf oder ein Wildschwein? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Mehr Freizeit oder mehr Gehalt? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Nachwuchs steht an! Junge oder Mädchen? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Vodka Bull oder Jacky Cola? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Für immer flüstern oder für immer schreien? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Niemals duschen oder niemals Zähneputzen? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Eine Zombie-Apokalypse überleben oder im Mittelalter leben? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Jeden Tag einen neuen Job haben oder für immer denselben langweiligen Job machen? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Immer Muskelkater haben oder immer einen leichten Sonnenbrand haben? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Immer hungrig sein oder immer müde sein? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Nie wieder eine Waschmaschine oder eine Spülmaschine nutzen dürfen? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Gedanken lesen können, aber nicht abschalten können oder fliegen können? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Unter Wasser atmen können oder im Dunkeln sehen können? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Nur in die Vergangenheit reisen können oder nur in die Zukunft reisen können? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Wer ist die schönste Person? ...','Jede/s Hässlon ohne Stimme trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: true, category: 'vote' },
    { text: ['Abstimmung! Unbegrenzter Zugang zum Kino oder Essen bei McDonalds?','Ronald McDonald trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: true, category: 'vote' },
    { text: ['Abstimmung! Superman oder Spiderman','Spidy trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: true, category: 'vote' },
    { text: ['Abstimmung! Ein 10-fach besseres Gehör oder im Dunkeln sehen können? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Nike oder Adidas? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Lieber alle Sprachen der Welt oder mit Tieren sprechen können? Die Minderheit trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'vote' },
    { text: ['Abstimmung! Lieber 1 Jahr im Knast oder auf einer einsamen Insel?', 'Robinson Crusoe trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: true, category: 'vote' },

    // Einzelspieleraktivitäten
    { text: ['Kopfrechnen! X hat 5 Sekunden. Wie viel ist 12*17 ...', 'Lösung: 204. Liegt X richtig, dürfen 2 Schlücke verteilt werden, andernfalls selbst getrunken werden.'], playersNeeded: 1, multiStep: true, category: 'singlePlayerActivity' },
    { text: ['X erzähle einen Witz. Lacht oder schmunzelt niemand trinnkst du 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerActivity' },
    { text: ['X macht einen Purtzelbaum vorwärts oder trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerActivity' },
    { text: ['X macht einen Purtzelbaum rückwärts oder trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerActivity' },
    { text: ['X macht 3 Sekunden einen Handstand oder trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerActivity' },
    { text: ['X macht ein Rad oder trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerActivity' },
    { text: ['X macht einen Trick oder trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerActivity' },
    { text: ['X du hast 60 Sekunden um das Alphabet rückwärts aufzusagen. Trinke 2 Schlücke wenn du scheiterst.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerActivity' },
    { text: ['X darf 60 Sekunden nicht lächeln sonst trinkt er/sie 3 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerActivity' },
    { text: ['X zeig uns 5 Liegestützen oder trinke 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerActivity' },
    { text: ['X nenne uns etwas, das du magst. Alle Spieler, die das nicht mögen, trinken 3 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerActivity' },
    { text: ['X imitiere 5 Sekunden eine Schlange oder trinke 5 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerActivity' },
    { text: ['X imitiere 5 Sekunden einen Frosch oder trinke 5 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerActivity' },
    
    // auf die Eins
    { text: ['X welche Nudelsorte setzt du auf die 1? Wer dieser Sorte nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welches Kartoffelgericht setzt du auf die 1? Wer diesem Gericht nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welches Gericht würdest du wählen, wenn du dein Leben lang nur noch dieses essen dürftest? Wer diesem Gericht nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welches Erfrischungsgetränk setzt du auf die 1? Wer diesem Getränk nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welches Tier setzt du auf die 1? Wer diesem Tier nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welche Sportart im Fernsehen setzt du auf die 1? Wer dieser Sportart nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welches Anti-Kater-Mittel/Aktivität setzt du auf die 1? Wer diesem Mittel nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X was wäre deine Henkersmahlzeit? Wer diesem Gericht nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welches Urlaubsland setzt du auf die 1? Wer diesem Land nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welches Fleischgericht setzt du auf die 1? Wer diesem Gericht nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welchen Longdrink oder Cocktail setzt du auf die 1? Wer diesem Getränk nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welches Gemüse setzt du auf die 1? Wer diesem Gemüse nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welchen Film setzt du auf die 1? Wer diesem Film nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welches Süßigkeit setzt du auf die 1? Wer dieser Süßigkeit nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welche Pflanze, Blume oder Baum setzt du auf die 1? Wer diesem Grünzeug nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welche Sauce setzt du auf die 1? Wer dieser Sauce nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welches Haushaltsgerät setzt du auf die 1? Wer diesem Gerät nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welche Serie setzt du auf die 1? Wer dieser Serie nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welches Eiergericht setzt du auf die 1? Wer diesem Gericht nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welche Mehlspeise setzt du auf die 1? Wer dieser Speise nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    { text: ['X welchen Harry Potter Charakter setzt du auf die 1? Wer diesem Charakter nicht mit gutem Gewissen zustimmen kann, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'aufdieEins' },
    

    // Einzelspieler Satz bilden
    { text: ['X bilde einen Satz oder eine Story aus den Worten "Demokratie", "tanzen" und "geizig". Trinke 2 Schlücke wenn du scheiterst, andernfalls verteile 2.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerSatzbildung' },
    { text: ['X bilde einen Satz oder eine Story aus den Worten "Schere", "streichen" und "stolz". Trinke 2 Schlücke wenn du scheiterst, andernfalls verteile 2.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerSatzbildung' },
    { text: ['X bilde einen Satz oder eine Story aus den Worten "Nudeln", "arbeiten" und "bunt". Trinke 2 Schlücke wenn du scheiterst, andernfalls verteile 2.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerSatzbildung' },
    { text: ['X bilde einen Satz oder eine Story aus den Worten "Tisch", "tanzen" und "weich". Trinke 2 Schlücke wenn du scheiterst, andernfalls verteile 2.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerSatzbildung' },
    { text: ['X bilde einen Satz oder eine Story aus den Worten "Buch", "laufen" und "salzig". Trinke 2 Schlücke wenn du scheiterst, andernfalls verteile 2.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerSatzbildung' },
    { text: ['X bilde einen Satz oder eine Story aus den Worten "Zebra", "flüstern" und "klebrig". Trinke 2 Schlücke wenn du scheiterst, andernfalls verteile 2.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerSatzbildung' },
    { text: ['X bilde einen Satz oder eine Story aus den Worten "Kerze", "springen" und "eckig". Trinke 2 Schlücke wenn du scheiterst, andernfalls verteile 2.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerSatzbildung' },
    { text: ['X bilde einen Satz oder eine Story aus den Worten "Apfel", "singen" und "staubig". Trinke 2 Schlücke wenn du scheiterst, andernfalls verteile 2.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerSatzbildung' },
    { text: ['X bilde einen Satz oder eine Story aus den Worten "Koffer", "fahren" und "glitschig". Trinke 2 Schlücke wenn du scheiterst, andernfalls verteile 2.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerSatzbildung' },
    { text: ['X bilde einen Satz oder eine Story aus den Worten "Fenster", "hüpfen" und "kalt". Trinke 2 Schlücke wenn du scheiterst, andernfalls verteile 2.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerSatzbildung' },
    { text: ['X bilde einen Satz oder eine Story aus den Worten "Schuh", "schlafen" und "zäh". Trinke 2 Schlücke wenn du scheiterst, andernfalls verteile 2.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerSatzbildung' },
    { text: ['X bilde einen Satz oder eine Story aus den Worten "Turm", "schwimmen" und "mutig". Trinke 2 Schlücke wenn du scheiterst, andernfalls verteile 2.'], playersNeeded: 1, multiStep: false, category: 'singlePlayerSatzbildung' },
    
    // Zwei-Spieler-Aktivitäten
    { text: ['Berufe-Pantomime: X stellt für 10 Sekunden einen Beruf pantomimisch dar, X muss diesen erraten. Scheitern sie, trinken beide 2 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X schlürft Sekt/Wein aus X Bauchnabel oder beide trinken 3 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X gib X 5€ oder trinke 5 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X und X. Spielt 3 Runden Schere-Stein-Papier! Der Verlierer trinkt 2 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X gib X einen Kuss auf die Arschbacke oder trinkt beide 3 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X gib X einen Kuss auf die Wange oder trinkt beide 3 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X und X. Wer von euch ist größer? ...', 'Spielt keine Rolle, trinkt beide 2 Schlücke.'], playersNeeded: 2, multiStep: true, category: 'doublePlayerActivity' },
    { text: ['X summe für 30 Sekunden ein Lied, sodass X es errät. Bei Versagen trinken beide 2 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['Tanzen auf Kommando: X leg einen Song auf. X muss 10 Sekunden improvisiert dazu tanzen oder beide trinken 4 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X zeige eine Anzahl an Fingern hinter deinem Rücken. Wenn X die Anzahl errät trinkst du 5 Schlücke, andernfalls trinkt er/sie 1 Schluck.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X und X. Würfelt gegeneinander. Der Verlierer trinkt 2 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['Blickduell zwischen X und X. Wer zuerst lächelt oder wegschaut trinkt 2 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X mach X ein aufrichtiges Kompliment oder trinke 2 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X und X. Wer sein Glas zuerst leer getrunken hat darf 2 Schlücke verteilen. (Das Spiel kann in der Zwischenzeit weiter gehen)'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X und X. Gebt euch die Hand, stoßt an und trinkt 2 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X gib X so viele Schlücke wie du magst.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X errate die Lieblingsfarbe von X mit 2 Versuchen oder trinke 2 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    { text: ['X welche Augenfarbe hat X? Trinke 2 Schlücke wenn du falsch liegst, sonst verteile sie.'], playersNeeded: 2, multiStep: false, category: 'doublePlayerActivity' },
    
    
    // Drei-Spieler-Aktivitäten
    { text: ['Abstimmung! X, X und X. Einigt euch, wer von euch 2 Schlücke trinkt. (2 Stimmen für die Mehrheit)'], playersNeeded: 3, multiStep: false, category: 'tripplePlayerActivity' },
    { text: ['Blickdreieck! X, X und X. Bei 3 schaut jede Person einer der anderen beiden in die Augen. Schauen sich 2 Spieler gegenseitig an, habt ihr verloren und trinkt 3 Schlücke.'], playersNeeded: 3, multiStep: false, category: 'tripplePlayerActivity' },
    { text: ['Zahlen-Raten! X, X und X denkt an eine Zahl zwischen 1 und 8. Sprecht sie auf 3 laut aus. Stimmen 2 Zahlen überein trinken alle drei 3 Schlücke.'], playersNeeded: 3, multiStep: false, category: 'tripplePlayerActivity' },
    { text: ['Sychrontrinken! X, X und X trinkt gleichzeitig einen Schluck. Schafft ihr es nicht, trinken alle drei 3 Schlücke.'], playersNeeded: 3, multiStep: false, category: 'tripplePlayerActivity' },
    { text: ['Statuen-Standbild! X gibt ein Thema vor, X und X stellen dazu eine Statue nach. Die lustigere Statue verteilt 3 Schlücke.'], playersNeeded: 3, multiStep: false, category: 'tripplePlayerActivity' },
    { text: ['Daumen hoch! X, X und X schließt die Augen und zeigt den rechten Daumen entweder nach oben oder nach unten. Wenn ein Spieler alleine in eine Richtung zeigt, trinkt er/sie 3 Schlücke.'], playersNeeded: 3, multiStep: false, category: 'tripplePlayerActivity' },
    { text: ['X stelle eine Behauptung auf. X und X einigt euch, ob diese wahr oder falsch ist. Liegt ihr richtig, dürft ihr 2 Schlücke verteilen, sonst trinkt ihr 3 Schlücke.'], playersNeeded: 3, multiStep: false, category: 'tripplePlayerActivity' },
    { text: ['X denke an ein Tier. X und X ihr habt 3 ja/nein-Fragen um das Tier zu erraten, sonst trinkt ihr 3 Schlücke.'], playersNeeded: 3, multiStep: false, category: 'tripplePlayerActivity' },
    { text: ['X klatsche einen Takt (Maximal 10 Klatscher). X und X müssen diesen nachklatschen. Schaffen sie es, dürfen 2 Schlücke verteilt, sonst 3 getrunken werden.'], playersNeeded: 3, multiStep: false, category: 'tripplePlayerActivity' },
    { text: ['X, X und X aufgepasst! Wer zuletzt den Zeigefinger an der Nase hat, trinkt 3 Schlücke.'], playersNeeded: 3, multiStep: false, category: 'tripplePlayerActivity' },
    
    // Kategorien
    { text: ['Kategorie: Automarken! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Länder in der EU! wWr etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: US-Staaten! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Länder in Afrika! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Hauptstädte in Europa! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Fußballspieler! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Deutsche Promis! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Tiere! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Berufe! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Einheiten! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Gemüse! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Alkoholische Getränke! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Marken! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Pflanzen/Blumen! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Farben! wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Filmtitel! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Städte in Deutschland! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Berühmte Gebäude! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Smartphone-Apps! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Pokemon! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Harry Potter-Charaktere! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Serien! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: US-Präsidenten! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Deutsche Bundeskanzler! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Flüsse! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Länder in Asien! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Deutsche Politiker seit 1949 (exkl. Bundeskanzler)! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Süßigkeiten! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Begrüßungsfloskeln! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Alternativen um "Ja" zu sagen! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Alternativen um "Nein" zu sagen! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Ausreden fürs Zuspätkommen! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Ausreden für vergessene Hausaufgaben! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Dinge die man tun kann, wenn einem langweilig ist! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Momente im Leben, die nervig sind! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: McDonalds-Produkte! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    { text: ['Kategorie: Pasta-Gerichte! Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke. X beginnt.'], playersNeeded: 1, multiStep: false, category: 'categories' },
    
    // Sprichwörter
    { text: ['X vervollständige das folgende Sprichwort. Mühsam ernährt sich ...', 'Lösung: Mühsam ernährt sich das Eichhörnchen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Das ... in die Hand nehmen.', 'Lösung: Das Heft in die Hand nehmen.. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. ... mit Köpfen machen.', 'Lösung: Nägel mit Köpfen machen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Wer zuerst kommt, ...', 'Lösung: Wer zuerst kommt, malt zuerst. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. ... ist silber, ... ist gold', 'Lösung: Reden ist silber, Schweigen ist gold. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. ... kommt vor dem Fall.', 'Lösung: Hochmut kommt vor dem Fall. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Wer Wind säht, ...', 'Lösung: Wer Wind säht, wird Sturm ernten. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Der ... fängt den Wurm.', 'Lösung: Der frühe Vogel fängt den Wurm. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. ... hat Gold im Mund.', 'Lösung: Morgenstund hat Gold im Mund.. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Lügen haben ...', 'Lösung: Lügen haben kurze Beine. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. ... bei den Hörnern packen.', 'Lösung: Den Stier bei den Hörnern packen.. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Auf einem ... lernt man das ...', 'Lösung: Auf einem alten Pferd lernt man das Resiten. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. ... Eierkuchen.', 'Lösung: Friede, Freue, Eierkuchen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Das ... am Wagen sein.', 'Lösung: Das fünfte Rad am Wagen sein. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Da fällt es einem wie ....', 'Lösung: Da fällt es einem wie Schuppen von den Augen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Jetzt wird es hinten ...', 'Lösung: Jetzt wird es hinten höher wie vorne. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Den Kopf in ...', 'Lösung: Den Kopf in den Sand stecken. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Da wird ja der ... in der ...  verrückt', 'Lösung: Da wird ja der Hund in der Pfanne verrückt. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Da liegt der ... im Pfeffer.', 'Lösung: Da liegt der Hase im Pfeffer. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. ... macht auch Mist.', 'Lösung: Kleinvieh macht auch Mist. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Lieber den ... in der Hand als die ... auf dem ...', 'Lösung: Lieber den Spatz in der Hand als die Taube auf dem Dach. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Auch ein ... findet mal ein Korn.', 'Lösung: Auch ein blindes Huhn findet mal ein Korn. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Es ist noch kein ... vom Himmel gefallen.', 'Lösung: Es ist noch kein Meister vom Himmel gefallen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. ... will Weile haben.', 'Lösung: Gut Ding will Weile haben. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Wer rastet, ...', 'Lösung: Wer rastet, der rostet. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Wo gehobelt wird, ...', 'Lösung: Wo gehobelt wird, da fallen Späne. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Der ... steckt im Detail.', 'Lösung: Der Teufel steckt im Detail. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. ... schützt vor Torheit nicht.', 'Lösung: Alter schützt vor Torheit nicht.. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Der ... stinkt vom Kopfe her.', 'Lösung: Der Fisch stinkt vom Kopfe her. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Eine Schwalbe macht noch keinen ...', 'Lösung: Eine Schwalbe macht noch keinen Sommer. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Einem ... schaut man nicht ins Maul.', 'Lösung: Einem geschenkten Gaul schaut man nicht ins Maul. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Ein ... kommt selten alleine.', 'Lösung: Ein Unglück kommt selten allein. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Es wird nichts so ..., wie es gekocht wird.', 'Lösung: Es wird nicht so heiß gegessen, wie es gekocht wird. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. ... macht Diebe.', 'Lösung: Gelegenheit macht Diebe. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Ich glaub mein ... pfeift.', 'Lösung: Ich glaub mein Schwein pfeift. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. In der Not frisst der ...', 'Lösung: In der Not frisst der Teufel Fliegen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Ist die Katze aus dem Haus, ...', 'Lösung: Ist die Katze aus dem Haus, tanzen die Mäuse auf den Tischen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. ... wurde nicht an einem Tag ...', 'Lösung: Rom wurde nicht an einem Tag erbaut. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Schuster, bleib bei deinen ...', 'Lösung: Schuster, bleib bei deinen Leisten. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Steter Tropfen ...', 'Lösung: Steter Tropfen höhlt den Stein. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Viele ... verderben den ...', 'Lösung: Viele Köche verderben den Brei. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Was Hänschen nicht lernt, ...', 'Lösung: Was Hänschen nicht lernt, lernt Hans nimmer mehr. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Wer im ... sitzt, sollte nicht ...', 'Lösung: Wer im Glashaus sitzt, sollte nicht mit Steinen werfen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Mir egal, das ist doch ... wie ...', 'Lösung: Mir egal, das ist doch Jacke wie Hose. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Da waren die ... wohl größer als der ...', 'Lösung: Da waren die Augen wohl größer als der Magen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Ich ... dich aus wie eine ...', 'Lösung: Ich nehme dich aus wie eine Weihnachtsgans. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Das macht den ... auch nicht mehr fett.', 'Lösung: Das macht den Kohl/Braten auch nicht mehr fett. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Mit euch ist nicht gut ...', 'Lösung: Mit euch ist nicht gut Kirschen essen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Da lasse ich mir nicht die .. vom ... nehmen.', 'Lösung: Da lasse ich mir nicht die Butter vom Brot nehmen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Der ... im Schafspelz.', 'Lösung: Der Wolf im Schafspelz. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Seine ... ins Trockene bringen.', 'Lösung: Seine Schäfchen ins Trockene bringen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Dem ... Zucker geben.', 'Lösung: Dem Affen zucker geben. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. ... auf mein Haupt.', 'Lösung: Asche auf mein Haupt. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Jemandem einen ... ans Ohr quatschen.', 'Lösung: Jemandem einen Blumenkohl ans Ohr quatschen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Das ist mir ein ... mit sieben ...', 'Lösung: Das ist mir ein Buch mit sieben Siegeln. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Dem ... Zucker geben.', 'Lösung: Dem Affen zucker geben. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Jetzt mal ... bei die ...', 'Lösung: Jetzt mal Butter bei die Fische. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Der ... ist noch nicht gelutscht.', 'Lösung: Der Drops ist noch nicht gelutscht.. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Hinten ... die ...', 'Lösung: Hinten kackt die Ente. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Die ... ins Korn werfen', 'Lösung: Die Flinte ins Korn werfen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Da können wir jetzt auch mal ... gerade sein lassen', 'Lösung: Da können wir jetzt auch mal 5 gerade sein lassen. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    { text: ['X vervollständige das folgende Sprichwort. Es ist zum (Tier) (Verb).', 'Lösung: Es ist zum Mäuse melken. Lagst du richtig, verteile 2 Schlücke, sonst trinke sie selbst.'], playersNeeded: 1, multiStep: true, category: 'sprichwort' },
    
    // All Player Activities
    { text: ['Jeder Spieler nennt einen deutschen Bundeskanzler (Doppelnennungen erlaub) ...', 'Olaf Scholz trinkt 2 Schlücke, Konrad Adenauer verteilt 2 Schlücke.'], playersNeeded: 2, multiStep: true, category: 'allPlayerActivity' },
    { text: ['X beginnt mit einer Zeile seines Lieblingssongs. Reihum muss das Lied weiter ergänzt werden. Wer versagt, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['X startet. Gebt einen Löffel reihum nur mit dem Mund weiter. Wer versagt, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Satzbau: X startet und jeder fügt ein Wort zum Satz hinzu. Wer den Faden verliert oder den Satz beendet trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Rhyme-Time. X startet mit einem Begriff und reihum müssen passende Reime gefunden werden. Kein Reim? 2 Schlücke!'], playersNeeded: 2, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Schnapslotterie: X füllt Schnapsgläser heimlich mit Schnaps oder Wasser. Jeder wählt zufällig eines aus und trinkt.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Wahrheit oder Lüge: X erzählt eine Wahrheit oder Lüge über sich. Jeder Spieler entscheidet für sich ob er die Aussage glaubt oder nicht. Wer falsch liegt, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Jeder trinkt so viele Schlücke wie er Punkte in Flensburg gesammelt hat.'], playersNeeded: 0, multiStep: false, category: 'allPlayerActivity' },
    { text: ['X denke dir eine Kategorie aus und starte mit einem Begriff. Wer etwas wiederholt oder keine Idee mehr hat, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Malt alle einen Pimmel auf ein Blatt. X entscheidet, welcher der schönste ist. Der Gewinner verteilt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Die erste Person, die etwas dreieckiges im Raum berührt, verteilt 3 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Die erste Person, die etwas gelbes im Raum berührt, verteilt 3 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allPlayerActivity' },
    { text: ['X spiel das zuletzt gehörte Lied auf deinem Handy ab. Wenn die Mehrheit das Lied nicht mag, trinkst du 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['X fülle deinen Mund mit Wasser (oder deinem alkoholischen Getränk) und singe ein Lied. Die Person die das Lied errät, verteilt 3 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['X erzähle uns 2 Fakten und 1 Lüge über dich. Jeder Spieler rät nun, was davon die Lüge war. Wer falsch liegt, trinkt 2 Schlücke. Für jeden der den Spieler durchschaut, trinkt er 1 Schluck.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Flüsterpost! X beginnt. Kommt der Satz nicht korrekt einmal herum, trinken alle 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Theater! X spielt eine Filmszene nach. Wer den Film errät, darf 2 Schlücke verteilen.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Ich habe noch nie! X beginnt und dann einmal reihum. 2 Schlücke, wenn man etwas davon schon gemacht hat.'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Nennt reihum eine Zahl zwischen 1 und 9 ...', '2 Schlücke für alle mit einer geraden Zahl.'], playersNeeded: 0, multiStep: true, category: 'allPlayerActivity' },
    { text: ['X nennen deinen Lieblingsmusiker oder Band. Reihum müssen die Spieler Songtitel nennen. Wem nichts mehr einfällt oder etwas doppelt nennt, trinkt 2 Schlücke,'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Pantomime. X stelle einen Film nach. Wer diesen zuerst erkennt verteilt 2 Schlücke. Erkennt ihn keiner trinkst du selbst'], playersNeeded: 1, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Aufgepasst! Wer als letzter seinen linken(!) Daumen im Mund hat, trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Sagt reihum was ihr an X toll findet. X beginnt. Wem nichts einfällt trinkt 2 Schlücke.'], playersNeeded: 2, multiStep: false, category: 'allPlayerActivity' },
    { text: ['Einigt euch, wer die coolste Person am Tisch ist.', 'Coolio McCoolsen trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: true, category: 'allPlayerActivity' },
    { text: ['Einigt euch, wer die betrunkenste Person am Tisch ist.', 'Entspann you und verteile 2 Schlücke.'], playersNeeded: 0, multiStep: true, category: 'allPlayerActivity' },
    
    // Trinkregeln
    { text: ['Alle Spieler dürfen ab sofort nur noch mit dem Nachnamen angesprochen werden. Bei Verstoß 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'drinkRules' },
    { text: ['X! Du sprichst ab sofort Englisch. Bei jedem Verstoß trinkst du einen Schluck.'], playersNeeded: 1, multiStep: false, category: 'drinkRules' },
    { text: ['Wer ab sofort X in die Augen schaut, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'drinkRules' },
    { text: ['Wer ab sofort mit X spricht, trinkt 2 Schlücke.'], playersNeeded: 1, multiStep: false, category: 'drinkRules' },
    { text: ['Die Wörter Wein, Bier und Sekt sind ab sofort verboten. Bei Verstoß 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'drinkRules' },
    { text: ['X überlegt sich eine Trinkregel. Wer diese vergisst, trinkt die gleiche Anzahl an Schlücken nochmal.'], playersNeeded: 1, multiStep: false, category: 'drinkRules' },
    { text: ['Wer ab sofort ein Schimpfwort oder eine Beleidgung benutzt, trinkt 2 Schlücke.'], playersNeeded: 0, multiStep: false, category: 'drinkRules' },
    { text: ['Alle Handys weg! Die erste Person, die auf ihr Handy schaut, trinkt 5 Schlücke. (Spielleiter ausgeschlossen)'], playersNeeded: 0, multiStep: false, category: 'drinkRules' },
    { text: ['X du bist ab sofort Bauchredner. Zieh eine Socke auf deine Hand und benutz sie, um zu sprechen. Für jedes Vergessen trinkst du einen Schluck.'], playersNeeded: 1, multiStep: false, category: 'drinkRules' },
    { text: ['X du flüsterst ab sofort. Für jedes Vergessen trinkst du einen Schluck.'], playersNeeded: 1, multiStep: false, category: 'drinkRules' },
    { text: ['X sag ab sofort nach jedem Satz "Over". Für jedes Vergessen trinkst du einen Schluck.'], playersNeeded: 1, multiStep: false, category: 'drinkRules' },
    
];

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