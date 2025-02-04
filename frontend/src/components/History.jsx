import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token"); // 📌 Récupère le token stocké

        if (!token) {
          setError("Utilisateur non connecté");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/history", {
          headers: {
            Authorization: `Bearer ${token}`, // 🔑 Ajoute le token dans l'Authorization
          },
        });

        setHistory(response.data);
      } catch (err) {
        console.error("❌ Erreur récupération historique :", err);
        setError("Impossible de récupérer l'historique");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        📜 Historique des recherches
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        history.map((item, index) => (
          <Typography key={index} variant="body1">
            🔍 {item.query} - {new Date(item.date).toLocaleString()}
          </Typography>
        ))
      )}
    </Box>
  );
};

export default History;
