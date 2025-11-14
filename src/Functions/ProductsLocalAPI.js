import axios from "axios";

const localApiUrl = import.meta.env.VITE_LOCAL_API_URL;

// GET: obtener todos los productos
export const getLocalProducts = async () => {
  try {
    const response = await axios.get(localApiUrl);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw new Error("Error al obtener productos");
  }
};

// POST: crear un producto
export const createLocalProduct = async (producto) => {
  try {
    const response = await axios.post(localApiUrl, producto);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw new Error("Error al crear producto");
  }
};

// PUT: actualizar un producto
export const updateLocalProduct = async (id, producto) => {
  try {
    const response = await axios.put(`${localApiUrl}/${id}`, producto);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw new Error("Error al actualizar producto");
  }
};

// DELETE: eliminar un producto
export const deleteLocalProduct = async (id) => {
  try {
    console.log(id);
    const response = await axios.delete(`${localApiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw new Error("Error al eliminar producto");
  }
};
