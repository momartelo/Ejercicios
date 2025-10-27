import styles from "./CheckoutPage.module.css";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { emojiMap } from "../../Data/EmojiMap";
import ResponsiveAppBar from "../../Components/Navbar/ResponsiveNavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContex";
import MainLayout from "../../Layout/MainLayout";

const CheckoutPage = () => {
  const location = useLocation();
  const total = location.state?.total || 0;
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <MainLayout>
        <div className={styles.containerCheckoutPage}>
          <h2>Resumen de pago</h2>
          <div className={styles.containerTotalPay}>
            <p className={styles.totalPaytext}>Un total de pesos:&nbsp;</p>
            <p className={styles.totalPayValue}> ${total.toLocaleString()}</p>
          </div>
          <div className={styles.containerTypesPay}>
            <button>
              <p className={styles.payCreditCard}>Tarjeta de credito</p>
              {emojiMap.credit.emoji}
            </button>
            <button>
              <p className={styles.payDebitCard}>Tarjeta de debito</p>
              {emojiMap.credit.emoji}
            </button>
            <button>
              <p className={styles.payCash}>Efectivo</p>
              {emojiMap.bill.emoji}
            </button>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default CheckoutPage;

// useEffect(() => {
//   if (!isLoggedIn) {
//     navigate("/"); // O podés redirigir a "/login"
//   }
// }, [isLoggedIn, navigate]);
