import Button from "../Button/Button";
import React from "react";

const Card = ({
  title,
  description,
  details,
  price,
  image, // 👈 nueva prop
  onAddToCart,
  className,
  titleClass,
  descriptionClass,
  priceClass,
  buttonClass,
  imageClass,
  style,
}) => {
  const formatPrice = (priceValue) => {
    if (!priceValue && priceValue !== 0) return "$0.00";

    // Si ya es string, limpiar múltiples $ y espacios
    if (typeof priceValue === "string") {
      // Remover todos los $ existentes y espacios
      const cleanValue = priceValue.replace(/\$/g, "").trim();
      // Formatear con un solo $
      return `$${cleanValue}`;
    }

    // Si es número, formatear normalmente
    return `$${priceValue}`;
  };
  return (
    <div className={className} style={style}>
      {image && <img src={image} alt={title} className={imageClass} />}{" "}
      {/* 👈 condicional */}
      <h2 className={titleClass}>{title}</h2>
      <p className={descriptionClass}>{description}</p>
      <p className={descriptionClass}>{details}</p>
      <p className={priceClass}>{formatPrice(price)}</p>
      <Button
        text="Agregar al carrito"
        onClick={onAddToCart}
        className={buttonClass}
      />
    </div>
  );
};

export default Card;
