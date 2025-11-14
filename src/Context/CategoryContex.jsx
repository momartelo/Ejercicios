import { createContext, useContext, useEffect, useState } from "react";
import { getLocalProducts } from "../Functions/ProductsLocalAPI";

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categorias, setCategorias] = useState(["Todas"]);
  const [category, setCategory] = useState("Todas");
  const [isLoading, setIsLoading] = useState(true);

  // 🔄 Función reutilizable para cargar categorías
  const loadCategorias = async () => {
    const data = await getLocalProducts();
    const categoriasUnicas = ["Todas", ...new Set(data.map((p) => p.category))];
    setCategorias(categoriasUnicas);
  };

  // 🔄 Se llama solo al iniciar la app
  useEffect(() => {
    const init = async () => {
      try {
        await loadCategorias();
      } catch (error) {
        console.error("Error cargando categorías:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  // 🔄 Se expone esta función para refrescar al editar/agregar productos
  const refreshCategorias = async () => {
    try {
      await loadCategorias();
    } catch (error) {
      console.error("Error refrescando categorías:", error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categorias,
        category,
        setCategory,
        isLoading,
        refreshCategorias,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
