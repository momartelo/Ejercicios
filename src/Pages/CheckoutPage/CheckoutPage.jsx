import styles from "./CheckoutPage.module.css";
import React, { useState } from "react";
import { emojiMap } from "../../Data/EmojiMap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContex";
import MainLayout from "../../Layout/MainLayout";
import { lanzarConfeti } from "../../Functions/Confeti.js";
import { useCart } from "../../Context/CartContext"; // 👈 Importá tu contexto de carrito

const CheckoutPage = () => {
  const { getTotal, limpiarCarrito } = useCart();
  const total = getTotal();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState("");

  const handleSeleccion = (metodo) => {
    setMetodoPago(metodo);
  };

  const handlePagar = () => {
    lanzarConfeti();
    // limpiarCarrito();
    // setTimeout(() => navigate("/"), 3000);
  };

  return (
    <MainLayout>
      <div className={styles.containerCheckoutPage}>
        <h2>Resumen de pago</h2>

        <div className={styles.containerTotalPay}>
          <p className={styles.totalPaytext}>Un total de pesos:&nbsp;</p>
          <p className={styles.totalPayValue}>
            ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <p>Seleccione el método de pago</p>

        <div className={styles.containerTypesPay}>
          <button onClick={() => handleSeleccion("Tarjeta de crédito")}>
            <p className={styles.payCreditCard}>Tarjeta de crédito</p>
            {emojiMap.credit.emoji}
          </button>

          <button onClick={() => handleSeleccion("Tarjeta de débito")}>
            <p className={styles.payDebitCard}>Tarjeta de débito</p>
            {emojiMap.credit.emoji}
          </button>

          <button onClick={() => handleSeleccion("Efectivo")}>
            <p className={styles.payCash}>Efectivo</p>
            {emojiMap.bill.emoji}
          </button>
        </div>

        {metodoPago && (
          <div className={styles.containerConfirmacion}>
            <p>
              Ud. va a pagar con <strong>{metodoPago}</strong> el monto de{" "}
              <strong>
                ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
              </strong>
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
