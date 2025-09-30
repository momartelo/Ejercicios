import MainLayout from "../../Layout/MainLayout";
import styles from "./ProductsPageAPI.module.css";
import { getProductsAPI } from "../../Functions/FetchAPI";

import React, { useEffect, useState } from "react";

const ProductsPageAPI = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductosAPI = async () => {
      try {
        const data = await getProductsAPI();
        console.log("Respuesta de la API:", data); // 👈 log completo
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
              <li key={index} className={styles.product}>
                <p>{producto.name}</p>
                <p>${producto.price}</p>
                <img src={producto.image} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </MainLayout>
    </>
  );
};

export default ProductsPageAPI;
