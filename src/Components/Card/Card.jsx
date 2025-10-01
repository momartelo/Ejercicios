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
  return (
    <div className={className} style={style}>
      {image && <img src={image} alt={title} className={imageClass} />}{" "}
      {/* 👈 condicional */}
      <h2 className={titleClass}>{title}</h2>
      <p className={descriptionClass}>{description}</p>
      <p className={descriptionClass}>{details}</p>
      <p className={priceClass}>${price}</p>
      <Button
        text="Agregar al carrito"
        onClick={onAddToCart}
        className={buttonClass}
      />
    </div>
  );
};

export default Card;
