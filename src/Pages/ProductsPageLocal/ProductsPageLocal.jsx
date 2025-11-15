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

const ProductsPageLocal = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { agregarAlCarrito } = useCart();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { category, categorias } = useCategory();
  const { isAdminIn } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (category === "Todas") {
      setFilteredProducts(productos);
    } else {
      const filtrados = productos.filter(
        (producto) => producto.category === category
      );
      setFilteredProducts(filtrados);
    }
  }, [category, productos]);

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

        // 🔥 Actualizar lista correctamente:
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
              filteredProducts.map((producto) => (
                <div
                  key={producto.id}
                  className={styles.containerComponentCard}
                >
                  <Card
                    title={producto.title}
                    price={producto.price}
                    image={producto.image}
                    rating={producto.rating?.rate || 0}
                    onAddToCart={() => agregarAlCarrito(producto)}
                    isAdmin={isAdminIn}
                    onEdit={() => navigate(`/product/edit/${producto.id}`)}
                    onDelete={() => handleDelete(producto.id)}
                    onViewMore={() => setSelectedProduct(producto)}
                    className={styles.containerCard}
                    titleClass={styles.title}
                    priceClass={styles.price}
                    ratingClass={styles.rating}
                    buttonClass={styles.buttonAdd}
                    imageClass={styles.imageClass}
                  />
                </div>
              ))
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
