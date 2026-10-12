import { NavLink, Outlet } from "react-router-dom";

export default function StockLayout() {
  return (
    <div className="page">
      <div className="section-heading">
        <div>
          <h2>Stock Management</h2>
          <p>Add products and keep track of your inventory.</p>
        </div>
      </div>

      <nav className="sub-navigation">
        <NavLink to="/stock" end>All Products</NavLink>
        <NavLink to="/stock/add">Add Product</NavLink>
        <NavLink to="/stock/low">Low Stock</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}