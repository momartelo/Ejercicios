import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLocalProducts,
  createLocalProduct,
  updateLocalProduct,
} from "../../Functions/ProductsLocalAPI";
import styles from "./ProductForm.module.css";
import MainLayout from "../../Layout/MainLayout";
import { useCategory } from "../../Context/CategoryContex";
import Swal from "sweetalert2";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);
  const { categorias, refreshCategorias, setCategory } = useCategory();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isEditing) return;

      const products = await getLocalProducts();
      const productToEdit = products.find((p) => p.id == id);

      if (!productToEdit) return;

      setFormData(productToEdit);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await updateLocalProduct(id, formData);
    } else {
      await createLocalProduct(formData);
    }

    await refreshCategorias();
    setCategory("Todas");

    Swal.fire({
      title: "¿Esta seguro de guardar los cambios?",
      // text: "Esta acción no se puede deshacer.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cambios Guardados",
          text: "Tus datos se guardaron exitosamente (simulación).",
          icon: "success",
        });
        // volver al listado
        navigate("/");
      }
    });
  };

  return (
    <>
      <MainLayout>
        <div className={styles.container}>
          <h1 className={styles.title}>
            {isEditing ? "Editar Producto" : "Crear Producto"}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Título</label>
              <input
                className={styles.input}
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Precio</label>
              <input
                className={styles.input}
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descripción</label>
              <textarea
                className={styles.textarea}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Categoría</label>

              <input
                className={styles.input}
                list="lista-categorias"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Elegir o escribir nueva"
              />

              <datalist id="lista-categorias">
                {categorias
                  .filter((c) => c !== "Todas")
                  .map((cat, i) => (
                    <option key={i} value={cat} />
                  ))}
              </datalist>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Imagen (URL)</label>
              <input
                className={styles.input}
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div className={styles.containerButtons}>
              <button
                className={styles.buttonBack}
                type="button"
                onClick={() => navigate(`/`)}
              >
                Volver
              </button>
              <button className={styles.button} type="submit">
                {isEditing ? "Guardar Cambios" : "Crear Producto"}
              </button>
            </div>
          </form>
        </div>
      </MainLayout>
    </>
  );
};

export default ProductForm;
