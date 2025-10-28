import styles from "./HomePage.module.css";
import MainLayout from "../../Layout/MainLayout";
import ButtonMui from "../../Components/ButtonMui/ButtonMuii";
import SaveIcon from "@mui/icons-material/Save";
import Button from "../../Components/Button/Button";

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <div className={styles.containerHome}>
          <h1>Home Page</h1>
          <h2>Curso React 2025</h2>
          <ButtonMui text="prueba" startIcon={<SaveIcon />} color="success" />

          <ButtonMui text="Cancelar" variant="outlined" color="error" />

          <ButtonMui text="Enviar" />
          <Button text="Guardar" />
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
