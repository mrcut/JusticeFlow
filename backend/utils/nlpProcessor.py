import spacy
from flask import Flask, request, jsonify

app = Flask(__name__)
nlp = spacy.load("fr_core_news_sm")  # 📌 Modèle NLP en français

@app.route("/extract_keywords", methods=["POST"])
def extract_keywords():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "Aucun texte fourni"}), 400

    doc = nlp(text)
    keywords = list(set([token.lemma_ for token in doc if token.pos_ in ["NOUN", "VERB", "ADJ"]]))

    return jsonify({"keywords": keywords})

if __name__ == "__main__":
    app.run(port=5002, debug=True)
