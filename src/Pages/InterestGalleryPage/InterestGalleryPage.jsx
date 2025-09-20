import React from "react";
import styles from "./InterestGalleryPage.module.css";
import interests from "../../Data/Interest";
import InterestGalleryButton from "../../Components/InterestGalleryButton/InterestGalleryButton";

const InterestGalleryPage = () => {
  return (
    <div className={styles.containerInterestGalleryPage}>
      <h2>Pagina de Intereses</h2>
      <div className={styles.containerButtons}>
        {interests.map((interest, index) => (
          <InterestGalleryButton key={index} name={interest} />
        ))}
      </div>
    </div>
  );
};

export default InterestGalleryPage;
