import axios from "axios";

export const getProductsAPI = async () => {
  const apiUrl = import.meta.env.VITE_PAGE_API_URL;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error al obtener los datos");
  }
};

export const getProductsFakeAPI = async () => {
  const apiFakeUrl = import.meta.env.VITE_FAKE_API_URL;
  try {
    const response = await axios.get(apiFakeUrl);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error al obtener los datos");
  }
};
