import { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 🔹 Pour naviguer après l'upload

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "✅ Réponse API complète :",
        JSON.stringify(response.data, null, 2)
      );

      if (
        Array.isArray(response.data?.searchResults) &&
        response.data.searchResults.length > 0
      ) {
        console.log(
          "🔄 Redirection vers /results avec :",
          response.data.searchResults
        );
        navigate("/results", {
          state: { results: response.data.searchResults },
        });
      } else {
        setError("Aucun résultat trouvé.");
      }
    } catch (error) {
      console.error(
        "❌ Erreur upload :",
        error.response?.data || error.message
      );
      setError("Erreur lors de l'envoi du fichier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Upload de Document
      </Typography>
      <input type="file" onChange={handleFileChange} accept=".pdf,.txt" />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mt: 2 }}
      >
        Envoyer
      </Button>
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default UploadFile;
