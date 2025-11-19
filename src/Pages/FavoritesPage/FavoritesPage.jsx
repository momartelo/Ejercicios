import styles from "./FavoritesPage.module.css";
import { useAuth } from "../../Context/AuthContex";
import { useEffect, useState } from "react";
import { useFavorites } from "../../Context/FavoriteContex";
import { getLocalProducts } from "../../Functions/ProductsLocalAPI";
import Card from "../../Components/Card/Card";
import MainLayout from "../../Layout/MainLayout";

const FavoritesPage = () => {
  const { user, isLoggedIn } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const data = await getLocalProducts();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  if (!isLoggedIn || !user) {
    return (
      <MainLayout>
        <p>Debés iniciar sesión para ver tus favoritos.</p>
      </MainLayout>
    );
  }

  const userFavorites = favorites
    .filter((f) => f.userId === user.id)
    .map((f) => productos.find((p) => Number(p.id) === Number(f.productId)))
    .filter(Boolean);

  return (
    <MainLayout>
      <h2>Mis Favoritos</h2>

      {userFavorites.length === 0 && <p>No tienes productos favoritos.</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {userFavorites.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            rating={product.rating?.rate || 0}
            isFavorite={true}
            onToggleFavorite={() => toggleFavorite(product.id)}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default FavoritesPage;
