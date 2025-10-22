import MainLayout from "../../Layout/MainLayout";
import styles from "./ProductsPageFakeAPI.module.css";
import { getProductsFakeAPI } from "../../Functions/FetchAPI";
import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import { useCart } from "../../Context/CartContext";

const ProductsPageFakeAPI = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { agregarAlCarrito } = useCart();

  useEffect(() => {
    const fetchProductosFakeAPI = async () => {
      try {
        const data = await getProductsFakeAPI();
        setProductos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductosFakeAPI();
  }, []);

  return (
    <>
      <MainLayout>
        <div className={styles.containerProductsFakeAPI}>
          {isLoading && <p>Cargando productos...</p>}
          {error && <p>Error: {error}</p>}
          <ul className={styles.containerUlProduct}>
            {productos.map((producto) => (
              <div key={producto.id}>
                <Card
                  image={producto.image}
                  title={producto.title}
                  price={producto.price}
                  onAddToCart={() => agregarAlCarrito(producto)}
                  className={styles.containerCard}
                  titleClass={styles.title}
                  priceClass={styles.price}
                  buttonClass={styles.buttonAdd}
                  imageClass={styles.imageClass}
                />
              </div>
            ))}
          </ul>
        </div>
      </MainLayout>
    </>
  );
};

export default ProductsPageFakeAPI;
