# 🏛️ JusticeFlow - Analyse Juridique IA

## 📌 Description

JusticeFlow est une application d'analyse juridique qui permet d'extraire des mots-clés à partir de textes et de recommander des articles de loi pertinents. Il utilise **MongoDB**, **Express**, **React**, **Node.js (MERN)** pour le backend et **Flask** pour le traitement NLP avec **spaCy**.

## 🚀 Installation

### 1️⃣ **Cloner le projet**

```
git clone https://github.com/votre-repo/JusticeFlow.git
cd JusticeFlow
```

### 2️⃣ **Installation du Backend (Node.js)**

```
cd backend
npm install
```

Crée un fichier `.env` dans **backend/** avec :

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FLASK_API_URL=http://127.0.0.1:5001
FLASK_NLP_URL=http://127.0.0.1:5001
OPENAI_API_KEY=your_openai_api_key
```

### 3️⃣ **Installation du Frontend (React)**

```
cd ../frontend
npm install
```

### 4️⃣ **Installation du Backend NLP (Flask)**

```
cd ../backend
python -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
python -m spacy download fr_core_news_sm
```

### 5️⃣ **Lancer les serveurs**

#### 🔹 **Backend Node.js**

```
cd backend
npm start
```

#### 🔹 **Frontend React**

```
cd frontend
npm run dev
```

#### 🔹 **Serveur Flask (NLP)**

```
cd backend
source venv/bin/activate  # (Windows: venv\Scripts\activate)
gunicorn -w 4 -b 0.0.0.0:5001 nlpProcessor:app
```

## 📜 **Dépendances Backend (Flask)**

Crée un fichier `**requirements.txt**` et ajoute :

```
flask
flask-cors
requests
spacy
pymongo
gunicorn
```

Installe-les avec :

```
pip install -r requirements.txt
```

Télécharge le modèle spaCy :

```
python -m spacy download fr_core_news_sm
```

## 📂 **Structure du Projet**

```
JusticeFlow/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   ├── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   ├── public/
│   ├── .env
```

## 🎯 **Fonctionnalités**

✅ Recherche juridique sur **Légifrance**

✅ Analyse NLP avec **spaCy**

✅ Recommandation d'articles légaux via **ChatGPT**

✅ Historique des recherches 

✅ Authentification JWT 

✅ Téléversement et analyse de documents **PDF/TXT** 

✅ Tableau de bord avec statistiques et visualisations

## 📜 **Licence**

Projet à but éducatif - Open Source ⚖️