import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/register",
        formData
      );
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'inscription");
    }
  };

  return (
    <Box sx={{ p: 3, textAlign: "center", maxWidth: 400, mx: "auto" }}>
      <Typography variant="h5">Inscription</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Nom d'utilisateur"
          fullWidth
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="password"
          label="Mot de passe"
          type="password"
          fullWidth
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          S'inscrire
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}
    </Box>
  );
};

export default Register;
