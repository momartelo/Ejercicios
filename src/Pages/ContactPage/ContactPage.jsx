import { useNavigate } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import styles from "./ContactPage.module.css";
import { useState } from "react";
import Swal from "sweetalert2";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Este codigo es para cuando el back funcione

      // --------------------------------------------------

      //   await axios.post(
      //     `${API_URL}/email/send`,
      //     {
      //       nombre: formData.nombre,
      //       email: formData.email,
      //       mensaje: formData.mensaje,
      //     },
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );

      // -------------------------------------------------

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setEnviado(true);
      setFormData({
        nombre: "",
        email: "",
        mensaje: "",
      });
      Swal.fire({
        title: "¡Éxito!",
        text: "Tu mensaje ha sido enviado exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (err) {
      let errorMessage =
        "Error al enviar el formulario. Inténtalo de nuevo más tarde.";

      if (err.response) {
        // Manejo de errores HTTP específicos
        switch (err.response.status) {
          case 400:
            errorMessage =
              "La solicitud es incorrecta. Por favor, revisa los datos ingresados y vuelve a intentarlo.";
            break;
          case 401:
            errorMessage =
              "No estás autorizado para realizar esta acción. Asegúrate de estar correctamente autenticado.";
            break;
          case 403:
            errorMessage =
              "Acceso denegado. No tienes permiso para acceder a este recurso.";
            break;
          case 404:
            errorMessage =
              "El recurso solicitado no fue encontrado. Verifica la URL y vuelve a intentarlo.";
            break;
          case 408:
            errorMessage =
              "La solicitud ha expirado. Por favor, intenta de nuevo.";
            break;
          case 413:
            errorMessage =
              "El archivo que intentas enviar es demasiado grande. Por favor, reduce el tamaño y vuelve a intentarlo.";
            break;
          case 422:
            errorMessage =
              "Los datos proporcionados son inválidos. Verifica los campos del formulario y corrige los errores.";
            break;
          case 429:
            errorMessage =
              "Has realizado demasiadas solicitudes en un corto período de tiempo. Por favor, espera un momento antes de volver a intentar.";
            break;
          case 504:
            errorMessage =
              "El servidor de origen no respondió a tiempo. Inténtalo de nuevo más tarde.";
            break;
          default:
            errorMessage =
              "Se produjo un error inesperado. Por favor, intenta de nuevo más tarde.";
        }
      } else if (err.request) {
        // Manejo de errores de red
        errorMessage =
          "No se pudo comunicar con el servidor. Verifica tu conexión a Internet y vuelve a intentarlo.";
      } else {
        // Otros errores
        errorMessage = `Error: ${err.message}`;
      }

      console.error("Error:", err.response ? err.response.data : err.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <>
      <MainLayout>
        <div className={styles.containerContactPage}>
          <div className={styles.containerTitle}>
            <img src="/img/formulario-de-contacto.png" alt="" />
            <h1>Formulario de Contacto</h1>
          </div>
          <div className={styles.containerTextsAndForm}>
            <div className={styles.containerTextsForm}>
              <h2>Dudas, problemas, comentarios, etc.</h2>
              <p>Necesitas contactarte con nosotros.</p>
              <p>- ¿tenes una duda?</p>
              <p>- ¿queres dejarnos un feedback?</p>
              <p>- ¿queres reportar un bug?</p>
              <p>
                Rellena el formulario dejanos un email y a la brevedad si asi lo
                requiere nos estaremos comunicando con vos.
              </p>
              <p>Gracias!!</p>
              <p>Atte. el equipo de desarrollo</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.containerForm}>
              <div className={styles.formName}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formEmail}>
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formMessage}>
                <label htmlFor="mensaje">Mensaje:</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.containerButtons}>
                <button
                  type="submit"
                  className={styles.buttonSend}
                  // onClick={handleSubmit}
                >
                  Enviar
                </button>
                <button
                  type="button"
                  className={styles.buttonBack}
                  onClick={handleBack}
                >
                  Volver
                </button>
              </div>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ContactPage;
