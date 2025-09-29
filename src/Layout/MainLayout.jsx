import ResponsiveAppBar from "../Components/Navbar/ResponsiveNavBar";
import Footer from "../Components/Footer/Footer";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children, darkBackground = false }) => {
  return (
    <div className={styles.layout}>
      <ResponsiveAppBar />
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
