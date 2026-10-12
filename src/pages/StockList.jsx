import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { deleteProduct } from "../redux/stockSlice";

export default function StockList() {
  const products = useSelector((state) => state.stock.products);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "All");

  const search = searchParams.get("search") || "";

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  function updateSearch(value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("search", value);
    else next.delete("search");
    setSearchParams(next);
  }

  function updateCategory(value) {
    setCategory(value);
    const next = new URLSearchParams(searchParams);
    if (value === "All") next.delete("category");
    else next.set("category", value);
    setSearchParams(next);
  }

  function handleDelete(product) {
    if (window.confirm(`Delete ${product.name}?`)) {
      dispatch(deleteProduct(product.id));
    }
  }

  return (
    <section className="content-card">
      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
        />

        <select
          className="filter-select"
          value={category}
          onChange={(e) => updateCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <Link className="primary-button" to="/stock/add">+ Add Product</Link>
      </div>

      <div className="section-heading">
        <div>
          <h2>All Products</h2>
          <p>{filteredProducts.length} product(s) found</p>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <span>🔎</span>
          <h3>No products found</h3>
          <p>Try another search or add a new product.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="inventory-card" key={product.id}>
              <div className="inventory-card-top">
                <span className="product-emoji">📦</span>
                <span className={`stock-badge ${product.quantity <= 10 ? "low" : "good"}`}>
                  {product.quantity <= 10 ? "Low Stock" : "In Stock"}
                </span>
              </div>

              <p className="product-category">{product.category}</p>
              <h3>{product.name}</h3>
              <h2>₹{product.price.toLocaleString("en-IN")}</h2>
              <p className="quantity-text">
                Available: <strong>{product.quantity} {product.unit}</strong>
              </p>

              <div className="inventory-actions">
                <Link to={`/stock/product/${product.id}`}>View Details</Link>
                <button
                  className="text-danger"
                  onClick={() => handleDelete(product)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}