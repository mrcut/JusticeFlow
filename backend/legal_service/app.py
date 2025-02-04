import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pylegifrance import LegiHandler, recherche_JURI  # Utilisation correcte
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # 🔹 Autoriser toutes les requêtes

# Charger les variables d'environnement
load_dotenv()

# Initialisation de l'API Légifrance
client = LegiHandler()
client.set_api_keys(
    legifrance_api_key=os.getenv("LEGIFRANCE_CLIENT_ID"),
    legifrance_api_secret=os.getenv("LEGIFRANCE_CLIENT_SECRET")
)

app = Flask(__name__)
CORS(app)  # Autorise les requêtes depuis le frontend

@app.route('/api/legal/search', methods=['GET'])
def search_article():
    search_query = request.args.get('query', '')

    if not search_query:
        return jsonify({"error": "Aucun terme de recherche fourni"}), 400

    try:
        print(f"🔍 Recherche en cours pour : {search_query}")

        # 🔹 Suppression de `max_resultats`
        resultats = recherche_JURI(search=search_query)

        return jsonify(resultats)
    except Exception as e:
        print(f"❌ Erreur serveur : {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
