const express = require("express");
const { OpenAI } = require("openai");
require("dotenv").config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🔍 Route pour obtenir des recommandations d'articles juridiques
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Aucun texte fourni" });
    }

    console.log("📨 Envoi du texte à OpenAI :", text);

    // 🔹 Requête à l'API OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Assure-toi d'avoir accès à GPT-4-Turbo ou change pour gpt-3.5-turbo
      messages: [
        {
          role: "user",
          content: `Quels articles juridiques sont pertinents pour cette situation ? "${text}"`,
        },
      ],
      temperature: 0.7,
    });

    const recommendations =
      response.choices[0]?.message?.content || "Aucune recommandation trouvée.";

    res.json({ recommendations });
  } catch (err) {
    console.error("❌ Erreur OpenAI :", err);
    res.status(500).json({ error: "Erreur lors de la requête à OpenAI" });
  }
});

module.exports = router;
