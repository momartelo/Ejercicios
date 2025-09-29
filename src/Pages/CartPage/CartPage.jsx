import ResponsiveAppBar from "../../Components/Navbar/ResponsiveNavBar";
import { useCart } from "../../Context/CartContext";
import styles from "./CartPage.module.css";
import { emojiMap } from "../../Data/EmojiMap";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContex";
import { Alert, Snackbar } from "@mui/material";
import MainLayout from "../../Layout/MainLayout";

const CartPage = () => {
  const { carrito, limpiarCarrito, incrementarCantidad, decrementarCantidad } =
    useCart();
  const navigate = useNavigate();
  const [totalAcumulado, setTotalAcumulado] = useState(0);
  const { isLoggedIn } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handlePago = () => {
    if (isLoggedIn) {
      navigate("/checkout", { state: { total: totalAcumulado } });
    } else {
      setOpenSnackbar(true); // Mostramos el mensaje
      setTimeout(() => navigate("/login"), 2000); // Redirige después de 2 segundos
    }
  };

  useEffect(() => {
    const total = carrito.reduce((acumulado, producto) => {
      const precioLimpio = parseFloat(
        producto.precio
          .replace(/[^\d,\.]/g, "")
          .replace(/\./g, "")
          .replace(",", ".")
      );
      const subtotal =
        producto.cantidad * (isNaN(precioLimpio) ? 0 : precioLimpio);
      return acumulado + subtotal;
    }, 0);

    setTotalAcumulado(total);
  }, [carrito]);
  return (
    <>
      <MainLayout>
        <div className={styles.containerCartPage}>
          <h2>Carrito de productos</h2>
          {carrito.length === 0 ? (
            <div className={styles.cartEmpty}>
              <p>
                {emojiMap.cart.emoji} Tu carrito esta vacio{" "}
                {emojiMap.cart.emoji}
              </p>
              <div className={styles.buttons}>
                <Button
                  text="Productos"
                  onClick={() => navigate("/listpage")}
                  className={styles.buttonList}
                />
                <Button
                  text="Inicio"
                  onClick={() => navigate("/")}
                  className={styles.buttonHome}
                />
              </div>
            </div>
          ) : (
            <>
              <div className={styles.containerProducts}>
                <ul className={styles.containerList}>
                  {carrito.map((producto, index) => (
                    <li key={index} className={styles.containerCartProduct}>
                      <h3>{producto.title}</h3>
                      <p>
                        <strong>Precio: {producto.precio}</strong>
                      </p>
                      <div className={styles.containerAmount}>
                        <button
                          onClick={() => incrementarCantidad(index)}
                          className={styles.buttonsIncDec}
                        >
                          +
                        </button>
                        <p>Cantidad: {producto.cantidad}</p>
                        <button
                          onClick={() => decrementarCantidad(index)}
                          className={styles.buttonsIncDec}
                        >
                          -
                        </button>
                      </div>
                      <p>
                        Total:{" "}
                        {(() => {
                          const precioLimpio = parseFloat(
                            producto.precio
                              .replace(/[^\d,\.]/g, "") // quita $ y otros
                              .replace(/\./g, "") // quita separadores de miles
                              .replace(",", ".") // convierte coma decimal a punto
                          );
                          const total = producto.cantidad * precioLimpio;
                          return isNaN(total)
                            ? "Precio inválido"
                            : `$${total.toLocaleString()}`;
                        })()}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className={styles.totalResumen}>
                  <h3>
                    Total a pagar:{" "}
                    <span style={{ color: "green" }}>
                      ${totalAcumulado.toLocaleString()}
                    </span>
                  </h3>
                </div>
              </div>
              <div className={styles.containerButtons}>
                <button
                  className={styles.buttonClearCart}
                  onClick={() => limpiarCarrito()}
                >
                  Vaciar Carrito
                </button>
                <button
                  className={styles.buttonBuyMore}
                  onClick={() => navigate("/listpage")}
                >
                  Seguir Comprando
                </button>
                <button className={styles.buttonBuy} onClick={handlePago}>
                  Ir a Pagar
                </button>
                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={3000}
                  onClose={() => setOpenSnackbar(false)}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="warning"
                    variant="filled"
                    sx={{ width: "100%", textAlign: "center" }}
                  >
                    Debés iniciar sesión para continuar con la compra.
                  </Alert>
                </Snackbar>
              </div>
            </>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default CartPage;
