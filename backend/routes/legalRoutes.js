const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/search", async (req, res) => {
  const { code, query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Aucun terme de recherche fourni." });
  }

  try {
    // 🔹 Remplace l'appel à PISTE par un appel à ton API Flask
    const response = await axios.get(`http://127.0.0.1:5001/api/legal/search`, {
      params: { code, query },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Erreur lors de l'appel à l'API Flask :",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
