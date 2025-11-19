import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContex";

const FavoritesContext = createContext();

const API = import.meta.env.VITE_BACK_API_URL;

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
        const data = await fetch(`${API}/favorites/${user.id}`).then((r) =>
          r.json()
        );

        setFavorites(data);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      }
    };

    cargarFavoritos();
  }, [isLoggedIn, user]);

  const toggleFavorite = async (productId) => {
    if (!user || !productId) return;

    const productIdStr = String(productId);

    try {
      await fetch(`${API}/favorites/toggle`, {
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
