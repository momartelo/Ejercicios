import React, { useState } from "react";
import styles from "./InterestGalleryButton.module.css";
import Button from "../Button/Button";
import { lanzarConfeti } from "../../Functions/Confeti";
import { Alert, Snackbar } from "@mui/material";

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

const InterestGalleryButton = ({ name, className = "" }) => {
  const [bgColor, setBgColor] = useState("#e5e5e5"); // color inicial
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClick = () => {
    const newColor = getRandomColor();
    setBgColor(newColor);
    const mensaje = `Acción realizada con éxito 🎉\nColor del botón: ${newColor}`;
    setAlertMessage(mensaje);
    setOpen(true);
    lanzarConfeti();
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        text={name}
        onClick={handleClick}
        className={className}
        style={{
          backgroundColor: bgColor,
          color: getContrastColor(bgColor),
        }}
      />
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", textAlign: "center" }}
        >
          <p className={styles.textoAlert}>{alertMessage}</p>
        </Alert>
      </Snackbar>
    </>
  );
};

export default InterestGalleryButton;
