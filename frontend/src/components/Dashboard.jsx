import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import History from "./History"; // 📌 Intégration du composant History

// 📊 Enregistre Chart.js
Chart.register(...registerables);

const Dashboard = () => {
  const [data, setData] = useState({
    uploadedFiles: [],
    history: [],
    totalSearches: 0,
    topSearches: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("📂 Données Dashboard reçues :", response.data);
        setData(
          response.data || {
            uploadedFiles: [],
            history: [],
            totalSearches: 0,
            topSearches: [],
          }
        );
      } catch (err) {
        console.error("❌ Erreur récupération du Dashboard :", err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <Box sx={{ p: 4, overflowY: "auto", maxHeight: "90vh" }}>
      {" "}
      {/* 📌 Ajout du scroll */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        📊 Tableau de bord
      </Typography>
      {/* 📂 DOCUMENTS UPLOADÉS */}
      <Card sx={{ mb: 3, p: 2, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h6">📁 Documents uploadés récemment</Typography>
        {data.uploadedFiles.length > 0 ? (
          data.uploadedFiles.map((file, index) => (
            <Typography key={index} sx={{ mt: 1 }}>
              📄 {file.filename} - {new Date(file.uploadedAt).toLocaleString()}
            </Typography>
          ))
        ) : (
          <Typography color="textSecondary">Aucun document uploadé</Typography>
        )}
      </Card>
      {/* 🔍 HISTORIQUE DES RECHERCHES */}
      <Card sx={{ mb: 3, p: 2, backgroundColor: "#e9ecef" }}>
        <Typography variant="h6">📜 Historique des recherches</Typography>
        <History /> {/* 📌 Intégration du composant History */}
      </Card>
      {/* 🔝 RECHERCHES POPULAIRES */}
      <Card sx={{ mb: 3, p: 2, backgroundColor: "#f1f3f5" }}>
        <Typography variant="h6">🔥 Recherches populaires</Typography>
        {data.topSearches.length > 0 ? (
          <List>
            {data.topSearches.map((search, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`${index + 1}. ${search._id} (${search.count} fois)`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="textSecondary">
            Aucune recherche populaire
          </Typography>
        )}
      </Card>
      {/* 📊 GRAPHIQUE DES RECHERCHES POPULAIRES */}
      {data.topSearches.length > 0 && (
        <Card sx={{ p: 3, backgroundColor: "#f8f9fa" }}>
          <Typography variant="h6">
            📈 Graphique des recherches populaires
          </Typography>
          <Box sx={{ height: 250, mt: 2 }}>
            {" "}
            {/* 📌 Hauteur réduite ici */}
            <Bar
              data={{
                labels: data.topSearches.map((search) => search._id),
                datasets: [
                  {
                    label: "Nombre de recherches",
                    data: data.topSearches.map((search) => search.count),
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false, // 📌 Permet un meilleur ajustement
                plugins: {
                  legend: {
                    position: "top", // 📌 Place la légende en haut
                  },
                },
              }}
            />
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default Dashboard;
