require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios"); // 🔹 Ajoute Axios pour appeler Flask
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const historyRoutes = require("./routes/historyRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const predictionsRoutes = require("./routes/predictionsRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connexion MongoDB réussie"))
  .catch((err) => console.log("❌ Erreur MongoDB :", err));

// ✅ Ajoute la redirection vers Flask pour la recherche Légifrance
app.get("/api/legal/search", async (req, res) => {
  const { query } = req.query;

  try {
    console.log(`🔍 Recherche en cours pour : ${query}`);

    const flaskResponse = await axios.get(
      "http://127.0.0.1:5001/api/legal/search",
      {
        params: { query },
      }
    );

    console.log("✅ Réponse Flask reçue !");
    res.json(flaskResponse.data);
  } catch (error) {
    console.error("❌ Erreur API Flask :", error.message);
    res.status(500).json({ error: "Problème de connexion à l’API Flask" });
  }
});

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api/history", historyRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/predictions", predictionsRoutes);
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`)
);
