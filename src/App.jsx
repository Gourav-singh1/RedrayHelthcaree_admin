import { useRef } from "react";
import "./App.css";
import CategoryPage from "./page/CategoryPage";
import { Toast } from "primereact/toast";
import ProductsPage from "./page/ProductsPage";
import SpareParts from "./page/SpareParts";
import StatePage from "./page/StatePage";
import Login from "./page/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./page/ForgotPassword";

function App() {
  const toast = useRef(null);
  return (
    <>
      <Toast ref={toast} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
      {/* <CategoryPage />
      <ProductsPage />
      <SpareParts />
      <StatePage /> */}
    </>
  );
}

export default App;
