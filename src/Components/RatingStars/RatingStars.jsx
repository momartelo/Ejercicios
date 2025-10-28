import styles from "./RatingStars.module.css";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({
  value,
  color = "#FFD700",
  size = 18,
  showValue = false,
}) => {
  const maxStars = 5;

  return (
    <div className={styles.rating} style={{ color }}>
      {[...Array(maxStars)].map((_, i) => {
        const ratingValue = i + 1;
        if (value >= ratingValue)
          return <FaStar key={i} size={size} className={styles.star} />;
        if (value >= ratingValue - 0.5)
          return <FaStarHalfAlt key={i} size={size} className={styles.star} />;
        return <FaRegStar key={i} size={size} className={styles.star} />;
      })}
      {showValue && <span className={styles.value}>{value.toFixed(1)}</span>}
    </div>
  );
};

export default RatingStars;
