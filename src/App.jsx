import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import StockLayout from "./pages/StockLayout";
import StockList from "./pages/StockList";
import AddStock from "./pages/AddStock";
import LowStock from "./pages/LowStock";
import ProductDetails from "./pages/ProductDetails";
import Billing from "./pages/Billing";
import Bills from "./pages/Bills";
import Customers from "./pages/Customers";
import Profile from "./pages/Profile";
import About from "./pages/About";
import { useAppContext } from "./context/AppContext";
import "./App.css";

export default function App() {
  const { darkMode } = useAppContext();

  return (
    <div className={`app-layout ${darkMode ? "dark-theme" : ""}`}>
      <Sidebar />

      <main className="main-area">
        <Header />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/stock" element={<StockLayout />}>
              <Route index element={<StockList />} />
              <Route path="add" element={<AddStock />} />
              <Route path="low" element={<LowStock />} />
              <Route path="product/:id" element={<ProductDetails />} />
            </Route>

            <Route path="/billing" element={<Billing />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}