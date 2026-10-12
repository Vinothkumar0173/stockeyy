import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer, deleteCustomer } from "../redux/stockSlice";

export default function Customers() {
  const customers = useSelector((state) => state.stock.customers);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const filtered = customers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter the customer's name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Enter a 10-digit phone number.");
      return;
    }

    if (editingId !== null) {
      // Update an existing customer using the same customer ID.
      dispatch({
        type: "stock/updateCustomer",
        payload: { ...form, id: editingId }
      });
    } else {
      dispatch(addCustomer({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone
      }));
    }

    setForm({ name: "", email: "", phone: "" });
    setEditingId(null);
    setError("");
  }

  function startEdit(customer) {
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    });
    setEditingId(customer.id);
    setError("");
  }

  function cancelEdit() {
    setForm({ name: "", email: "", phone: "" });
    setEditingId(null);
    setError("");
  }

  return (
    <div className="page">
      <div className="section-heading">
        <div>
          <h2>Customer Management</h2>
          <p>Keep your customer details organized.</p>
        </div>
      </div>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h2>{editingId !== null ? "Edit Customer" : "Add Customer"}</h2>
            <p>Enter the customer's contact details.</p>
          </div>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}

        <form className="product-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Customer name"
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="customer@example.com"
              required
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
              }
              placeholder="10-digit phone number"
              required
            />
          </label>

          <div className="form-actions full-width">
            {editingId !== null && (
              <button type="button" className="secondary-button" onClick={cancelEdit}>
                Cancel
              </button>
            )}
            <button type="submit" className="primary-button">
              {editingId !== null ? "Save Changes" : "Add Customer"}
            </button>
          </div>
        </form>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h2>Customer List</h2>
            <p>{filtered.length} customer(s)</p>
          </div>
        </div>

        <input
          className="search-input"
          style={{ maxWidth: 400, marginBottom: 20 }}
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.length === 0 ? (
          <div className="empty-state">
            <span>👥</span>
            <h3>No customers found</h3>
            <p>Add a customer or try a different search.</p>
          </div>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <button
                        className="primary-button"
                        onClick={() => startEdit(customer)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="text-danger"
                        onClick={() => {
                          if (window.confirm(`Delete ${customer.name}?`)) {
                            dispatch(deleteCustomer(customer.id));
                            if (editingId === customer.id) cancelEdit();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}