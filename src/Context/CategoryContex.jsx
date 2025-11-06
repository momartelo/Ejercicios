import { createContext, useContext, useEffect, useState } from "react";
import { getProductsFakeAPI } from "../Functions/FetchAPI";

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categorias, setCategorias] = useState(["Todas"]);
  const [category, setCategory] = useState("Todas");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getProductsFakeAPI();
        const categoriasUnicas = [
          "Todas",
          ...new Set(data.map((p) => p.category)),
        ];
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categorias, category, setCategory, isLoading }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
