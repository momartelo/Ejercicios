import React from "react";
import styles from "./InterestGalleryPage.module.css";
import interests from "../../Data/Interest";
import InterestGalleryButton from "../../Components/InterestGalleryButton/InterestGalleryButton";
import ResponsiveAppBar from "../../Components/Navbar/ResponsiveNavBar";
import MainLayout from "../../Layout/MainLayout";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

const InterestGalleryPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainLayout darkBackground>
        <div className={styles.containerInterestGalleryPage}>
          <h2>Pagina de Intereses</h2>
          <p>Haga click en los botones para que cambien de color</p>
          <div className={styles.containerButtons}>
            {interests.map((interest, index) => (
              <InterestGalleryButton
                key={index}
                name={interest}
                className={styles.buttonInterest}
              />
            ))}
          </div>
          <div className={styles.containerButtons2}>
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

export default InterestGalleryPage;
