import MainLayout from "../../Layout/MainLayout";
import styles from "./ProductsPageFakeAPI.module.css";
import { getProductsFakeAPI } from "../../Functions/FetchAPI";
import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import { useCart } from "../../Context/CartContext";
import Carousel from "../../Components/Carousel/Carousel";
import { useCategory } from "../../Context/CategoryContex";

const ProductsPageFakeAPI = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { agregarAlCarrito } = useCart();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { category, categorias } = useCategory();

  useEffect(() => {
    const fetchProductosFakeAPI = async () => {
      try {
        const data = await getProductsFakeAPI();
        setProductos(data);
        setFilteredProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductosFakeAPI();
  }, []);

  useEffect(() => {
    if (category === "Todas") {
      setFilteredProducts(productos);
    } else {
      const filtered = productos.filter(
        (producto) => producto.category === category
      );
      setFilteredProducts(filtered);
    }
  }, [category, productos]);

  return (
    <>
      <MainLayout categorias={categorias}>
        <Carousel />
        <div className={styles.containerProductsFakeAPI}>
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
                    rating={producto.rating.rate}
                    onAddToCart={() => agregarAlCarrito(producto)}
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

export default ProductsPageFakeAPI;
