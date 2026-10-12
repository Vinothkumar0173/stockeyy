import { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBill } from "../redux/stockSlice";

function cartReducer(cart, action) {
  switch (action.type) {
    case "add":
      return [...cart, { ...action.product, quantity: 1 }];

    case "quantity":
      return cart.map((item) =>
        item.id === action.id
          ? { ...item, quantity: Number(action.quantity) }
          : item
      );

    case "remove":
      return cart.filter((item) => item.id !== action.id);

    case "clear":
      return [];

    default:
      return cart;
  }
}

export default function Billing() {
  const products = useSelector((state) => state.stock.products);
  const customers = useSelector((state) => state.stock.customers);
  const dispatch = useDispatch();

  const [cart, cartDispatch] = useReducer(cartReducer, []);
  const [customer, setCustomer] = useState("");
  const [message, setMessage] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);

    if (product.quantity <= 0) {
      setMessage("This product is out of stock.");
      return;
    }

    if (existing) {
      setMessage("This product is already in the bill. Change its quantity below.");
      return;
    }

    setMessage("");
    cartDispatch({ type: "add", product });
  }

  function createBill(e) {
    e.preventDefault();

    if (!customer.trim()) {
      setMessage("Please enter the customer's name.");
      return;
    }

    if (cart.length === 0) {
      setMessage("Add at least one product to the bill.");
      return;
    }

    const invalidItem = cart.find((item) => {
      const currentProduct = products.find((p) => p.id === item.id);

      return (
        !currentProduct ||
        item.quantity < 1 ||
        !Number.isInteger(item.quantity) ||
        item.quantity > currentProduct.quantity
      );
    });

    if (invalidItem) {
      setMessage(`Not enough stock available for ${invalidItem.name}.`);
      return;
    }

    const billItems = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    dispatch(
      addBill({
        customer: customer.trim(),
        items: billItems,
        total,
        date: new Date().toLocaleString()
      })
    );

    cartDispatch({ type: "clear" });
    setCustomer("");
    setMessage("Bill created successfully! Stock has been updated.");
  }

  return (
    <div className="page">
      <div className="section-heading">
        <div>
          <h2>Create a Bill</h2>
          <p>Select products, enter quantities, and calculate the total.</p>
        </div>
      </div>

      {message && <p className="notice" role="status">{message}</p>}

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h2>Available Products</h2>
            <p>Choose a product to add it to the bill.</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <h3>No products available</h3>
            <p>Add products in Stock Management first.</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <article className="inventory-card" key={product.id}>
                <div className="inventory-card-top">
                  <span className="product-emoji">📦</span>
                  <span className={`stock-badge ${product.quantity > 0 ? "good" : "low"}`}>
                    {product.quantity > 0
                      ? `${product.quantity} ${product.unit}`
                      : "Out of stock"}
                  </span>
                </div>

                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <h2>₹{Number(product.price).toFixed(2)}</h2>

                <button
                  type="button"
                  className="primary-button"
                  disabled={product.quantity <= 0}
                  onClick={() => addToCart(product)}
                >
                  + Add to Bill
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="content-card">
        <h2>Current Bill</h2>

        <form onSubmit={createBill}>
          <label className="product-form">
            <span className="full-width">Customer Name</span>

            <input
              className="full-width"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              list="customer-names"
              placeholder="Enter customer name"
              required
            />

            <datalist id="customer-names">
              {customers.map((item) => (
                <option key={item.id} value={item.name} />
              ))}
            </datalist>
          </label>

          {cart.length === 0 ? (
            <div className="empty-state">
              <span>🧾</span>
              <h3>Your bill is empty</h3>
              <p>Add a product above to begin.</p>
            </div>
          ) : (
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => {
                    const currentProduct = products.find(
                      (p) => p.id === item.id
                    );

                    const maxQuantity = currentProduct?.quantity ?? 0;

                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>₹{Number(item.price).toFixed(2)}</td>
                        <td>
                          <input
                            aria-label={`Quantity for ${item.name}`}
                            type="number"
                            min="1"
                            max={maxQuantity}
                            step="1"
                            value={item.quantity}
                            onChange={(e) => {
                              cartDispatch({
                                type: "quantity",
                                id: item.id,
                                quantity: e.target.value
                              });
                              setMessage("");
                            }}
                            style={{ width: 80, padding: 7 }}
                          />
                          <small> Max: {maxQuantity}</small>
                        </td>
                        <td>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="text-danger"
                            onClick={() =>
                              cartDispatch({
                                type: "remove",
                                id: item.id
                              })
                            }
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="total-line">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                cartDispatch({ type: "clear" });
                setMessage("");
              }}
            >
              Clear Bill
            </button>

            <button type="submit" className="primary-button">
              Create Bill
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}