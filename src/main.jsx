import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Approuter from "./Approuter";
import ScrollToTop from "./Hooks/ScrollToTop";
import "./index.css";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContex";
import { AlertProvider } from "./Context/AlertContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AlertProvider>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Approuter />
        </CartProvider>
      </AuthProvider>
    </AlertProvider>
  </BrowserRouter>
);
