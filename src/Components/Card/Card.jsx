import Button from "../Button/Button";
import React, { useState } from "react";
import RatingStars from "../RatingStars/RatingStars";
import { limpiarYFormatearPrecio } from "../../Functions/PriceFormatter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./Card.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Card = ({
  title,
  description,
  details,
  price,
  image,
  rating,
  onAddToCart,
  onEdit,
  onDelete,
  className,
  titleClass,
  descriptionClass,
  detailsClass,
  priceClass,
  buttonClass,
  imageClass,
  ratingClass,
  style,
  isAdmin,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };
  return (
    <div className={className} style={style}>
      <div className={styles.containerFavorite}>
        <button
          className={styles.buttonFavorite}
          onClick={toggleFavorite}
          style={{
            color: isFavorite ? "red" : "gray",
          }}
          aria-label="Agregar a favoritos"
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
      </div>
      {image && <img src={image} alt={title} className={imageClass} />}{" "}
      <h2 className={titleClass}>{title}</h2>
      <p className={descriptionClass}>{description}</p>
      <p className={detailsClass}>{details}</p>
      <div className={ratingClass}>
        <RatingStars value={rating} showValue={true} />
      </div>
      <p className={priceClass}>{limpiarYFormatearPrecio(price)}</p>
      {isAdmin && (
        <div className={styles.adminButtons}>
          <button className={styles.editButton} onClick={onEdit}>
            <EditIcon />
          </button>
          <button className={styles.deleteButton} onClick={onDelete}>
            <DeleteIcon />
          </button>
        </div>
      )}
      <Button text="Agregar" onClick={onAddToCart} className={buttonClass} />
    </div>
  );
};

export default Card;
