import { useEffect } from "react";
import { useAuth } from "../Context/AuthContex";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // Swal.fire("Debe estar Logueado para acceder a esta pagina");

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe estar Logueado para acceder a esta pagina",
      });
      navigate("/cart");
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoutes;
