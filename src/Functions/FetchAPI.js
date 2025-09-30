import axios from "axios";

export const getProductsAPI = async () => {
  const api_URL = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.get(api_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error al obtener los datos");
  }
};
