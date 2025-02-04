const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// 🔑 Inscription
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("📌 Mot de passe reçu :", password); // 🔹 Vérifier le mot de passe brut

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("🔐 Mot de passe hashé :", hashedPassword); // 🔹 Vérifier si le hash est correct

    // Création de l'utilisateur
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔑 Connexion
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifie si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ Utilisateur introuvable !");
      return res.status(400).json({ error: "Utilisateur introuvable" });
    }

    console.log("🔑 Utilisateur trouvé :", user.email);
    console.log("📌 Mot de passe stocké :", user.password);
    console.log("📌 Mot de passe entré :", password);

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 bcrypt.compare() =>", isMatch);

    if (!isMatch) {
      console.log("❌ Mot de passe incorrect !");
      return res.status(400).json({ error: "Mot de passe incorrect" });
    }

    // Génère le token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("✅ Connexion réussie !");
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("⚠️ Erreur serveur :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 🔑 Vérification du token
router.get("/me", async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Accès refusé" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Token invalide" });
  }
});

module.exports = router;
