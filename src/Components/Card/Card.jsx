import Button from "../Button/Button";
import React, { useState } from "react";
import RatingStars from "../RatingStars/RatingStars";
import { limpiarYFormatearPrecio } from "../../Functions/PriceFormatter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./Card.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFavorites } from "../../Context/FavoriteContex";
import { useAuth } from "../../Context/AuthContex";

const Card = ({
  id,
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
  onViewMore,
}) => {
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((f) => String(f.productId) === String(id));

  return (
    <div className={className} style={style}>
      <div className={styles.containerFavorite}>
        <button
          className={styles.buttonFavorite}
          onClick={() => toggleFavorite(id)}
          style={{ color: isFavorite ? "red" : "gray" }}
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
      <button onClick={onViewMore} className={styles.viewMore}>
        Ver más
      </button>
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
