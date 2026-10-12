import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../redux/stockSlice";

const initialForm = {
  name: "",
  category: "Grocery",
  quantity: "",
  unit: "kg",
  price: ""
};

export default function AddStock() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter the product name.");
      nameRef.current?.focus();
      return;
    }

    if (form.quantity === "" || Number(form.quantity) < 0) {
      setError("Please enter a valid quantity.");
      return;
    }

    if (form.price === "" || Number(form.price) <= 0) {
      setError("Please enter a price greater than zero.");
      return;
    }

    dispatch(addProduct({
      name: form.name.trim(),
      category: form.category,
      quantity: Number(form.quantity),
      unit: form.unit,
      price: Number(form.price)
    }));

    navigate("/stock");
  }

  return (
    <section className="content-card form-card">
      <div className="form-intro">
        <span className="large-icon">📦</span>
        <div>
          <h2>Add a New Product</h2>
          <p>Enter the details to add a product to your inventory.</p>
        </div>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Product Name
          <input
            ref={nameRef}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Basmati Rice"
            required
          />
        </label>

        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Grocery</option>
            <option>Dairy</option>
            <option>Beverages</option>
            <option>Household</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            min="0"
            step="any"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            required
          />
        </label>

        <label>
          Unit
          <select name="unit" value={form.unit} onChange={handleChange}>
            <option value="kg">Kilograms (kg)</option>
            <option value="liters">Liters</option>
            <option value="pieces">Pieces</option>
          </select>
        </label>

        <label className="full-width">
          Price per Unit (₹)
          <input
            type="number"
            name="price"
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </label>

        <div className="form-actions full-width">
          <button type="button" className="secondary-button" onClick={() => navigate("/stock")}>
            Cancel
          </button>
          <button type="submit" className="primary-button">Save Product</button>
        </div>
      </form>
    </section>
  );
}