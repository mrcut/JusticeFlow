import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const Predictions = () => {
  const [text, setText] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    try {
      setError(""); // Reset error
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/predictions",
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Réponse API :", response.data);
      setRecommendations(response.data.recommendations);
    } catch (err) {
      console.error("❌ Erreur analyse NLP :", err);
      setError("Erreur lors de l'analyse. Vérifiez votre texte.");
    }
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        🧠 Analyse Juridique & Recommandations
      </Typography>

      {/* Champ de saisie */}
      <TextField
        fullWidth
        label="Entrez votre situation juridique"
        multiline
        rows={4}
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" onClick={handleAnalyze}>
        Analyser le texte
      </Button>

      {/* Erreur */}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Affichage des recommandations */}
      {recommendations && (
        <Card sx={{ mt: 4, textAlign: "left", p: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: "#003366", mb: 2 }}>
              📜 Articles Juridiques Recommandés :
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {recommendations}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Predictions;
