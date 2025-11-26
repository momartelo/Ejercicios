import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Approuter from "./Approuter";
import ScrollToTop from "./Hooks/ScrollToTop";
import "./index.css";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContex";
import { AlertProvider } from "./Context/AlertContext";
import { CategoryProvider } from "./Context/CategoryContex";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FavoritesProvider } from "./Context/FavoriteContex";
import { SearchProvider } from "./Context/SearchContex";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AlertProvider>
      <AuthProvider>
        <SearchProvider>
          <FavoritesProvider>
            <CartProvider>
              <CategoryProvider>
                <ScrollToTop />
                <Approuter />
                <ToastContainer
                  position="bottom-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  pauseOnHover
                  draggable
                  theme="colored"
                  toastStyle={{ fontSize: "0.8rem" }}
                />
              </CategoryProvider>
            </CartProvider>
          </FavoritesProvider>
        </SearchProvider>
      </AuthProvider>
    </AlertProvider>
  </BrowserRouter>
);
