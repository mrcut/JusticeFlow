require("dotenv").config();
const axios = require("axios");

const getLegifranceToken = async () => {
  try {
    const response = await axios.post(
      "https://oauth.piste.gouv.fr/api/oauth/token",
      null,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        params: {
          grant_type: "client_credentials",
          client_id: process.env.LEGIFRANCE_CLIENT_ID,
          client_secret: process.env.LEGIFRANCE_CLIENT_SECRET,
          scope: "legifrance",
        },
      }
    );

    console.log("Token OAuth obtenu :", response.data.access_token); // ✅ Voir si un token est reçu

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Erreur OAuth :",
      error.response ? error.response.data : error.message
    );
    throw new Error("Impossible d'obtenir le token OAuth.");
  }
};

module.exports = { getLegifranceToken };
