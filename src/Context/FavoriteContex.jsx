import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContex";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const cargarFavoritos = async () => {
      if (!isLoggedIn || !user) {
        setFavorites([]);
        return;
      }

      try {
        const data = await fetch(
          `http://localhost:3001/favorites/${user.id}`
        ).then((r) => r.json());

        setFavorites(data);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      }
    };

    cargarFavoritos();
  }, [isLoggedIn, user]);

  // Función para alternar favorito
  const toggleFavorite = async (productId) => {
    if (!user || !productId) return;

    // Convertir siempre a string para coincidir con los ids de tu db
    const productIdStr = String(productId);

    try {
      await fetch("http://localhost:3001/favorites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId: productIdStr }),
      });

      setFavorites((prev) => {
        const exists = prev.some((f) => String(f.productId) === productIdStr);
        if (exists)
          return prev.filter((f) => String(f.productId) !== productIdStr);
        return [...prev, { userId: user.id, productId: productIdStr }];
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
