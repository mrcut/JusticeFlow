import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5001/api/legal/search",
        { params: { query } }
      );

      const results = response.data.results || [];

      // 🔹 Vérifier si l'utilisateur est connecté
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn(
          "⚠ L'utilisateur n'est pas connecté. L'historique ne sera pas enregistré."
        );
      } else {
        // 🔹 Sauvegarder l'historique côté backend
        await axios.post(
          "http://localhost:5000/api/history/add",
          { query, results },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      navigate("/results", { state: { results } });
    } catch (err) {
      console.error("Erreur :", err);
      setError("Aucun résultat trouvé.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Recherche juridique
      </Typography>
      {loading && <Typography>Recherche en cours...</Typography>}

      <TextField
        label="Entrez votre recherche"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2, backgroundColor: "white", borderRadius: 1, width: "100%" }}
      />

      <Button variant="contained" color="primary" onClick={handleSearch}>
        Rechercher
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default SearchBar;
