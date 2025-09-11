import styles from "./HomePage.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import confetti from "canvas-confetti";
import { Alert, Snackbar } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const lanzarConfeti = () => {
    // Lanza confeti durante 1 segundo
    const duration = 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <>
      <div className={`${styles.containerHome}`}>
        <h1>Pagina Principal</h1>
        <h3>
          Pagina donde se van haciendo los ejercicios requeridos por el curso de
          React
        </h3>
        <div className={styles.containerButtons}>
          <Button
            text="Click Me"
            onClick={handleClick}
            className={styles.buttonClickMe}
          />

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled" // 👈 ESTO lo hace outlined
              sx={{ width: "100%" }}
            >
              Acción realizada con éxito 🎉
            </Alert>
          </Snackbar>

          <Button
            text="Ir a la Lista"
            onClick={() => navigate("/ListPage")}
            className={styles.buttonList}
          />

          <Button
            text="Confeti"
            onClick={lanzarConfeti}
            className={styles.buttonList}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
