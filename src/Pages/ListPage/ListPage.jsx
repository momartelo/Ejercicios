import styles from "./ListPage.module.css";
import React from "react";
import Card from "../../Components/Card/Card";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import ResponsiveAppBar from "../../Components/Navbar/ResponsiveNavBar";
import componentesPc from "../../Data/Components";

const ListPage = () => {
  const frutas = ["Manzanas", "Peras", "Naranjas", "Bananas", "Uvas"];
  const frutasMore = [
    {
      title: "Manzanas Rojas",
      description:
        "Frescas, dulces y crujientes, ideales para postres o snacks.",
      moreDetails: "Origen: Mendoza · Peso: 1kg · Conservación: refrigerado",
    },
    {
      title: "Peras Williams",
      description: "Peras jugosas de excelente calidad, con sabor suave.",
      moreDetails:
        "Origen: Río Negro · Peso: 1kg · Conservación: ambiente fresco",
    },
    {
      title: "Naranjas Valencia",
      description: "Perfectas para jugo, con alto contenido de vitamina C.",
      moreDetails:
        "Origen: Entre Ríos · Peso: 2kg · Conservación: ambiente fresco",
    },
    {
      title: "Bananas Ecuatorianas",
      description: "Bananas dulces y cremosas, listas para consumo diario.",
      moreDetails:
        "Origen: Ecuador · Peso: 1kg · Conservación: ambiente fresco",
    },
    {
      title: "Uvas Negras",
      description: "Uvas sin semillas, dulces y fáciles de comer.",
      moreDetails: "Origen: San Juan · Peso: 500g · Conservación: refrigerado",
    },
  ];
  const navigate = useNavigate();

  return (
    <>
      <ResponsiveAppBar />
      <div className={styles.containerListPage}>
        <h2>Lista de productos</h2>
        {/* <ul className={styles.containerUls}>
          {frutas.map((producto, index) => (
            <li key={index}>{producto}</li>
          ))}
        </ul> */}
        <ul className={styles.containerCards}>
          {componentesPc.map((producto, index) => (
            <div className={styles.cardFrutas} key={index}>
              <Card
                title={producto.title}
                description={producto.description}
                details={producto.moreDetails}
                price={producto.precio}
              />
            </div>
          ))}
        </ul>
        <div className={styles.containerButtons}>
          <Button
            text="Volver"
            onClick={() => navigate(-1)}
            className={styles.buttonBack}
          />
          <Button
            text="Inicio"
            onClick={() => navigate("/")}
            className={styles.buttonHome}
          />
        </div>
      </div>
    </>
  );
};

export default ListPage;
