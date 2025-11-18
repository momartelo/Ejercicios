import styles from "./FavoritesPage.module.css";

import { useAuth } from "../../Context/AuthContex";
import { useEffect } from "react";

const FavoritesPage = () => {
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn && user) {
      const userId = user.id; // <-- este es el id que necesitás
      fetch(`http://localhost:3001/favorites/${userId}`)
        .then((res) => res.json())
        .then((favorites) => {
          console.log("Favoritos del usuario:", favorites);
        });
    }
  }, [isLoggedIn, user]);

  return (
    <div>
      <h2>Mis Favoritos</h2>

      {/* {favorites.length === 0 && <p>No tienes productos favoritos.</p>}

      <ul>
        {favorites.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default FavoritesPage;
