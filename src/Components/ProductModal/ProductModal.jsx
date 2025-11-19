import styles from "./ProductModal.module.css";
import { limpiarYFormatearPrecio } from "../../Functions/PriceFormatter";

const ProductModal = ({
  product,
  onClose,
  onAddToCart,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  if (!product) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <img src={product.image} className={styles.image} alt={product.title} />

        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>{limpiarYFormatearPrecio(product.price)}</p>

        <p className={styles.description}>{product.description}</p>

        {product.details && <p className={styles.details}>{product.details}</p>}

        <div className={styles.buttons}>
          <button onClick={() => onAddToCart(product)} className={styles.add}>
            Agregar al carrito
          </button>

          {isAdmin && (
            <>
              <button onClick={onEdit} className={styles.edit}>
                Editar
              </button>
              <button onClick={onDelete} className={styles.delete}>
                Borrar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
