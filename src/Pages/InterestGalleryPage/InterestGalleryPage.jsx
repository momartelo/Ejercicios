import React from "react";
import styles from "./InterestGalleryPage.module.css";
import interests from "../../Data/Interest";
import InterestGalleryButton from "../../Components/InterestGalleryButton/InterestGalleryButton";
import ResponsiveAppBar from "../../Components/Navbar/ResponsiveNavBar";
import MainLayout from "../../Layout/MainLayout";

const InterestGalleryPage = () => {
  return (
    <>
      <MainLayout darkBackground>
        <div className={styles.containerInterestGalleryPage}>
          <h2>Pagina de Intereses</h2>
          <div className={styles.containerButtons}>
            {interests.map((interest, index) => (
              <InterestGalleryButton
                key={index}
                name={interest}
                className={styles.buttonInterest}
              />
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default InterestGalleryPage;
