import ResponsiveAppBar from "../../Components/Navbar/ResponsiveNavBar";
import { useCart } from "../../Context/CartContext";
import styles from "./CartPage.module.css";
import { emojiMap } from "../../Data/EmojiMap";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContex";
import MainLayout from "../../Layout/MainLayout";
import { normalizarPrecio } from "../../Functions/PriceFormatter";

const CartPage = () => {
  const { carrito, limpiarCarrito, incrementarCantidad, decrementarCantidad } =
    useCart();
  const navigate = useNavigate();
  const [totalAcumulado, setTotalAcumulado] = useState(0);

  // ✅ SIMPLE - La protección está en las rutas
  const handlePago = () => {
    navigate("/checkout", { state: { total: totalAcumulado } });
  };

  const formatearPrecioParaMostrar = (precio) => {
    if (typeof precio === "number") {
      return `$${precio.toLocaleString("es-AR")}`;
    }
    return precio;
  };

  useEffect(() => {
    const total = carrito.reduce((acumulado, producto) => {
      try {
        const precioString = producto.precio ?? producto.price ?? "0";
        const precioValido = normalizarPrecio(precioString);
        const cantidad = producto.cantidad || 1;
        const subtotal = cantidad * precioValido;
        return acumulado + subtotal;
      } catch (error) {
        console.error("Error calculando subtotal:", error, producto);
        return acumulado;
      }
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
                  {carrito.map((producto, index) => {
                    const precioString =
                      producto.precio ?? producto.price ?? "0";
                    const precioValido = normalizarPrecio(precioString);
                    const subtotal = producto.cantidad * precioValido;

                    return (
                      <li key={index} className={styles.containerCartProduct}>
                        <h3>{producto.title ?? producto.name}</h3>
                        <p>
                          <strong>
                            Precio: ${formatearPrecioParaMostrar(precioString)}
                          </strong>
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
                        <p>Total: ${subtotal.toLocaleString("es-AR")}</p>
                      </li>
                    );
                  })}
                </ul>
                <div className={styles.totalResumen}>
                  <h3>
                    Total a pagar:{" "}
                    <span style={{ color: "green" }}>
                      ${totalAcumulado.toLocaleString("es-AR")}
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
              </div>
            </>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default CartPage;
