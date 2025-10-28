import Button from "../Button/Button";
import React from "react";
import RatingStars from "../RatingStars/RatingStars";
import { limpiarYFormatearPrecio } from "../../Functions/PriceFormatter";

const Card = ({
  title,
  description,
  details,
  price,
  image,
  rating,
  onAddToCart,
  className,
  titleClass,
  descriptionClass,
  detailsClass,
  priceClass,
  buttonClass,
  imageClass,
  ratingClass,
  style,
}) => {
  return (
    <div className={className} style={style}>
      {image && <img src={image} alt={title} className={imageClass} />}{" "}
      <h2 className={titleClass}>{title}</h2>
      <p className={descriptionClass}>{description}</p>
      <p className={detailsClass}>{details}</p>
      <div className={ratingClass}>
        <RatingStars value={rating} showValue={true} />
      </div>
      <p className={priceClass}>{limpiarYFormatearPrecio(price)}</p>
      <Button
        text="Agregar al carrito"
        onClick={onAddToCart}
        className={buttonClass}
      />
    </div>
  );
};

export default Card;
