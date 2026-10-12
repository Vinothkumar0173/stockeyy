import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const titles = {
  "/": "Dashboard",
  "/stock": "Stock Management",
  "/stock/add": "Add Stock",
  "/stock/low": "Low Stock Alerts",
  "/billing": "Billing",
  "/bills": "Bill History",
  "/customers": "Customers",
  "/profile": "My Profile",
  "/about": "About Stockeyy"
};

export default function Header() {
  const location = useLocation();
  const { darkMode, toggleTheme, userName } = useAppContext();

  const title =
    location.pathname.startsWith("/stock/product/")
      ? "Product Details"
      : titles[location.pathname] || "Stockeyy";

  return (
    <header className="topbar">
      <div>
        <p className="breadcrumb">WORKSPACE / STOCKEYY</p>
        <h1>{title}</h1>
      </div>

      <div className="header-right">
        <button
          type="button"
          className="theme-button"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <span className="status-dot" />
        <span>Welcome, {userName}</span>
        <div className="avatar">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}