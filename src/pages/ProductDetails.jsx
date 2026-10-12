import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductDetails() {
  const { id } = useParams();

  const product = useSelector((state) =>
    state.stock.products.find((item) => String(item.id) === id)
  );

  if (!product) {
    return (
      <section className="content-card empty-state">
        <span>🔎</span>
        <h3>Product not found</h3>
        <p>This product may have been deleted.</p>
        <Link to="/stock" className="primary-button">Back to Stock</Link>
      </section>
    );
  }

  return (
    <div className="page">
      <section className="content-card">
        <div className="form-intro">
          <span className="large-icon">📦</span>
          <div>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <span>📊</span>
            <h3>Available Quantity</h3>
            <p>{product.quantity} {product.unit}</p>
          </div>

          <div className="info-card">
            <span>💰</span>
            <h3>Price per Unit</h3>
            <p>₹{Number(product.price).toFixed(2)}</p>
          </div>

          <div className="info-card">
            <span>🏷️</span>
            <h3>Category</h3>
            <p>{product.category}</p>
          </div>
        </div>

        <p style={{ marginTop: 24 }}>
          <strong>Stock status: </strong>
          {product.quantity <= 10 ? "Low stock — restock soon" : "Available"}
        </p>

        <Link to="/stock" className="primary-button">← Back to Stock</Link>
      </section>
    </div>
  );
}