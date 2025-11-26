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
import { useSearch } from "../../Context/SearchContex";
import { useFavorites } from "../../Context/FavoriteContex";
import CustomPagination from "../../Components/CustomPagination/CustomPagination";

const ProductsPageLocal = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // ⭐ cantidad por página

  const { agregarAlCarrito } = useCart();
  const { category, categorias } = useCategory();
  const { isAdminIn } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const { searchQuery } = useSearch();

  // CARGAR PRODUCTOS
  useEffect(() => {
    const fetchLocalProductos = async () => {
      try {
        const data = await getLocalProducts();
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

  // FILTROS
  useEffect(() => {
    let filtered = [...productos];

    if (category !== "Todas") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredProducts(filtered);
  }, [category, productos, searchQuery]);

  // ⭐ Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  // ⭐ PAGINACIÓN
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // BORRAR PRODUCTO
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
            {currentProducts.length > 0 ? (
              currentProducts.map((producto) => {
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

          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </MainLayout>
    </>
  );
};

export default ProductsPageLocal;
