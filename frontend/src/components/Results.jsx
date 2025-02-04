import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Card, CardContent, Typography, Pagination } from "@mui/material";

const Results = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  console.log("📜 Résultats reçus dans /results :", results); // 🔍 Debug

  // ✅ Vérifie si results est bien un tableau
  if (!Array.isArray(results)) {
    console.error("❌ results n'est pas un tableau :", results);
    return (
      <Typography variant="h6" color="error">
        Erreur d'affichage des résultats.
      </Typography>
    );
  }

  // 🌟 PAGINATION
  const [page, setPage] = useState(1);
  const resultsPerPage = 5;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedResults = results.slice(
    (page - 1) * resultsPerPage,
    page * resultsPerPage
  );

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        📜 Résultats de la recherche
      </Typography>

      {/* 🛠 Vérifie si results contient des données */}
      {paginatedResults.length > 0 ? (
        paginatedResults.map((article, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
              borderLeft: "6px solid #D4AF37",
              backgroundColor: "#FAF9F6",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ color: "#003366" }}>
                📌 {article.titles?.[0]?.id || "Référence inconnue"}
              </Typography>
              <Typography variant="body1">
                {article.text
                  ?.replace(/<mark>/g, "")
                  .replace(/<\/mark>/g, "") || "Aucune description disponible."}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Origine : {article.origin || "Non spécifiée"}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h6" color="error">
          Aucun résultat trouvé.
        </Typography>
      )}

      {/* PAGINATION */}
      {results.length > resultsPerPage && (
        <Pagination
          count={Math.ceil(results.length / resultsPerPage)}
          page={page}
          onChange={handleChange}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
          color="primary"
        />
      )}
    </Box>
  );
};

export default Results;
