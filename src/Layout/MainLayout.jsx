import Footer from "../Components/Footer/Footer";
import styles from "./MainLayout.module.css";
import BootstrapNavBar from "../Components/Navbar/NavBoostrap";

const MainLayout = ({ children, darkBackground = false, categorias = [] }) => {
  return (
    <div className={styles.layout}>
      <BootstrapNavBar />
      <main
        className={`${styles.main} ${darkBackground ? styles.darkMain : ""}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
