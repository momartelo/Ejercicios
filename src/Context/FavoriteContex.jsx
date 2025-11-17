import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };
};
