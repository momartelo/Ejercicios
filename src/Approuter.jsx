import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import ListPage from "./Pages/ListPage/ListPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import CardTeamPage from "./Pages/CardTeamPage/CardTeamPage";
import CardProyectsPage from "./Pages/CardProyectsPage/CardProyectsPage";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import InterestGalleryPage from "./Pages/InterestGalleryPage/InterestGalleryPage";
import ProductsPageAPI from "./Pages/ProductsPageAPI/ProductsPageAPI";
import ProductsPageFakeAPI from "./Pages/ProductsPageFakeAPI/ProductsPageFakeAPI";
import ExercisesPage from "./Pages/ExercisesPage/ExercisesPage";
import PrivateRoutes from "./Components/PrivateRoutes";

function Approuter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/listPage" element={<ListPage />} />
      <Route path="/team" element={<CardTeamPage />} />
      <Route path="/proyects" element={<CardProyectsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/interest" element={<InterestGalleryPage />} />
      <Route path="/productsmockAPI" element={<ProductsPageAPI />} />
      <Route path="/productsfakeAPI" element={<ProductsPageFakeAPI />} />
      <Route path="/exercises" element={<ExercisesPage />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Approuter;
