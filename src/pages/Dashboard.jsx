import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ApiProducts from "../components/ApiProducts";
export default function Dashboard() {
  const products = useSelector((state) => state.stock.products);
  const bills = useSelector((state) => state.stock.bills);

  const lowStock = products.filter((product) => product.quantity <= 10);
  const stockValue = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
  const sales = bills.reduce((total, bill) => total + bill.total, 0);

  const stats = [
    { label: "Total Products", value: products.length, icon: "📦", color: "blue" },
    { label: "Low Stock Items", value: lowStock.length, icon: "⚠️", color: "orange" },
    { label: "Stock Value", value: `₹${stockValue.toLocaleString("en-IN")}`, icon: "💰", color: "green" },
    { label: "Total Sales", value: `₹${sales.toLocaleString("en-IN")}`, icon: "🧾", color: "purple" }
  ];

  return (
    <div className="page">
      <section className="welcome-banner">
        <div>
          <p className="eyebrow">YOUR BUSINESS AT A GLANCE</p>
          <h2>Everything in one place ✨</h2>
          <p>Manage your products, keep stock updated, and track your sales.</p>
          <Link className="primary-button" to="/stock">View My Stock →</Link>
        </div>
        <div className="banner-art">📊</div>
      </section>

      <div className="section-heading">
        <div>
          <h2>Overview</h2>
          <p>Here's how your business is doing.</p>
        </div>
      </div>

      <section className="stats-grid">
        {stats.map((item) => (
          <div className="stat-card" key={item.label}>
            <div className={`stat-icon ${item.color}`}>{item.icon}</div>
            <p>{item.label}</p>
            <h2>{item.value}</h2>
          </div>
        ))}
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h2>Recent Products</h2>
            <p>Your current inventory</p>
          </div>
          <Link to="/stock">View all →</Link>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <span>📦</span>
            <h3>No products yet</h3>
            <p>Add your first product to get started.</p>
            <Link className="primary-button" to="/stock/add">Add Product</Link>
          </div>
        ) : (
          <div className="product-grid">
            {products.slice(0, 4).map((product) => (
              <div className="mini-product" key={product.id}>
                <div className="product-emoji">📦</div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                </div>
                <div className="product-quantity">
                  <strong>{product.quantity} {product.unit}</strong>
                  <span>₹{product.price} / unit</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {lowStock.length > 0 && (
        <section className="alert-banner">
          <span>⚠️</span>
          <div>
            <strong>{lowStock.length} product(s) need attention</strong>
            <p>Some products have 10 units or fewer remaining.</p>
          </div>
          <Link to="/stock/low">Check now →</Link>
        </section>
      )}
    </div>
  );
}