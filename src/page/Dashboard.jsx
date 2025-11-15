import React from "react";
import CategoryPage from "./CategoryPage";
import ProductsPage from "./ProductsPage";
import SpareParts from "./SpareParts";
import StatePage from "./StatePage";
import PrimaryButton from "../shared/Button/PrimaryButton";
import { confirmPopup } from "primereact/confirmpopup";
import { isAuthenticated, logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import pagelogo from "../assets/pagelogo.webp";
function Dashboard() {
  const navigate = useNavigate();
  const confirm = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to Logout?",
      icon: "pi pi-exclamation-triangle",
      accept,
      reject,
    });
  };
  const accept = () => {
    logout(() => {
      setTimeout(() => {
        navigate("/login");
      }, 400);
    });
  };
  const reject = () => {};

  return (
    <>
      <div className="container pt-4 flex align-items-center justify-content-between">
        <img width={150} src={pagelogo} alt="pagelogo" /> 
        <div>
          {/* <PrimaryButton label="Logout" onClick={confirm} /> */}
          {isAuthenticated() ? (
            <PrimaryButton label="Logout" onClick={confirm} />
          ) : (
            <PrimaryButton label="Login" onClick={() => navigate("/login")} />
          )}
        </div>
      </div>
      <CategoryPage />
      <ProductsPage />
      <SpareParts />
      <StatePage />
    </>
  );
}

export default Dashboard;
