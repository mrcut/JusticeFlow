const express = require("express");
const multer = require("multer");
const File = require("../models/File");
const authMiddleware = require("../middleware/authMiddleware");
const extractTextFromFile = require("../utils/extractText");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const axios = require("axios"); // 🔹 Ajoute axios si ce n'est pas déjà fait

// 📂 Route d'upload de fichier + Recherche Légifrance
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      console.log("📂 Fichier reçu :", req.file);

      if (!req.file) {
        console.error("❌ Aucun fichier reçu !");
        return res.status(400).json({ error: "Aucun fichier fourni" });
      }
      console.log("📂 Enregistrement du fichier en cours...");

      // 🔹 Extraction du texte
      const extractedText = await extractTextFromFile({
        contentType: req.file.mimetype,
        data: req.file.buffer,
      });

      console.log("📝 Texte extrait :", extractedText);

      const newFile = new File({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer,
        user: req.user.id, // 📌 Associe le fichier à l'utilisateur
      });

      await newFile.save();
      console.log("✅ Fichier enregistré :", newFile.filename);

      // 🔍 Envoi de la recherche API Flask
      console.log("🔍 Recherche avec :", extractedText);
      const searchResponse = await axios.get(
        "http://127.0.0.1:5001/api/legal/search",
        { params: { query: extractedText } }
      );

      console.log("✅ Résultats API :", searchResponse.data.results);

      res.json({
        message:
          "Fichier enregistré et analyse juridique effectuée avec succès",
        fileId: newFile._id,
        searchResults: searchResponse.data.results || [],
      });
    } catch (err) {
      console.error("❌ Erreur lors de l'enregistrement du fichier :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de l'enregistrement du fichier" });
    }
  }
);

module.exports = router;
