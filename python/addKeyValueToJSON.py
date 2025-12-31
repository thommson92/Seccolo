import os
import json

def add_ids_to_json_files(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith('.json'):
            filepath = os.path.join(folder_path, filename)
            basename = os.path.splitext(filename)[0]
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                if not isinstance(data, list):
                    print(f"{filename} enthält kein Array.")
                    continue
                for idx, item in enumerate(data):
                    item['id'] = f"{basename}{idx}"
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=4)
                print(f"IDs zu {filename} hinzugefügt.")
            except Exception as e:
                print(f"Fehler bei {filename}: {e}")

if __name__ == "__main__":
    folder = "/Users/thomas/Documents/Programmierprojekte/WebApplikations/SeccoloGithub/activities"
    add_ids_to_json_files(folder)