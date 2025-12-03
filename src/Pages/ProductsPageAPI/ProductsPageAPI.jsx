import MainLayout from "../../Layout/MainLayout";
import styles from "./ProductsPageAPI.module.css";
import { getProductsAPI } from "../../Functions/FetchAPI";

import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import { useCart } from "../../Context/CartContext";

const ProductsPageAPI = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { agregarAlCarrito } = useCart();

  useEffect(() => {
    const fetchProductosAPI = async () => {
      try {
        const data = await getProductsAPI();
        console.log("Respuesta de la API:", data);
        setProductos(data);
      } catch (error) {
        console.error("Error al traer productos:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductosAPI();
  }, []);

  return (
    <>
      <MainLayout>
        <div className={styles.containerProductsAPI}>
          <ul className={styles.containerUlProduct}>
            {productos.map((producto, index) => (
              <div key={index}>
                <Card
                  image={producto.image}
                  title={producto.name}
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

export default ProductsPageAPI;
