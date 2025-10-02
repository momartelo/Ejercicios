import styles from "./HomePage.module.css";
import MainLayout from "../../Layout/MainLayout";

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <div className={styles.containerHome}>
          <h1>Home Page</h1>
          <h2>Curso React 2025</h2>
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
