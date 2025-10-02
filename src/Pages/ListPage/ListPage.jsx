import styles from "./ListPage.module.css";
import Card from "../../Components/Card/Card";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import ResponsiveAppBar from "../../Components/Navbar/ResponsiveNavBar";
import componentesPc from "../../Data/Components";
import { useCart } from "../../Context/CartContext";
import MainLayout from "../../Layout/MainLayout";

const ListPage = () => {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCart();

  return (
    <>
      <MainLayout>
        <div className={styles.containerListPage}>
          <h2>Lista de productos</h2>
          <ul className={styles.containerCards}>
            {componentesPc.map((producto, index) => (
              <div key={index}>
                <Card
                  title={producto.title}
                  description={producto.description}
                  details={producto.moreDetails}
                  price={producto.precio}
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
          <div className={styles.containerButtons}>
            <Button
              text="Atras"
              onClick={() => navigate(-1)}
              className={styles.buttonBack}
            />
            <Button
              text="Inicio"
              onClick={() => navigate("/")}
              className={styles.buttonHome}
            />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ListPage;
