// src/pages/ProductsPageLocal/ProductsPageLocal.jsx
import MainLayout from "../../Layout/MainLayout";
import styles from "./ProductsPageLocal.module.css";
import {
  deleteLocalProduct,
  getLocalProducts,
} from "../../Functions/ProductsLocalAPI";
import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import { useCart } from "../../Context/CartContext";
import Carousel from "../../Components/Carousel/Carousel";
import { useCategory } from "../../Context/CategoryContex";
import { useAuth } from "../../Context/AuthContex";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProductModal from "../../Components/ProductModal/ProductModal";

// FAVORITES CONTEXT
import { useFavorites } from "../../Context/FavoriteContex";

const ProductsPageLocal = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useCart();
  const { category, categorias } = useCategory();
  const { isAdminIn, user } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  // CARGAR PRODUCTOS
  useEffect(() => {
    const fetchLocalProductos = async () => {
      try {
        const data = await getLocalProducts();
        console.log(data);
        setProductos(data);
        setFilteredProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocalProductos();
  }, []);

  // FILTRAR PRODUCTOS POR CATEGORÍA
  useEffect(() => {
    if (category === "Todas") {
      setFilteredProducts(productos);
    } else {
      setFilteredProducts(productos.filter((p) => p.category === category));
    }
  }, [category, productos]);

  // ELIMINAR PRODUCTO
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await deleteLocalProduct(id);

        Swal.fire({
          icon: "success",
          title: "Producto borrado",
          showConfirmButton: false,
          timer: 1500,
        });

        setProductos((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo borrar el producto",
      });
    }
  };

  return (
    <>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={agregarAlCarrito}
          isAdmin={isAdminIn}
          onEdit={() => navigate(`/product/edit/${selectedProduct.id}`)}
          onDelete={() => handleDelete(selectedProduct.id)}
        />
      )}

      <MainLayout categorias={categorias}>
        <Carousel />
        <div className={styles.containerProducts}>
          {isLoading && <p>Cargando productos...</p>}
          {error && <p>Error: {error}</p>}

          <ul className={styles.containerUlProduct}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((producto) => {
                const isFavorite = favorites.some(
                  (f) => f.productId === Number(producto.id)
                );

                return (
                  <div
                    key={producto.id}
                    className={styles.containerComponentCard}
                  >
                    <Card
                      id={producto.id}
                      title={producto.title}
                      price={producto.price}
                      image={producto.image}
                      rating={producto.rating?.rate || 0}
                      onAddToCart={() => agregarAlCarrito(producto)}
                      isAdmin={isAdminIn}
                      onEdit={() => navigate(`/product/edit/${producto.id}`)}
                      onDelete={() => handleDelete(producto.id)}
                      onViewMore={() => setSelectedProduct(producto)}
                      isFavorite={isFavorite}
                      onToggleFavorite={() => toggleFavorite(producto.id)}
                      className={styles.containerCard}
                      titleClass={styles.title}
                      priceClass={styles.price}
                      ratingClass={styles.rating}
                      buttonClass={styles.buttonAdd}
                      imageClass={styles.imageClass}
                    />
                  </div>
                );
              })
            ) : (
              <p>No hay productos en esta categoría.</p>
            )}
          </ul>
        </div>
      </MainLayout>
    </>
  );
};

export default ProductsPageLocal;
