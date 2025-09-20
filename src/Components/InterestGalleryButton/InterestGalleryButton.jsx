import React, { useState } from "react";
import styles from "./InterestGalleryButton.module.css";

// Genera un color hex random
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Determina si el color es oscuro o claro (para texto legible)
const getContrastColor = (hexColor) => {
  hexColor = hexColor.replace("#", "");
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  // Fórmula de luminancia
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "black" : "white";
};

const InterestGalleryButton = ({ name }) => {
  const [bgColor, setBgColor] = useState("#e5e5e5"); // color inicial

  const handleClick = () => {
    const newColor = getRandomColor();
    setBgColor(newColor);
  };

  return (
    <button
      className={styles.buttonInterest}
      style={{
        backgroundColor: bgColor,
        color: getContrastColor(bgColor),
      }}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default InterestGalleryButton;
