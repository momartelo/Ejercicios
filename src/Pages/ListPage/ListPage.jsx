import styles from "./ListPage.module.css";
import React from "react";
import Card from "../../Components/Button/Card/Card";

const ListPage = () => {
  const frutas = ["Manzanas", "Peras", "Naranjas"];
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

  return (
    <>
      <div className={styles.containerListPage}>
        <h2>Lista de productos</h2>
        <ul>
          {frutas.map((producto, index) => (
            <li key={index}>{producto}</li>
          ))}
        </ul>
        <ul className={styles.containerCards}>
          {frutasMore.map((producto, index) => (
            <div className={styles.cardFrutas}>
              <Card
                title={producto.title}
                description={producto.description}
                details={producto.moreDetails}
                key={index}
              />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ListPage;
