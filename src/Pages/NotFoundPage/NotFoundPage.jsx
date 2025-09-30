import styles from "./NotFoundPage.module.css";
import React from "react";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainLayout>
        <div className={styles.containerNotFoundPage}>
          <h2>404</h2>
          <p>Not Found Page</p>
          <div className={styles.containerButtons}>
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

export default NotFoundPage;
