import json

def add_key_to_json(file_path, new_key, new_value, output_file):
    """
    Liest ein JSON-File ein, fügt jedem Objekt einen neuen Key-Value-Paar hinzu
    und speichert das Ergebnis in einer neuen Datei.

    :param file_path: Pfad zur Input-JSON-Datei
    :param new_key: Name des neuen Keys
    :param new_value: Wert des neuen Keys
    :param output_file: Pfad zur Output-JSON-Datei
    """
    try:
        # JSON-Datei einlesen
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)

        # Überprüfen, ob das JSON eine Liste ist
        if isinstance(data, list):
            for obj in data:
                if isinstance(obj, dict):
                    obj[new_key] = new_value
        else:
            raise ValueError("Die JSON-Datei muss eine Liste von Objekten enthalten.")

        # Aktualisierte Daten in die Ausgabedatei speichern
        with open(output_file, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)

        print(f"Der Schlüssel '{new_key}' wurde erfolgreich hinzugefügt und in {output_file} gespeichert.")

    except Exception as e:
        print(f"Ein Fehler ist aufgetreten: {e}")

# Beispiel-Aufruf
def main():
    input_file  = "/Users/thomas/Documents/Programmierprojekte/WebApplikations/SeccoloGithub/js/activities.json"  # Ersetze durch deinen JSON-Dateipfad
    output_file = "/Users/thomas/Documents/Programmierprojekte/WebApplikations/SeccoloGithub/js/activitiesNEW.json"  # Ersetze durch den gewünschten Ausgabepfad
    new_key     = "endAfterRows"  # Name des neuen Schlüssels
    new_value   = 0  # Wert des neuen Schlüssels

    add_key_to_json(input_file, new_key, new_value, output_file)

if __name__ == "__main__":
    main()