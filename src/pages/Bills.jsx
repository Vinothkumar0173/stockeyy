import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBill } from "../redux/stockSlice";

export default function Bills() {
  const bills = useSelector((state) => state.stock.bills);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const filtered = bills.filter((bill) =>
    bill.customer.toLowerCase().includes(search.toLowerCase())
  );

  function downloadBill(bill) {
    const lines = [
      "STOCKEYY - BILL",
      `Bill ID: ${bill.id}`,
      `Customer: ${bill.customer}`,
      `Date: ${bill.date}`,
      "",
      "Product | Quantity | Price | Subtotal",
      ...bill.items.map((item) =>
        `${item.name} | ${item.quantity} | Rs.${item.price} | Rs.${(item.quantity * item.price).toFixed(2)}`
      ),
      "",
      `TOTAL: Rs.${bill.total.toFixed(2)}`
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `stockeyy-bill-${bill.id}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="page">
      <div className="section-heading">
        <div>
          <h2>Bill History</h2>
          <p>View previous bills and download copies.</p>
        </div>
      </div>

      <section className="content-card">
        <input
          className="search-input"
          style={{ maxWidth: 360, marginBottom: 22 }}
          type="search"
          placeholder="Search by customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.length === 0 ? (
          <div className="empty-state">
            <span>🧾</span>
            <h3>No bills found</h3>
            <p>Create a bill from the Billing page to see it here.</p>
          </div>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Bill ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((bill) => (
                  <tr key={bill.id}>
                    <td>#{String(bill.id).slice(-6)}</td>
                    <td>{bill.customer}</td>
                    <td>{bill.date}</td>
                    <td>{bill.items.length}</td>
                    <td>₹{bill.total.toFixed(2)}</td>
                    <td>
                      <button className="primary-button" onClick={() => downloadBill(bill)}>
                        Download
                      </button>{" "}
                      <button
                        className="text-danger"
                        onClick={() => {
                          if (window.confirm("Delete this bill?")) {
                            dispatch(deleteBill(bill.id));
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