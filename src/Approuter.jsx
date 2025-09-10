import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import ListPage from "./Pages/ListPage/ListPage";

function Approuter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ListPage" element={<ListPage />} />
    </Routes>
  );
}

export default Approuter;
