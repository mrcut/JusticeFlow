import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api/legal"; // URL de ton backend

const api = {
  searchLaw: async (code, query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { code, query },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la recherche légale :", error);
      return { error: "Impossible de récupérer les résultats" };
    }
  },
};

export default api;
