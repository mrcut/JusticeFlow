const express = require("express");
const SearchHistory = require("../models/SearchHistory");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 🔍 Route pour récupérer l'historique
router.get("/", authMiddleware, async (req, res) => {
  try {
    console.log(
      "✅ Requête historique reçue pour l'utilisateur :",
      req.user.id
    );

    const history = await SearchHistory.find({ userId: req.user.id }).sort({
      date: -1,
    });

    console.log("🔍 Données renvoyées :", history);
    res.json(history);
  } catch (err) {
    console.error("❌ Erreur récupération historique :", err.message);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'historique" });
  }
});

// ✅ Nouvelle route pour sauvegarder une recherche manuelle (barre de recherche)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { query, results } = req.body;

    if (!query) {
      return res
        .status(400)
        .json({ error: "Requête invalide : Aucun texte fourni" });
    }

    // 🔹 Enregistrer la recherche
    const newSearch = new SearchHistory({
      userId: req.user.id,
      query,
      results,
    });

    await newSearch.save();
    console.log("✅ Recherche enregistrée :", query);
    res.status(201).json({ message: "Recherche enregistrée avec succès" });
  } catch (err) {
    console.error("❌ Erreur enregistrement historique :", err.message);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement de la recherche" });
  }
});

module.exports = router;
