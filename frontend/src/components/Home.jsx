import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import SearchBar from "./Search";

// 📂 Liste des vidéos pour l'arrière-plan
const videos = [
  "../assets/videos/droit1.mp4",
  "../assets/videos/droit2.mp4",
  "../assets/videos/droit3.mp4",
  "../assets/videos/droit4.mp4",
];

function Home() {
  const typedJSRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(""); // Vidéo sélectionnée
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [uploadMessage, setUploadMessage] = useState(""); // 🔹 Message après upload
  const [extractedText, setExtractedText] = useState(""); // 🔹 Texte extrait après upload
  const navigate = useNavigate();

  useEffect(() => {
    // 🎥 Sélection d'une vidéo aléatoire
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    setSelectedVideo(randomVideo);

    // 📝 Texte animé Typed.js
    const typedJS = new Typed(typedJSRef.current, {
      strings: [
        "Votre plateforme de prédiction judiciaire",
        "Uploadez un document ou saisissez du texte pour obtenir une prédiction",
      ],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 500,
      startDelay: 500,
      loop: true,
    });

    return () => typedJS.destroy();
  }, []);

  // 🔄 Vérifier l'authentification et rediriger si besoin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // 📂 Gestion du Drag & Drop
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token"); // Récupération du token

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

      const res = response.data;
      console.log("📜 Réponse complète du backend :", res);

      if (res.searchResults) {
        console.log("✅ Résultats API :", res);
        navigate("/results", { state: { results: res.searchResults || [] } });
      } else {
        console.error(
          "❌ Erreur upload :",
          res.error || "Réponse inattendue du serveur"
        );
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'analyse du document.", error);
    }
  }, []);

  // 📂 Configuration du Drag & Drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    multiple: false, // Permet d'uploader un seul fichier à la fois
  });

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
        padding: 0,
      }}
    >
      {/* 🎥 Vidéo d'arrière-plan */}
      {selectedVideo && (
        <Box
          component="video"
          src={selectedVideo}
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          Votre navigateur ne supporte pas les vidéos HTML5.
        </Box>
      )}
      {/* 🔲 Overlay sombre */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      {/* 📜 Contenu principal */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: 3,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
          JusticeFlow
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          <span ref={typedJSRef} />
        </Typography>

        {/* 🔎 Barre de recherche */}
        <SearchBar />

        {/* 📂 Drag & Drop pour l'upload */}
        <Box
          {...getRootProps()}
          sx={{
            mt: 3,
            p: 3,
            border: "2px dashed #ffffff",
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography variant="body1">
              📂 Relâchez le fichier ici...
            </Typography>
          ) : (
            <Typography variant="body1">
              Glissez & déposez un fichier ici, ou cliquez pour sélectionner
            </Typography>
          )}
        </Box>

        {/* 🔔 Message après upload */}
        {uploadMessage && (
          <Typography color="success" sx={{ mt: 2 }}>
            {uploadMessage}
          </Typography>
        )}

        {/* 📄 Affichage du texte extrait */}
        {extractedText && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 2,
              textAlign: "left",
              maxHeight: 200,
              overflowY: "auto",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Texte extrait :
            </Typography>
            <Typography variant="body2">{extractedText}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Home;
