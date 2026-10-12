import { useState } from "react";
import { useDispatch } from "react-redux";
import useProducts from "../hooks/useProducts";
import { importProducts } from "../redux/stockSlice";

export default function ApiProducts() {
  const { products, loading, error } = useProducts();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  function handleImport() {
    dispatch(importProducts(products));
    setMessage("Sample products imported. Existing product names were skipped.");
  }

  return (
    <section className="content-card">
      <div className="card-heading">
        <div>
          <h2>Discover Sample Products</h2>
          <p>Load sample items from an online product service.</p>
        </div>
      </div>

      {loading && <p>Loading sample products...</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && (
        <>
          <p className="notice">
            Found {products.length} sample products. Imported products start
            with 10 pieces in stock.
          </p>
          <button
            className="primary-button"
            onClick={handleImport}
            disabled={products.length === 0}
          >
            Import Sample Products
          </button>
        </>
      )}

      {message && <p className="notice" role="status">{message}</p>}
    </section>
  );
}