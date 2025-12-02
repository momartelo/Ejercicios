import styles from "./FavoritesPage.module.css";
import { useAuth } from "../../Context/AuthContex";
import { useEffect, useState } from "react";
import { useFavorites } from "../../Context/FavoriteContex";
import { getLocalProducts } from "../../Functions/ProductsLocalAPI";
import Card from "../../Components/Card/Card";
import MainLayout from "../../Layout/MainLayout";
import ProductModal from "../../Components/ProductModal/ProductModal";
import { useCart } from "../../Context/CartContext";

const FavoritesPage = () => {
  const { user, isLoggedIn } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { agregarAlCarrito } = useCart();

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
    <>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          hideActions={true} // 👈 OCULTA solo los botones de acción
        />
      )}
      <MainLayout>
        <h2 className={styles.containerTitle}>Mis Favoritos</h2>

        {userFavorites.length === 0 && <p>No tienes productos favoritos.</p>}

        <div className={styles.containerWrapper}>
          {userFavorites.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              rating={product.rating?.rate || 0}
              onAddToCart={() => agregarAlCarrito(product)}
              isFavorite={true}
              onToggleFavorite={() => toggleFavorite(product.id)}
              onViewMore={() => setSelectedProduct(product)}
              className={styles.containerCard}
              titleClass={styles.title}
              priceClass={styles.price}
              ratingClass={styles.rating}
              buttonClass={styles.buttonAdd}
              imageClass={styles.imageClass}
            />
          ))}
        </div>
      </MainLayout>
    </>
  );
};

export default FavoritesPage;
