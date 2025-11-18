// src/PrivateRoutes.jsx

import { useEffect } from "react";
import { useAuth } from "../Context/AuthContex";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoutes = () => {
  // Obtener el estado de autenticación y el nuevo estado de carga
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 1. Si aún estamos cargando, salimos inmediatamente para esperar el estado final
    if (isLoading) {
      return;
    } // 2. Si la carga terminó y el usuario NO está logueado, mostramos la alerta y redirigimos. //    Se excluye '/cart' de la redirección forzada si no está logueado, según tu lógica original.

    if (!isLoggedIn && location.pathname !== "/cart") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe estar logueado para acceder a esta página.",
      }).then(() => {
        navigate("/cart", {
          state: { from: location.pathname },
          replace: true,
        });
      });
    }
  }, [isLoggedIn, navigate, location.pathname, isLoading]); // Se ejecuta cuando cambian estas dependencias // Mostrar un indicador de carga mientras se verifica la sesión

  if (isLoading) {
    return <div>Verificando sesión...</div>;
  } // Si la carga terminó y está logueado, renderizar el contenido anidado (<Outlet />)

  return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoutes;
