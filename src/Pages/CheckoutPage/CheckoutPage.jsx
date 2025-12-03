import styles from "./CheckoutPage.module.css";
import React, { useState } from "react";
import { emojiMap } from "../../Data/EmojiMap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContex";
import MainLayout from "../../Layout/MainLayout";
import { lanzarConfeti } from "../../Functions/Confeti.js";
import { useCart } from "../../Context/CartContext";

const CheckoutPage = () => {
  const { getTotal, limpiarCarrito, carrito } = useCart();
  const total = getTotal();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState("");
  console.log(carrito);
  const handleSeleccion = (metodo) => {
    setMetodoPago(metodo);
  };

  const handlePagar = () => {
    lanzarConfeti();
  };

  return (
    <MainLayout>
      <div className={styles.containerCheckoutPage}>
        <h2>Resumen de compra y pago</h2>

        <div>
          <ul className={styles.containerProducts}>
            {carrito.map((producto, index) => {
              return (
                <li key={index} className={styles.containerProduct}>
                  <img src={producto.image} />
                  <p>Cant.: {producto.cantidad}u</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.containerTotalPay}>
          <p className={styles.totalPayText}>Un total de pesos:&nbsp;</p>
          <p className={styles.totalPayValue}>
            ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <p>Seleccione el método de pago:</p>

        <div className={styles.containerTypesPay}>
          <button onClick={() => handleSeleccion("Tarjeta de crédito")}>
            <p className={styles.payCreditCard}>Tarjeta de crédito</p>
            <span className={styles.emoji}>{emojiMap.credit.emoji}</span>
          </button>

          <button onClick={() => handleSeleccion("Tarjeta de débito")}>
            <p className={styles.payDebitCard}>Tarjeta de débito</p>
            <span className={styles.emoji}>{emojiMap.credit.emoji}</span>
          </button>

          <button onClick={() => handleSeleccion("Efectivo")}>
            <p className={styles.payCash}>Efectivo</p>
            <span className={styles.emoji}>{emojiMap.bill.emoji}</span>
          </button>
        </div>

        {metodoPago && (
          <div className={styles.containerConfirmacion}>
            <p>
              Ud. va a pagar con{" "}
              <span className={styles.methodPay}>{metodoPago}</span> el monto de{" "}
              <span className={styles.methodPay}>
                ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
              </span>
            </p>
            <button className={styles.buttonPay} onClick={handlePagar}>
              Continue con el pago
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
