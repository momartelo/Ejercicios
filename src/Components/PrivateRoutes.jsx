import { useEffect } from "react";
import { useAuth } from "../Context/AuthContex";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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
  }, [isLoggedIn, navigate, location.pathname]);

  return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoutes;
