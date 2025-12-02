import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import CardTeamPage from "./Pages/CardTeamPage/CardTeamPage";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import PrivateRoutes from "./Components/PrivateRoutes";
import FaqPage from "./Pages/FAQPage/FAQPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import ProductForm from "./Pages/ProductForm/ProductForm";
import ProductsPageLocal from "./Pages/ProductsPageLocal/ProductsPageLocal";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import EditUsersPage from "./Pages/EditUsersPage/EditUsersPage";
import AccountPage from "./Pages/AccountPage/AccountPage";

function Approuter() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPageLocal />} />
      <Route path="/team" element={<CardTeamPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/FAQs" element={<FaqPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/prueba" element={<HomePage />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/new" element={<ProductForm />} />
        <Route path="/product/edit/:id" element={<ProductForm />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editUsers" element={<EditUsersPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Approuter;
