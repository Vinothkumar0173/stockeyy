import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function LowStock() {
  const products = useSelector((state) => state.stock.products);
  const lowStock = products.filter((product) => product.quantity <= 10);

  return (
    <section className="content-card">
      <div className="section-heading">
        <div>
          <h2>Low Stock Alerts</h2>
          <p>Products with 10 units or fewer remaining.</p>
        </div>
      </div>

      {lowStock.length === 0 ? (
        <div className="empty-state">
          <span>🎉</span>
          <h3>Everything looks good!</h3>
          <p>No products currently need restocking.</p>
        </div>
      ) : (
        <div className="product-grid">
          {lowStock.map((product) => (
            <article className="inventory-card" key={product.id}>
              <div className="inventory-card-top">
                <span className="product-emoji">⚠️</span>
                <span className="stock-badge low">Restock Soon</span>
              </div>
              <p className="product-category">{product.category}</p>
              <h3>{product.name}</h3>
              <p className="quantity-text">
                Remaining: <strong>{product.quantity} {product.unit}</strong>
              </p>
              <Link className="primary-button" to={`/stock/product/${product.id}`}>
                View Product
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}