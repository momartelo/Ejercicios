import styles from "./HomePage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { lanzarConfeti } from "../../Functions/Confeti";
import { Alert, Snackbar } from "@mui/material";
import ResponsiveAppBar from "../../Components/Navbar/ResponsiveNavBar";
import MiniConsole from "../../Components/MiniConsole/MiniConsole";
import useLogger from "../../Hooks/useLogger";
import Footer from "../../Components/Footer/Footer";
import MainLayout from "../../Layout/MainLayout";

const HomePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { logs, addLog, clearLogs } = useLogger();

  const handleClickConsolaYAlerta = () => {
    const mensaje = "Mensaje creado en consola";
    console.log(mensaje);

    setAlertMessage(
      "El mensaje por consola fue creado con éxito 🎉 (también lo ves abajo)"
    );
    setOpen(true);

    addLog(mensaje, "info");
  };

  const handleClick = () => {
    const mensaje = "Acción realizada con éxito 🎉";
    setAlertMessage(mensaje);
    setOpen(true);
    addLog(mensaje, "success");
  };

  const handleClickError = () => {
    const mensaje =
      "Acción realizada con éxito - Mensaje Erroneo probado!!! 🎉";
    setAlertMessage(mensaje);
    setOpen(true);
    addLog(mensaje, "error");
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <MainLayout>
        <div className={styles.containerHome}>
          <h1>Pagina Principal</h1>
          <h3>
            Pagina donde se van haciendo los ejercicios requeridos por el curso
            de React
          </h3>
          <div className={styles.containerButtons}>
            <p>Botones para ir a paginas</p>
            <div className={styles.containerButtonsPages}>
              <Button
                text="Productos"
                onClick={() => navigate("/listpage")}
                className={styles.buttonList}
              />

              <Button
                text="Proyectos"
                onClick={() => navigate("/proyects")}
                className={styles.buttonList}
              />

              <Button
                text="Equipo"
                onClick={() => navigate("/team")}
                className={styles.buttonList}
              />

              <Button
                text="Intereses"
                onClick={() => navigate("/interest")}
                className={styles.buttonList}
              />
            </div>
            <p>Botones para realizar acciones</p>
            <div className={styles.containerButtonsActions}>
              <Button
                text="Mensaje por consola"
                onClick={handleClickConsolaYAlerta}
                className={styles.buttonList}
              />
              <Button
                text="Click Me"
                onClick={handleClick}
                className={styles.buttonClickMe}
              />

              <Button
                text="Lanzar un error por Mini consola"
                onClick={handleClickError}
                className={styles.buttonClickError}
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
                  {alertMessage}
                </Alert>
              </Snackbar>

              <Button
                text="Confeti"
                onClick={() => {
                  lanzarConfeti();
                  addLog("Confeti lanzado 🎊", "success");
                }}
                className={styles.buttonList}
              />
            </div>
          </div>

          <MiniConsole logs={logs} clearLogs={clearLogs} />
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
