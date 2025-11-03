import MainLayout from "../../Layout/MainLayout";
import styles from "./ProductsPageFakeAPI.module.css";
import { getProductsFakeAPI } from "../../Functions/FetchAPI";
import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import { useCart } from "../../Context/CartContext";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { categoryTranslations } from "../../Data/Categories";
import Carousel from "../../Components/Carousel/Carousel";

const ProductsPageFakeAPI = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { agregarAlCarrito } = useCart();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("Todas");

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

  const categorias = ["Todas", ...new Set(productos.map((p) => p.category))];

  return (
    <>
      <MainLayout>
        <Carousel />
        <div className={styles.containerProductsFakeAPI}>
          {isLoading && <p>Cargando productos...</p>}
          {error && <p>Error: {error}</p>}
          <div className={styles.filterContainer}>
            <FormControl
              variant="outlined"
              className={styles.formControl}
              size="small"
            >
              <InputLabel id="category-select-label">Categoría</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Categoría"
              >
                {categorias.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {categoryTranslations[cat] || cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <ul className={styles.containerUlProduct}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((producto) => (
                <div key={producto.id}>
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
