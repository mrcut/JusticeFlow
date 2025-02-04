const express = require("express");
const File = require("../models/File");
const SearchHistory = require("../models/SearchHistory");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

// 📊 Route pour récupérer les données du Dashboard
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    console.log("✅ Requête Dashboard reçue pour l'utilisateur :", req.user.id);

    // Récupérer l'historique des recherches
    const history = await SearchHistory.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(10); // 📌 On limite à 10 recherches récentes

    // Récupérer les fichiers uploadés
    const uploadedFiles = await File.find({ user: req.user.id })
      .select("filename uploadedAt")
      .sort({ uploadedAt: -1 })
      .limit(5); // 📌 Limite à 5 fichiers récents

    // 📊 Calcul des statistiques
    const totalSearches = await SearchHistory.countDocuments({
      userId: req.user.id,
    });

    const topSearches = await SearchHistory.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(req.user.id) }, // ✅ Convertit userId en ObjectId
      },
      {
        $group: { _id: "$query", count: { $sum: 1 } },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      }, // 📌 Afficher les 5 termes les plus recherchés
    ]);

    console.log("📂 Fichiers récupérés :", uploadedFiles);
    console.log("🔍 Historique récupéré :", history);
    console.log("📊 Statistiques :", { totalSearches, topSearches });

    res.json({
      uploadedFiles,
      history,
      totalSearches,
      topSearches,
    });
  } catch (err) {
    console.error("❌ Erreur récupération du Dashboard :", err.message);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du dashboard" });
  }
});

module.exports = router;
